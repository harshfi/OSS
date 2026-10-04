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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold uppercase tracking-wider mb-3">
          <Layers className="w-3.5 h-3.5" />
          The Trust Staircase
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          How to Build Genuine Maintainer Trust
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mt-2">
          Trust in open source cannot be demanded or faked with flattery. It is earned incrementally through verifiable, low-friction technical actions over 6 to 8 weeks.
        </p>
      </div>

      {/* Progress Steps Nav */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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
                  ? "bg-card border-primary shadow-sm"
                  : isPast
                  ? "bg-muted/30 border-border hover:border-primary/50"
                  : "bg-card border-border/50 hover:bg-muted/50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">Step 0{step.step}</span>
                  <Badge 
                    variant="outline" 
                    className={`text-[10px] ${
                      isSelected ? "border-primary/50 text-primary bg-primary/10 font-bold" : "border-border text-muted-foreground"
                    }`}
                  >
                    {step.timeframe}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 font-bold text-sm text-foreground mb-1">
                  <StepIcon className={`w-4 h-4 shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="truncate">{step.name.split("&")[0]}</span>
                </div>
              </div>

              <div className="w-full bg-muted h-1 rounded-full mt-4 overflow-hidden">
                <div 
                  className={`h-full ${isSelected ? "bg-primary" : isPast ? "bg-primary/40" : "bg-transparent"}`}
                  style={{ width: "100%" }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Step Detail Stage Card */}
      <Card className="bg-card border-border shadow-sm overflow-hidden relative">
        <div className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/40">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                <Clock className="w-3.5 h-3.5" /> Stage {activeStep.step} of 4 • {activeStep.timeframe}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                {activeStep.name}
              </h3>
            </div>
            <div className="shrink-0 bg-muted/30 px-4 py-2 rounded-xl border border-border/60">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Primary Goal:</span>
              <span className="text-sm font-semibold text-foreground/90">{activeStep.goal}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 pt-8">
            {/* Action Checklist */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Concrete Contributor Actions:
              </h4>

              <div className="space-y-3">
                {activeStep.actions.map((action, i) => (
                  <div 
                    key={i} 
                    className="p-4 rounded-xl bg-muted/30 border border-border/40 hover:border-border transition-colors flex items-start gap-3.5"
                  >
                    <div className="w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
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
              <div className="p-6 rounded-2xl bg-muted/30 border border-border/40 relative">
                <Quote className="w-8 h-8 text-muted-foreground/20 absolute top-4 right-4" />
                <div className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                  What Maintainers Are Thinking:
                </div>
                <blockquote className="text-sm md:text-base italic text-foreground/90 leading-relaxed mb-4">
                  "{activeStep.maintainerPerspective}"
                </blockquote>
                <div className="text-xs text-muted-foreground">
                  Signals demonstrated: <span className="text-foreground font-semibold">Self-reliance, Attention to detail, Respect for reviewer time</span>
                </div>
              </div>

              {/* Navigation buttons between steps */}
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex(prev => prev - 1)}
                  className="px-4 py-2 rounded-lg border border-border text-xs font-semibold text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  ← Previous Step
                </button>
                <button
                  disabled={activeStepIndex === TRUST_LADDER.length - 1}
                  onClick={() => setActiveStepIndex(prev => prev + 1)}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors flex items-center gap-1.5"
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
