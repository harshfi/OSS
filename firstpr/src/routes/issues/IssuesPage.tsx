import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ExternalLink, MessageCircle, Clock, CheckSquare, Copy, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

type Issue = {
  id: number;
  title: string;
  html_url: string;
  repository_url: string;
  comments: number;
  created_at: string;
  labels: { name: string; color: string }[];
};

function IssueCard({ issue }: { issue: Issue }) {
  const repoName = issue.repository_url.split('/').slice(-2).join('/');
  
  const claimComment = `I'd like to work on this issue. Plan: 
1. Reproduce/Understand the problem.
2. Draft a fix and write tests.
3. Submit a PR.
Could you please assign this to me?`;

  const copyClaim = () => {
    navigator.clipboard.writeText(claimComment);
    toast.success("Claim comment copied to clipboard!");
  };

  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}>
      <Card className="flex flex-col h-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start gap-2">
            <span className="text-sm font-medium text-muted-foreground">{repoName}</span>
            <Badge variant="outline" className="flex items-center gap-1 shrink-0">
              <Clock className="w-3 h-3" />
              {new Date(issue.created_at).toLocaleDateString()}
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
          <Button variant="outline" size="sm" onClick={() => window.open(issue.html_url, '_blank')}>
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
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("javascript");
  const [label, setLabel] = useState("good first issue");
  const [q, setQ] = useState("");
  const [rateLimitedUntil, setRateLimitedUntil] = useState<number | null>(null);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const url = new URL('http://localhost:3001/api/issues');
      if (lang) url.searchParams.append('lang', lang);
      if (label) url.searchParams.append('label', label);
      if (q) url.searchParams.append('q', q);
      
      const res = await fetch(url.toString());
      const data = await res.json();
      
      if (data.rateLimitedUntil) {
        setRateLimitedUntil(data.rateLimitedUntil);
      } else {
        setRateLimitedUntil(null);
      }

      setIssues(data.items || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load issues");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [lang, label]);

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
            placeholder="Search keyword or org (e.g. facebook)" 
            className="pl-9"
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchIssues()}
          />
        </div>
        <Select value={lang} onValueChange={(val) => setLang(val || "")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="rust">Rust</SelectItem>
            <SelectItem value="go">Go</SelectItem>
          </SelectContent>
        </Select>
        <Select value={label} onValueChange={(val) => setLabel(val || "")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Label" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="good first issue">good first issue</SelectItem>
            <SelectItem value="help wanted">help wanted</SelectItem>
            <SelectItem value="first-timers-only">first-timers-only</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={fetchIssues}>Search</Button>
      </div>

      {rateLimitedUntil && (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Rate Limited</AlertTitle>
          <AlertDescription>
            The GitHub API limit was reached. You might see cached results or fewer items. Try again in {Math.ceil((rateLimitedUntil - Date.now()) / 1000 / 60)} minutes.
          </AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <Card key={i} className="flex flex-col h-[300px]">
              <CardHeader><Skeleton className="h-6 w-2/3" /><Skeleton className="h-4 w-1/3 mt-2" /></CardHeader>
              <CardContent className="flex-1"><Skeleton className="h-20 w-full" /></CardContent>
              <CardFooter><Skeleton className="h-10 w-full" /></CardFooter>
            </Card>
          ))}
        </div>
      ) : issues.length === 0 ? (
        <div className="text-center py-24 text-muted-foreground">
          <Search className="w-12 h-12 mx-auto opacity-20 mb-4" />
          <p>No open issues found matching your filters.</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {issues.map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
