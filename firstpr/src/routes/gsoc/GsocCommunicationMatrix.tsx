import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COMM_SCENARIOS } from "./gsoc-data";
import { 
  MessageSquare, 
  Copy, 
  Check, 
  XCircle, 
  CheckCircle2, 
  Terminal
} from "lucide-react";
import { toast } from "sonner";

export function GsocCommunicationMatrix() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(COMM_SCENARIOS[0].id);
  const [copied, setCopied] = useState(false);

  const activeScenario = COMM_SCENARIOS.find(s => s.id === activeScenarioId) || COMM_SCENARIOS[0];

  const handleCopyTemplate = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Template copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="community-interaction" className="mb-24 scroll-mt-20">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold uppercase tracking-wider mb-3">
          <MessageSquare className="w-3.5 h-3.5" />
          The Communication Playbook
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Community Interaction: Amateur vs Selected
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mt-2">
          Maintainers read dozens of messages every day. How you frame questions and accept feedback determines whether you get mentored or silently filtered out.
        </p>
      </div>

      {/* Scenario Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 hide-scrollbar">
        {COMM_SCENARIOS.map((scenario) => {
          const isSelected = scenario.id === activeScenarioId;
          return (
            <button
              key={scenario.id}
              onClick={() => setActiveScenarioId(scenario.id)}
              className={`px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground border-border/60 hover:text-foreground hover:bg-muted"
              }`}
            >
              {scenario.title}
            </button>
          );
        })}
      </div>

      {/* Side-by-Side Comparison Container */}
      <div className="space-y-6">
        <div className="bg-background/80 p-4 rounded-xl border border-border/60 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Scenario Context: <strong className="text-foreground">{activeScenario.context}</strong>
          </div>
          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
            Real Community Standard
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Bad Example */}
          <Card className="bg-card border-destructive/30 relative overflow-hidden flex flex-col justify-between">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-destructive text-xs uppercase tracking-wider font-bold mb-3">
                <XCircle className="w-4 h-4" /> The Amateur Way (Ignored / Rejected)
              </div>

              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-foreground/90 leading-relaxed mb-4 whitespace-pre-line font-mono">
                "{activeScenario.badExample.message}"
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <span className="font-semibold text-destructive block">Why Maintainers Dislike This:</span>
                <p className="leading-relaxed">{activeScenario.badExample.whyBad}</p>
              </div>
            </CardContent>
          </Card>

          {/* Good Example */}
          <Card className="bg-card border-primary/40 relative overflow-hidden flex flex-col justify-between shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-primary text-xs uppercase tracking-wider font-bold mb-3">
                <CheckCircle2 className="w-4 h-4" /> The Selected Contributor Way
              </div>

              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-xs text-foreground leading-relaxed mb-4 whitespace-pre-line font-mono">
                "{activeScenario.goodExample.message}"
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <span className="font-semibold text-primary block">Why Maintainers Respect This:</span>
                <p className="leading-relaxed">{activeScenario.goodExample.whyGood}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Copyable Battle-Tested Template */}
        <div className="rounded-xl border border-border/70 bg-card p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Copyable Message Template
              </h4>
            </div>
            <button
              onClick={() => handleCopyTemplate(activeScenario.template)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary/10 text-primary border border-primary/30 text-xs font-medium hover:bg-primary/20 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy Template"}
            </button>
          </div>

          <div className="p-4 rounded-lg bg-background border border-border/80 font-mono text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap select-all">
            {activeScenario.template}
          </div>
          <div className="text-[11px] text-muted-foreground/80 mt-2">
            Tip: Replace bracketed placeholders <span className="text-primary font-semibold">[Like This]</span> with your genuine details. Never send unedited placeholders.
          </div>
        </div>
      </div>
    </section>
  );
}
