import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckSquare, 
  Square, 
  Gauge, 
  TrendingUp
} from "lucide-react";

interface AuditItem {
  id: string;
  label: string;
  detail: string;
  points: number;
}

const AUDIT_ITEMS: AuditItem[] = [
  {
    id: "local-env",
    label: "Local Development Setup Operational",
    detail: "You have cloned the repo, built it from source, and run the test suite cleanly on your machine.",
    points: 15
  },
  {
    id: "contributing-docs",
    label: "Absorbed Code Guidelines & Git Conventions",
    detail: "You read CONTRIBUTING.md, commit message style, and linter rules without needing reminders.",
    points: 10
  },
  {
    id: "merged-pr",
    label: "At Least 1 Merged PR in Target Repo",
    detail: "You've proven you can write code matching the repo's standards and pass continuous integration checks.",
    points: 25
  },
  {
    id: "community-presence",
    label: "Active in Primary Org Chat for 2+ Weeks",
    detail: "You regularly read channels, answer newcomer questions, and maintain a polite public presence.",
    points: 15
  },
  {
    id: "specific-idea",
    label: "Focused on ONE Specific Idea from List",
    detail: "You selected one high-priority project rather than applying blindly to multiple arbitrary topics.",
    points: 10
  },
  {
    id: "mentor-dialogue",
    label: "Co-Designed Architecture with Mentor",
    detail: "You started an RFC or discussion thread and incorporated mentor feedback into your approach.",
    points: 15
  },
  {
    id: "early-draft",
    label: "Proposal Draft Shared 2+ Weeks Early",
    detail: "Mentors received an editable Google Doc link with ample time to review and request changes.",
    points: 10
  }
];

export function GsocReadinessAudit() {
  const [checkedIds, setCheckedIds] = useState<string[]>(["local-env", "contributing-docs"]);

  const toggleItem = (id: string) => {
    setCheckedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const totalScore = AUDIT_ITEMS
    .filter(item => checkedIds.includes(item.id))
    .reduce((sum, item) => sum + item.points, 0);

  const getVerdict = (score: number) => {
    if (score >= 85) {
      return {
        label: "Top 5% Contender",
        badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        message: "You have completed the essential trust-building steps. Maintainers already know who you are and have seen your code merged. Keep communication active during the review window."
      };
    } else if (score >= 60) {
      return {
        label: "Competitive / On Track",
        badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        message: "Solid foundation. To secure selection, prioritize landing a merged PR and getting your prospective mentor to comment directly on your proposal draft."
      };
    } else if (score >= 35) {
      return {
        label: "Moderate Risk",
        badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
        message: "You are competing against applicants with merged PRs and active mentor engagement. Stop writing the proposal text and focus on solving a real bug in the repository first."
      };
    } else {
      return {
        label: "High Rejection Risk",
        badgeColor: "bg-destructive/20 text-destructive border-destructive/30",
        message: "Submitting a proposal at this stage usually results in rejection. Do not panic: clone the project, build it locally, and make your first small contribution today."
      };
    }
  };

  const verdict = getVerdict(totalScore);

  return (
    <section id="readiness-audit" className="mb-24 scroll-mt-20">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono uppercase tracking-wider mb-3">
          <Gauge className="w-3.5 h-3.5" />
          The Acceptance Predictor
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground font-mono">
          Interactive GSoC Readiness Audit
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mt-2">
          An honest assessment of where your application currently stands based on historical selection signals.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Checklist items */}
        <div className="lg:col-span-7 space-y-3">
          {AUDIT_ITEMS.map((item) => {
            const isChecked = checkedIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                  isChecked
                    ? "bg-card border-emerald-500/50 shadow-sm"
                    : "bg-card/30 border-border/50 hover:bg-card/60 hover:border-border"
                }`}
              >
                <div className="mt-0.5 text-emerald-400 shrink-0">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Square className="w-5 h-5 text-muted-foreground/60" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-mono text-sm font-semibold ${isChecked ? "text-foreground" : "text-muted-foreground"}`}>
                      {item.label}
                    </span>
                    <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground shrink-0">
                      +{item.points} pts
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Score & Verdict Display */}
        <div className="lg:col-span-5">
          <div className="sticky top-20">
            <Card className="bg-card/70 border-border/80 backdrop-blur-md p-6 md:p-8 relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Readiness Rating
                </span>
                <Badge variant="outline" className={`font-mono text-xs ${verdict.badgeColor}`}>
                  {verdict.label}
                </Badge>
              </div>

              {/* Score Number and Bar */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-black font-mono tracking-tight text-foreground">
                    {totalScore}%
                  </span>
                  <span className="text-muted-foreground text-sm font-mono">
                    / 100% Prepared
                  </span>
                </div>

                <div className="w-full bg-muted/60 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500 rounded-full"
                    style={{ width: `${totalScore}%` }}
                  />
                </div>
              </div>

              {/* Diagnosis Message */}
              <div className="p-4 rounded-xl bg-background/60 border border-border/60 mb-6">
                <div className="text-xs font-mono font-semibold uppercase text-emerald-400 mb-1 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" /> Maintainer Diagnosis:
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed">
                  {verdict.message}
                </p>
              </div>

              <div className="space-y-2 text-xs font-mono text-muted-foreground">
                <div className="flex items-center justify-between py-1 border-b border-border/40">
                  <span>Audit Items Completed:</span>
                  <span className="text-foreground font-bold">{checkedIds.length} of {AUDIT_ITEMS.length}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-border/40">
                  <span>Golden Prerequisite:</span>
                  <span className="text-emerald-400 font-bold">1+ Merged PR</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
