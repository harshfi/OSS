import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ExternalLink, MessageCircle, Clock, CheckSquare, Copy, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

type Issue = {
  id: number;
  title: string;
  html_url: string;
  repo: string;
  comments: number;
  createdAt: string;
  labels: { name: string; color: string }[];
};

type FetchError = {
  status: number;
  message: string;
  retryAfter?: number;
};

function IssueCard({ issue }: { issue: Issue }) {
  const claimComment = `Hi! I'd like to work on this. Plan: `;

  const copyClaim = () => {
    navigator.clipboard.writeText(claimComment);
    toast.success("Claim comment copied to clipboard!");
  };

  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}>
      <Card className="flex flex-col h-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start gap-2">
            <span className="text-sm font-medium text-muted-foreground">{issue.repo}</span>
            <Badge variant="outline" className="flex items-center gap-1 shrink-0">
              <Clock className="w-3 h-3" />
              {new Date(issue.createdAt).toLocaleDateString()}
            </Badge>
          </div>
          <CardTitle className="text-lg leading-tight mt-2 line-clamp-2" title={issue.title}>
            {issue.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-4">
          <div className="flex flex-wrap gap-1 mb-4">
            {issue.labels.map(label => (
              <Badge key={label.name} variant="secondary" style={{ borderLeftColor: `#${label.color}`, borderLeftWidth: '3px' }}>
                {label.name}
              </Badge>
            ))}
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-4">
            <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {issue.comments} comments</span>
          </div>
          
          <div className="mt-4 p-3 bg-muted/50 rounded-md text-sm">
            <div className="font-medium flex items-center gap-2 mb-2"><CheckSquare className="w-4 h-4 text-primary" /> Read before you claim</div>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>I have read the CONTRIBUTING.md</li>
              <li>I can dedicate time this week</li>
              <li>I understand the stack</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline" size="sm" onClick={() => window.open(issue.html_url, '_blank', 'noopener noreferrer')}>
            View <ExternalLink className="w-3 h-3 ml-2" />
          </Button>
          <Button size="sm" onClick={copyClaim}>
            <Copy className="w-3 h-3 mr-2" /> Claim
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function IssuesPage() {
  const [lang, setLang] = useState("javascript");
  const [label, setLabel] = useState("good first issue");
  const [qInput, setQInput] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 20;
  
  const [rateLimitWait, setRateLimitWait] = useState(0);

  useEffect(() => {
    if (rateLimitWait > 0) {
      const timer = setTimeout(() => setRateLimitWait(r => r - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [rateLimitWait]);

  const fetchIssues = async ({ queryKey }: any) => {
    const [_key, lang, label, q, page] = queryKey;
    const url = new URL('/api/issues', window.location.origin);
    if (lang && lang !== "all") url.searchParams.append('lang', lang);
    if (label && label !== "all") url.searchParams.append('label', label);
    if (q) url.searchParams.append('q', q);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('perPage', perPage.toString());
    
    let res;
    try {
      res = await fetch(url.toString());
    } catch (err) {
      throw { status: 0, message: "Cannot reach the server. Is the API running?" };
    }
    
    if (!res.ok) {
      let errData;
      try {
        errData = await res.json();
      } catch (e) {
        throw { status: 0, message: "Cannot reach the server. Is the API running?" };
      }
      throw { status: res.status, message: errData.error || "Unknown error", retryAfter: errData.retryAfter };
    }
    
    return res.json();
  };

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery<any, FetchError>({
    queryKey: ['issues', lang, label, q, page],
    queryFn: fetchIssues,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error.status === 429) return false;
      if (error.status === 401 || error.status === 422) return false;
      return error.status >= 500 && failureCount < 3;
    }
  });

  useEffect(() => {
    if (isError && error?.status === 429 && error.retryAfter) {
      setRateLimitWait(error.retryAfter);
    }
  }, [isError, error]);

  const handleSearch = () => {
    setQ(qInput);
    setPage(1);
  };
  
  const handleLangChange = (val: string | null) => {
    if (val) {
      setLang(val);
      setPage(1);
    }
  };
  
  const handleLabelChange = (val: string | null) => {
    if (val) {
      setLabel(val);
      setPage(1);
    }
  };

  const totalPages = data?.total ? Math.ceil(data.total / perPage) : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Find an Issue</h1>
        <p className="text-xl text-muted-foreground">
          Live stream of beginner-friendly issues from GitHub. Claim one and make your first PR.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-card p-4 rounded-lg border shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="keyword, org:facebook, or repo:owner/name" 
            className="pl-9"
            value={qInput}
            onChange={e => setQInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && rateLimitWait === 0 && handleSearch()}
            disabled={rateLimitWait > 0}
          />
        </div>
        <Select value={lang} onValueChange={handleLangChange} disabled={rateLimitWait > 0}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Language</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="c++">C++</SelectItem>
            <SelectItem value="c#">C#</SelectItem>
            <SelectItem value="php">PHP</SelectItem>
            <SelectItem value="ruby">Ruby</SelectItem>
            <SelectItem value="go">Go</SelectItem>
            <SelectItem value="rust">Rust</SelectItem>
            <SelectItem value="swift">Swift</SelectItem>
            <SelectItem value="kotlin">Kotlin</SelectItem>
            <SelectItem value="dart">Dart</SelectItem>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
          </SelectContent>
        </Select>
        <Select value={label} onValueChange={handleLabelChange} disabled={rateLimitWait > 0}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Label" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Label</SelectItem>
            <SelectItem value="good first issue">good first issue</SelectItem>
            <SelectItem value="help wanted">help wanted</SelectItem>
            <SelectItem value="first-timers-only">first-timers-only</SelectItem>
            <SelectItem value="hacktoberfest">hacktoberfest</SelectItem>
            <SelectItem value="documentation">documentation</SelectItem>
            <SelectItem value="beginner">beginner</SelectItem>
            <SelectItem value="easy">easy</SelectItem>
            <SelectItem value="up-for-grabs">up-for-grabs</SelectItem>
            <SelectItem value="bug">bug</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleSearch} disabled={rateLimitWait > 0 || isFetching}>
          {rateLimitWait > 0 ? `Wait ${rateLimitWait}s` : "Search"}
        </Button>
      </div>

      {isError && error?.status === 429 && (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Rate Limited</AlertTitle>
          <AlertDescription>
            GitHub rate limit reached, try again in {rateLimitWait} seconds.
          </AlertDescription>
        </Alert>
      )}
      
      {isError && error?.status !== 429 && (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>{error?.message || "Failed to load issues"}</span>
            <Button variant="outline" size="sm" onClick={() => refetch()}>Retry</Button>
          </AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <Card key={i} className="flex flex-col h-[300px]">
              <CardHeader><Skeleton className="h-6 w-2/3" /><Skeleton className="h-4 w-1/3 mt-2" /></CardHeader>
              <CardContent className="flex-1"><Skeleton className="h-20 w-full" /></CardContent>
              <CardFooter><Skeleton className="h-10 w-full" /></CardFooter>
            </Card>
          ))}
        </div>
      ) : data?.items?.length === 0 ? (
        <div className="text-center py-24 text-muted-foreground">
          <Search className="w-12 h-12 mx-auto opacity-20 mb-4" />
          <p>No open issues found matching your filters.</p>
        </div>
      ) : (
        <>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {data?.items?.map((issue: Issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </AnimatePresence>
          </motion.div>
          
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button 
                variant="outline" 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1 || rateLimitWait > 0 || isFetching}
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button 
                variant="outline" 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || rateLimitWait > 0 || isFetching}
              >
                Next <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
