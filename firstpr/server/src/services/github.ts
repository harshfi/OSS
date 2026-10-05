import { issueCache } from '../cache.js';

type FetchIssuesParams = {
  lang?: string;
  label?: string;
  q?: string;
  page?: number;
  perPage?: number;
  sort?: string;
};

// Simple lock mechanism to avoid concurrent duplicate requests
const pendingRequests = new Map<string, Promise<any>>();

export async function getGoodFirstIssues(params: FetchIssuesParams) {
  let { lang, label, q, page = 1, perPage = 20, sort } = params;

  if (page < 1) page = 1;
  if (perPage < 1) perPage = 20;
  if (perPage > 50) perPage = 50;

  // Cap at 1000 items as GitHub API limitation
  if (page * perPage > 1000) {
    page = Math.floor(1000 / perPage);
  }

  // Allowed sort values: created, updated, comments, reactions.
  const allowedSorts = ['created', 'updated', 'comments', 'reactions'];
  const validSort = sort && allowedSorts.includes(sort) ? sort : 'created';

  // Build the search query
  const parts: string[] = ['is:issue', 'is:open', 'no:assignee'];
  if (lang) parts.push(`language:${lang}`);
  if (label) parts.push(`label:"${label}"`);

  if (q) {
    const tokens = q.split(/\s+/);
    for (const token of tokens) {
      if (token.startsWith('org:') || token.startsWith('repo:') || token.startsWith('user:')) {
        parts.push(token);
      } else {
        const clean = token.replace(/[^A-Za-z0-9._-]/g, '');
        if (clean) {
          parts.push(`${clean} in:title,body`);
        }
      }
    }
  }
  
  const query = parts.join(' ');
  const cacheKey = `${query}-sort:${validSort}-page:${page}-perPage:${perPage}`;

  // Check cache
  const cachedData = issueCache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  // Check if there is already a pending request for this key
  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }

  // Define the fetch promise
  const fetchPromise = (async () => {
    try {
      const token = process.env.GITHUB_TOKEN;
      const headers: Record<string, string> = {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'FirstPR-App'
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const url = `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&sort=${validSort}&order=desc&per_page=${perPage}&page=${page}`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      
      let response;
      try {
        response = await fetch(url, { headers, signal: controller.signal });
      } catch (err: any) {
        if (err.name === 'AbortError') {
          throw { status: 504, message: 'GitHub API timeout' };
        }
        throw { status: 504, message: 'Network error reaching GitHub' };
      } finally {
        clearTimeout(timeoutId);
      }

      // Handle Rate Limiting
      const remaining = response.headers.get('x-ratelimit-remaining');
      const reset = response.headers.get('x-ratelimit-reset');
      
      if (response.status === 429 || (response.status === 403 && remaining === '0')) {
        let retryAfterSeconds = 60;
        if (reset) {
          retryAfterSeconds = Math.max(1, parseInt(reset, 10) - Math.floor(Date.now() / 1000));
        } else if (response.headers.get('retry-after')) {
          retryAfterSeconds = parseInt(response.headers.get('retry-after')!, 10);
        }
        throw { status: 429, message: 'GitHub rate limit reached', retryAfter: retryAfterSeconds };
      }

      if (response.status === 401) {
        throw { status: 500, message: 'GitHub token is invalid' };
      }

      if (response.status === 422) {
        throw { status: 422, message: "That search isn't valid" };
      }

      if (!response.ok) {
        throw { status: 500, message: `GitHub API error: ${response.statusText}` };
      }

      const data = await response.json() as any;
      
      const items = data.items.map((item: any) => {
        let repo = '';
        if (item.repository_url) {
          const parts = item.repository_url.split('/');
          if (parts.length >= 2) {
            repo = `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
          }
        }
        
        let bodySnippet = (item.body || '').substring(0, 200);
        if (item.body && item.body.length > 200) bodySnippet += '...';

        return {
          id: item.id,
          number: item.number,
          title: item.title,
          html_url: item.html_url,
          repo,
          labels: item.labels.map((l: any) => ({ name: l.name, color: l.color })),
          comments: item.comments,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          author: {
            login: item.user?.login,
            avatar: item.user?.avatar_url
          },
          body: bodySnippet
        };
      });

      const total = Math.min(data.total_count, 1000);
      const rateLimit = {
        remaining: remaining ? parseInt(remaining, 10) : null,
        resetAt: reset ? parseInt(reset, 10) * 1000 : null
      };

      const result = {
        items,
        total,
        page,
        perPage,
        rateLimit
      };

      // Cache the successful result
      issueCache.set(cacheKey, result);
      return result;
    } catch (error) {
      throw error;
    } finally {
      // Remove from pending requests
      pendingRequests.delete(cacheKey);
    }
  })();

  // Store in pending requests
  pendingRequests.set(cacheKey, fetchPromise);
  return fetchPromise;
}
