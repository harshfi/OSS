import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  SELECTION_RUBRIC, 
  DEADLY_MISTAKES 
} from "./gsoc-data";
import type { 
  SelectionCriterion, 
  DeadlyMistake 
} from "./gsoc-data";
import { 
  CheckCircle2, 
  Target, 
  Sparkles, 
  TrendingUp, 
  ShieldAlert
} from "lucide-react";

export function GsocSelectionRubric() {
  const [activeCriterion, setActiveCriterion] = useState<SelectionCriterion>(SELECTION_RUBRIC[0]);
  const [selectedMistake, setSelectedMistake] = useState<DeadlyMistake | null>(null);

  return (
    <section id="selection-truth" className="mb-24 scroll-mt-20">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono uppercase tracking-wider mb-3">
          <Target className="w-3.5 h-3.5" />
          The Unwritten Selection Truth
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground font-mono">
          How Mentors Actually Choose Contributors
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mt-2">
          GSoC is not a competitive coding contest or an academic exam. Mentors are looking for <strong className="text-foreground font-semibold">dependability, humility, and autonomous execution</strong>. Here is the exact rubric behind closed doors.
        </p>
      </div>

      {/* Behind the scenes Slot Allocation Box */}
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 mb-12 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between pb-6 border-b border-border/40">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
              <TrendingUp className="w-4 h-4" /> Slot Economics
            </div>
            <h3 className="text-xl md:text-2xl font-bold">The Google Slot Funnel</h3>
            <p className="text-muted-foreground text-sm mt-2 max-w-xl">
              An org might receive 40 proposals, but Google only grants them 4 slots based on mentor availability. That means mentors must actively reject 90% of candidates.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-xl border border-border/60 shrink-0">
            <div className="text-center px-2">
              <div className="text-2xl font-bold text-foreground">40+</div>
              <div className="text-xs text-muted-foreground font-medium">Proposals</div>
            </div>
            <div className="text-muted-foreground">→</div>
            <div className="text-center px-2">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-xs text-muted-foreground font-medium">Interviewed</div>
            </div>
            <div className="text-muted-foreground">→</div>
            <div className="text-center px-2">
              <div className="text-2xl font-bold text-primary">4</div>
              <div className="text-xs text-muted-foreground font-medium">Final Slots</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 pt-6">
          <div className="space-y-2">
            <div className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" /> 1. Internal Voting
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every mentor ranks the proposals in their sub-project. A single negative review or complaint about communication will sink an application immediately.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary/60" /> 2. The Bus Factor Test
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Mentors ask themselves: <em>"If I get swamped at work for 4 days in July, will this contributor freeze or can they keep making progress?"</em>
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary/30" /> 3. Post-GSoC Retention
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Orgs prioritize applicants who show genuine interest in the software rather than "bounty hunters" who will abandon the repo the second final checks clear.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Selection Rubric Explorer */}
      <div className="grid lg:grid-cols-12 gap-8 mb-16">
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" /> Mentor Scoring Weights
          </h3>
          {SELECTION_RUBRIC.map((item) => {
            const isSelected = activeCriterion.title === item.title;
            return (
              <button
                key={item.title}
                onClick={() => setActiveCriterion(item)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer relative ${
                  isSelected
                    ? "bg-primary/5 border-primary shadow-sm"
                    : "bg-card border-border/50 hover:bg-muted/50 hover:border-border"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-sm text-foreground">{item.title}</span>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${isSelected ? "bg-primary/20 text-primary font-semibold" : "bg-muted text-muted-foreground"}`}
                  >
                    {item.weight}% Weight
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground truncate">{item.highlight}</div>
                {/* Visual Weight Bar */}
                <div className="w-full bg-muted h-1.5 rounded-full mt-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${isSelected ? "bg-primary" : "bg-muted-foreground/30"}`} 
                    style={{ width: `${item.weight * 2.2}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Rubric Criterion Deep Dive */}
        <div className="lg:col-span-7">
          <Card className="h-full bg-card border-border shadow-sm flex flex-col justify-between">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="border-primary/30 text-primary font-mono text-xs">
                  Scoring Component • {activeCriterion.weight}%
                </Badge>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Internal Mentor Checklist</span>
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-3">
                {activeCriterion.title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                {activeCriterion.summary}
              </p>

              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                  What Mentors Specifically Look For:
                </div>
                {activeCriterion.checklist.map((check, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/40">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/90">{check}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 px-6 md:px-8 bg-muted/30 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground font-semibold">
              <span>💡 Pro Tip: Mention these concrete proofs in your proposal cover section.</span>
            </div>
          </Card>
        </div>
      </div>

      {/* The 5 Deadly Mistakes (Why 90% get rejected) */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <ShieldAlert className="w-6 h-6 text-destructive" />
          <h3 className="text-2xl font-bold">The 5 Deadly Rejection Traps</h3>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEADLY_MISTAKES.map((mistake, idx) => (
            <Card 
              key={idx} 
              className="bg-card border-border hover:border-destructive/40 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              onClick={() => setSelectedMistake(mistake)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="destructive" className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5">
                    {mistake.tag}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Trap #{idx + 1}</span>
                </div>
                <h4 className="font-bold text-foreground text-lg mb-2 group-hover:text-destructive transition-colors">
                  {mistake.title}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-6 leading-relaxed">
                  {mistake.badHabit}
                </p>
                <div className="text-xs text-primary font-bold flex items-center gap-1 group-hover:underline">
                  View Maintainer Fix →
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal / Dialog for Detailed Mistake Fix */}
      <AnimatePresence>
        {selectedMistake && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedMistake(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-card border border-border rounded-xl p-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-4">
                <Badge variant="destructive" className="font-mono text-xs">
                  {selectedMistake.tag}
                </Badge>
                <button 
                  onClick={() => setSelectedMistake(null)}
                  className="text-muted-foreground hover:text-foreground text-sm font-mono cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              <h4 className="text-xl font-bold font-mono text-foreground mb-2">
                {selectedMistake.title}
              </h4>
              <p className="text-xs text-destructive font-mono mb-4">
                Consequence: {selectedMistake.impact}
              </p>

              <div className="space-y-4 text-sm">
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="text-xs font-semibold uppercase text-destructive font-mono mb-1">
                    What Amateur Applicants Do:
                  </div>
                  <p className="text-foreground/90 text-xs leading-relaxed">
                    {selectedMistake.badHabit}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-xs font-semibold uppercase text-emerald-400 font-mono mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> What Selected Contributors Do Instead:
                  </div>
                  <p className="text-foreground/90 text-xs leading-relaxed">
                    {selectedMistake.solution}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedMistake(null)}
                  className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-xs font-mono font-medium hover:bg-secondary/80 transition-colors cursor-pointer"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
