import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, ShieldAlert, CheckCircle2, Shield, Info } from "lucide-react";

type Policy = {
  org: string;
  status: "Allowed" | "Restricted" | "Banned" | "Disclose Required";
  sourceUrl: string;
  notes: string;
};

const policies: Policy[] = [
  { org: "Python Software Foundation", status: "Restricted", sourceUrl: "#", notes: "Allowed for learning, banned for generating PR code directly." },
  { org: "Django", status: "Disclose Required", sourceUrl: "#", notes: "Must clearly state in the PR description if AI was used for generation." },
  { org: "Debian", status: "Banned", sourceUrl: "#", notes: "Strictly banned for any code or documentation contributions." },
  { org: "Home Assistant", status: "Allowed", sourceUrl: "#", notes: "Allowed, but contributor takes full responsibility for bugs." },
];

export default function AiPolicyPage() {
  const [search, setSearch] = useState("");

  const filtered = policies.filter(p => p.org.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">AI Contribution Policies</h1>
        <p className="text-muted-foreground text-lg mb-6">Open source organizations have vastly different rules regarding LLMs (ChatGPT, Copilot, Cursor). Know the rules before you submit code.</p>
        
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <ShieldAlert className="w-5 h-5" /> How to use AI Honestly
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-medium">The golden rule for this course and open source in general:</p>
            <ul className="space-y-2">
              <li className="flex gap-2 items-start">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span><strong>Use AI to learn and debug.</strong> Ask it to explain confusing architecture, decipher weird error messages, or teach you the syntax of a new language.</span>
              </li>
              <li className="flex gap-2 items-start">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span><strong>Understand every line you submit.</strong> You are legally and technically responsible for the code in your PR. If a maintainer asks why you chose a specific implementation, "ChatGPT told me to" is an automatic rejection.</span>
              </li>
              <li className="flex gap-2 items-start">
                <Shield className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Never auto-generate entire PRs.</strong> Maintainers despise "drive-by" AI PRs that dump 500 lines of unverified code. It wastes their time and burns your reputation.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">Organization Directory</h2>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search organizations..." 
              className="pl-9"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-medium">Organization</th>
                  <th className="px-6 py-4 font-medium">Policy Status</th>
                  <th className="px-6 py-4 font-medium hidden md:table-cell">Notes</th>
                  <th className="px-6 py-4 font-medium text-right">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y border-t">
                {filtered.map((policy) => (
                  <tr key={policy.org} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{policy.org}</td>
                    <td className="px-6 py-4">
                      <Badge variant={
                        policy.status === 'Allowed' ? 'default' : 
                        policy.status === 'Disclose Required' ? 'secondary' : 
                        policy.status === 'Restricted' ? 'outline' : 'destructive'
                      } className={policy.status === 'Restricted' ? 'border-amber-500 text-amber-500' : ''}>
                        {policy.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell text-muted-foreground">
                      {policy.notes}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8 text-primary" onClick={() => window.open(policy.sourceUrl, '_blank')}>
                        Policy <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                      <Info className="w-8 h-8 mx-auto mb-2 opacity-20" />
                      No organizations found matching "{search}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
