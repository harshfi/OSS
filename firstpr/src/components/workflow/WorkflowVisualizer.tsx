import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { workflowSteps } from "./WorkflowData";
import type { Node, GraphState } from "./WorkflowData";
import { Button } from "@/components/ui/button";
import { Play, Pause, ChevronLeft, ChevronRight, GitCommit, ArrowRight, ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface WorkflowVisualizerProps {
  compact?: boolean; // If true, hide controls and auto-play
  stepIndex?: number;
  onStepChange?: (index: number) => void;
  showControls?: boolean;
  className?: string;
}

export function WorkflowVisualizer({ 
  compact = false,
  stepIndex: controlledStepIndex,
  onStepChange,
  showControls = true,
  className
}: WorkflowVisualizerProps) {
  const [internalStepIndex, setInternalStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(compact);

  const stepIndex = controlledStepIndex !== undefined ? controlledStepIndex : internalStepIndex;

  const handleStepChange = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= workflowSteps.length) return;
    if (onStepChange) onStepChange(newIndex);
    else setInternalStepIndex(newIndex);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      handleStepChange((stepIndex + 1) % workflowSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, stepIndex]);

  const step = workflowSteps[stepIndex];

  return (
    <div className={cn("flex flex-col space-y-8 w-full max-w-5xl mx-auto p-5 md:p-8 border border-border/50 rounded-[2rem] bg-card/40 backdrop-blur-md text-card-foreground shadow-2xl shadow-black/10", className)}>
      
      {/* Visual Canvas */}
      <div className="relative flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 p-6 md:p-8 min-h-[360px] rounded-2xl bg-background/50 border border-border/40 shadow-inner">
        
        <NodeGraph 
          node="upstream" 
          title="Upstream" 
          sub="Original Repo" 
          state={step.graph.upstream} 
          isHighlighted={step.highlight.includes("upstream")} 
        />
        
        {step.edge && step.edge.from === "upstream" && step.edge.to === "origin" && (
           <Edge arrow="right" label={step.edge.label} />
        )}
        {step.edge && step.edge.from === "origin" && step.edge.to === "upstream" && (
           <Edge arrow="left" label={step.edge.label} />
        )}

        <NodeGraph 
          node="origin" 
          title="Origin" 
          sub="Your Fork" 
          state={step.graph.origin} 
          isHighlighted={step.highlight.includes("origin")} 
        />

        {step.edge && step.edge.from === "origin" && step.edge.to === "local" && (
           <Edge arrow="right" label={step.edge.label} />
        )}
        {step.edge && step.edge.from === "local" && step.edge.to === "origin" && (
           <Edge arrow="left" label={step.edge.label} />
        )}

        <NodeGraph 
          node="local" 
          title="Local" 
          sub="Your Computer" 
          state={step.graph.local} 
          isHighlighted={step.highlight.includes("local")} 
        />
      </div>

      {/* Explainer and Controls */}
      {showControls && !compact && (
        <div className="flex flex-col space-y-6 pt-2">
          <div aria-live="polite" className="space-y-4 min-h-[130px] px-2">
            <h3 className="text-xl md:text-2xl font-bold flex items-center gap-3 text-foreground">
              <span className="bg-primary/20 text-primary w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-bold font-mono ring-1 ring-primary/40 shadow-sm shadow-primary/20 shrink-0">
                {step.id}
              </span>
              {step.title}
            </h3>
            {step.command && (
              <pre className="p-3.5 bg-muted/80 rounded-xl text-sm font-mono overflow-x-auto text-primary-foreground border border-border shadow-inner">
                {step.command}
              </pre>
            )}
            <p className="text-muted-foreground text-[15px] leading-relaxed max-w-3xl">
              {step.explain}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-muted/30 p-4 rounded-2xl border border-border/40">
            <div className="flex items-center gap-2">
              <Button size="icon" variant={isPlaying ? "default" : "secondary"} className={cn("w-12 h-12 rounded-full transition-all", isPlaying && "shadow-lg shadow-primary/30")} onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
              </Button>
              <div className="flex items-center gap-1 ml-2 bg-background/50 rounded-full p-1 border border-border/50">
                <Button size="icon" variant="ghost" className="w-10 h-10 rounded-full hover:bg-muted" disabled={stepIndex === 0} onClick={() => handleStepChange(stepIndex - 1)}>
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" className="w-10 h-10 rounded-full hover:bg-muted" disabled={stepIndex === workflowSteps.length - 1} onClick={() => handleStepChange(stepIndex + 1)}>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 w-full flex items-center gap-5 sm:pl-4">
               <Progress value={((stepIndex + 1) / workflowSteps.length) * 100} className="h-2 w-full bg-border" />
               <div className="text-sm font-mono font-bold text-muted-foreground shrink-0 w-12 text-right">
                 {stepIndex + 1} <span className="text-muted-foreground/50">/</span> {workflowSteps.length}
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NodeGraph({ node, title, sub, state, isHighlighted }: { node: Node; title: string; sub: string; state: GraphState | null; isHighlighted: boolean }) {
  if (!state) {
    return (
      <div className="flex-1 w-full md:w-auto flex flex-col items-center justify-center border-2 border-dashed border-border/40 bg-muted/5 rounded-[1.5rem] p-6 opacity-50 min-h-[220px]">
        <h4 className="font-bold text-xl mb-1 tracking-tight">{title}</h4>
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{sub}</span>
        <div className="mt-8 text-xs text-muted-foreground font-mono bg-muted/50 px-3 py-1.5 rounded-md">Not initialized</div>
      </div>
    );
  }

  return (
    <motion.div 
      layout
      className={cn(
        "flex-1 w-full md:w-auto flex flex-col items-center border rounded-[1.5rem] p-6 transition-all duration-500 min-h-[220px] relative overflow-hidden",
        isHighlighted 
          ? "border-primary/80 bg-primary/5 shadow-2xl shadow-primary/10 ring-1 ring-primary/30 md:scale-[1.03] z-10" 
          : "border-border/60 bg-card/60 hover:bg-card"
      )}
    >
      {isHighlighted && (
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
      )}
      
      <div className="text-center mb-8 relative z-10">
        <h4 className="font-bold text-2xl tracking-tight text-foreground">{title}</h4>
        <span className="text-[11px] font-bold text-primary/90 uppercase tracking-widest">{sub}</span>
      </div>
      
      <div className="flex flex-col gap-3 items-center w-full justify-end relative z-10">
        <AnimatePresence mode="popLayout">
          {state.commits.map((c) => (
            <motion.div
              layoutId={`${node}-${c.id}`}
              initial={{ scale: 0.5, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              key={c.id}
              className={cn(
                "relative flex items-center gap-3 p-2 pr-4 rounded-full border shadow-sm w-full max-w-[220px]",
                c.branch === 'main' 
                  ? "bg-blue-500/10 border-blue-500/30 text-blue-100" 
                  : "bg-primary/10 border-primary/30 text-primary-foreground"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                c.branch === 'main' ? "bg-blue-500/20 text-blue-400" : "bg-primary/20 text-primary"
              )}>
                <GitCommit className="w-4 h-4" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-[11px] font-mono font-bold truncate opacity-90">{c.hash}</span>
                <span className="text-[10px] font-sans truncate opacity-70 leading-tight">{c.message}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {state.branches.length > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-[10px] font-mono bg-muted/80 px-3 py-1.5 rounded-full text-foreground/70 border border-border/50 shadow-sm"
          >
            + feature branch
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function Edge({ arrow, label }: { arrow: "left" | "right", label: string }) {
  return (
    <div className="hidden md:flex flex-col items-center justify-center px-2 z-10 w-28 shrink-0 relative">
      <motion.div 
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        key={label}
        className="text-[10px] font-mono font-bold mb-3 bg-primary text-primary-foreground px-3 py-1 rounded-md shadow-lg shadow-primary/20 whitespace-nowrap z-20"
      >
        {label}
      </motion.div>
      <div className="relative w-full h-[2px] bg-primary/20 rounded-full">
        {arrow === "right" ? (
          <motion.div 
            initial={{ x: "-100%" }} 
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent w-1/2"
          />
        ) : (
          <motion.div 
            initial={{ x: "100%" }} 
            animate={{ x: "-100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-l from-transparent via-primary to-transparent w-1/2"
          />
        )}
        
        {arrow === "right" ? (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[6px] text-primary">
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </div>
        ) : (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[6px] text-primary">
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </div>
        )}
      </div>
    </div>
  );
}
