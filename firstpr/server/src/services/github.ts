import { issueCache } from '../cache';

type GitHubIssue = {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: {
    login: string;
    avatar_url: string;
  };
  labels: { name: string; color: string }[];
  state: string;
  locked: boolean;
  assignee: any;
  assignees: any[];
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  author_association: string;
  body: string;
};

type FetchIssuesParams = {
  lang?: string;
  label?: string;
  q?: string;
  page?: number;
};

// Simple lock mechanism to avoid concurrent duplicate requests
const pendingRequests = new Map<string, Promise<any>>();
let rateLimitedUntil: number | null = null;

export async function getGoodFirstIssues(params: FetchIssuesParams) {
  const { lang, label, q, page = 1 } = params;

  // Build the search query
  const parts: string[] = ['state:open', 'is:issue', 'no:assignee'];
  if (lang) parts.push(`language:"${lang}"`);
  if (label) parts.push(`label:"${label}"`);
  if (q) parts.push(q);
  
  const query = parts.join(' ');
  const cacheKey = `${query}-page:${page}`;

  // Check rate limit state
  if (rateLimitedUntil && Date.now() < rateLimitedUntil) {
    // If rate limited, return cached data if available, else return what we can
    const cachedData = issueCache.get(cacheKey);
    if (cachedData) {
      return { ...cachedData, rateLimitedUntil };
    }
    return { items: [], rateLimitedUntil, error: 'Rate limited by GitHub API.' };
  } else if (rateLimitedUntil && Date.now() >= rateLimitedUntil) {
    // Rate limit expired
    rateLimitedUntil = null;
  }

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
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'FirstPR-App'
      };
      if (token) {
        headers['Authorization'] = `token ${token}`;
      }

      const url = `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&sort=created&order=desc&per_page=30&page=${page}`;
      const response = await fetch(url, { headers });

      // Handle Rate Limiting
      const remaining = response.headers.get('x-ratelimit-remaining');
      const reset = response.headers.get('x-ratelimit-reset');
      
      if (remaining === '0' || response.status === 403) {
        if (reset) {
          rateLimitedUntil = parseInt(reset, 10) * 1000;
        } else {
          rateLimitedUntil = Date.now() + 60 * 1000; // default 1 min
        }
        
        throw new Error('Rate limit exceeded');
      }

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      const result = {
        items: data.items,
        total_count: data.total_count,
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

  try {
    const data = await fetchPromise;
    return { ...data, rateLimitedUntil };
  } catch (error: any) {
    // If rate limited, we already set rateLimitedUntil
    if (rateLimitedUntil) {
       return { items: [], rateLimitedUntil, error: 'Rate limited by GitHub API.' };
    }
    throw error;
  }
}
