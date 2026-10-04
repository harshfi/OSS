import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TRUST_LADDER } from "./gsoc-data";
import { 
  CheckCircle2, 
  ArrowRight, 
  Quote, 
  Clock,
  Layers
} from "lucide-react";

export function GsocTrustLadder() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = TRUST_LADDER[activeStepIndex];

  return (
    <section id="trust-ladder" className="mb-24 scroll-mt-20">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono uppercase tracking-wider mb-3">
          <Layers className="w-3.5 h-3.5" />
          The Trust Staircase
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground font-mono">
          How to Build Genuine Maintainer Trust
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mt-2">
          Trust in open source cannot be demanded or faked with flattery. It is earned incrementally through verifiable, low-friction technical actions over 6 to 8 weeks.
        </p>
      </div>

      {/* Progress Steps Nav */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {TRUST_LADDER.map((step, idx) => {
          const isSelected = idx === activeStepIndex;
          const isPast = idx < activeStepIndex;
          const StepIcon = step.icon;

          return (
            <button
              key={step.step}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? "bg-card border-emerald-500/60 shadow-[0_0_20px_-5px_rgba(34,197,94,0.25)]"
                  : isPast
                  ? "bg-card/40 border-border/70 hover:border-emerald-500/30"
                  : "bg-card/20 border-border/40 hover:bg-card/50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-muted-foreground">Step 0{step.step}</span>
                  <Badge 
                    variant="outline" 
                    className={`font-mono text-[10px] ${
                      isSelected ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10" : "border-border text-muted-foreground"
                    }`}
                  >
                    {step.timeframe}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 font-mono font-bold text-sm text-foreground mb-1">
                  <StepIcon className={`w-4 h-4 shrink-0 ${isSelected ? "text-emerald-400" : "text-muted-foreground"}`} />
                  <span className="truncate">{step.name.split("&")[0]}</span>
                </div>
              </div>

              <div className="w-full bg-muted/40 h-1 rounded-full mt-3 overflow-hidden">
                <div 
                  className={`h-full ${isSelected ? "bg-emerald-400" : isPast ? "bg-emerald-500/40" : "bg-transparent"}`}
                  style={{ width: "100%" }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Step Detail Stage Card */}
      <Card className="bg-card/60 border-border/70 backdrop-blur-md overflow-hidden relative">
        <div className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/50">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
                <Clock className="w-3.5 h-3.5" /> Stage {activeStep.step} of 4 • {activeStep.timeframe}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-mono text-foreground">
                {activeStep.name}
              </h3>
            </div>
            <div className="shrink-0 bg-background/80 px-4 py-2 rounded-lg border border-border/60">
              <span className="text-xs font-mono text-muted-foreground block">Primary Goal:</span>
              <span className="text-sm font-semibold text-foreground/90">{activeStep.goal}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 pt-8">
            {/* Action Checklist */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Concrete Contributor Actions:
              </h4>

              <div className="space-y-3">
                {activeStep.actions.map((action, i) => (
                  <div 
                    key={i} 
                    className="p-4 rounded-xl bg-background/50 border border-border/50 hover:border-emerald-500/30 transition-colors flex items-start gap-3.5"
                  >
                    <div className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {action}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Maintainer Internal Perspective (The Mindset Shift) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/20 via-background to-background border border-emerald-500/20 relative">
                <Quote className="w-8 h-8 text-emerald-500/30 absolute top-4 right-4" />
                <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-3">
                  What Maintainers Are Thinking:
                </div>
                <blockquote className="text-sm md:text-base italic text-foreground/90 leading-relaxed mb-4">
                  "{activeStep.maintainerPerspective}"
                </blockquote>
                <div className="text-xs font-mono text-muted-foreground">
                  Signals demonstrated: <span className="text-foreground font-semibold">Self-reliance, Attention to detail, Respect for reviewer time</span>
                </div>
              </div>

              {/* Navigation buttons between steps */}
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex(prev => prev - 1)}
                  className="px-4 py-2 rounded-lg border border-border text-xs font-mono text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  ← Previous Step
                </button>
                <button
                  disabled={activeStepIndex === TRUST_LADDER.length - 1}
                  onClick={() => setActiveStepIndex(prev => prev + 1)}
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-black text-xs font-mono font-bold hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  Next Step <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
