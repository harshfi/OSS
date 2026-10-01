import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { workflowSteps } from "./WorkflowData";
import type { Node, GraphState } from "./WorkflowData";
import { Button } from "@/components/ui/button";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface WorkflowVisualizerProps {
  compact?: boolean; // If true, hide controls and auto-play
}

export function WorkflowVisualizer({ compact = false }: WorkflowVisualizerProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(compact);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % workflowSteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const step = workflowSteps[stepIndex];

  return (
    <div className="flex flex-col space-y-8 w-full max-w-5xl mx-auto p-4 border rounded-xl bg-card text-card-foreground">
      {/* Visual Nodes */}
      <div className="relative flex flex-col md:flex-row justify-between items-stretch md:items-center gap-8 md:gap-4 p-8 min-h-[300px]">
        {/* SVG layer for arrows */}
        {/* We can use absolute positioning to draw arrows, but for now we'll simulate edges with Framer Motion paths or simple lines if active */}

        <NodeGraph node="upstream" title="Upstream" sub="Original Repo" state={step.graph.upstream} isHighlighted={step.highlight.includes("upstream")} />
        
        {/* Edge Origin -> Upstream or Upstream -> Origin */}
        {step.edge && step.edge.from === "upstream" && step.edge.to === "origin" && (
           <Edge arrow="right" label={step.edge.label} />
        )}
        {step.edge && step.edge.from === "origin" && step.edge.to === "upstream" && (
           <Edge arrow="left" label={step.edge.label} />
        )}

        <NodeGraph node="origin" title="Origin" sub="Your Fork" state={step.graph.origin} isHighlighted={step.highlight.includes("origin")} />

        {/* Edge Local -> Origin or Origin -> Local */}
        {step.edge && step.edge.from === "origin" && step.edge.to === "local" && (
           <Edge arrow="right" label={step.edge.label} />
        )}
        {step.edge && step.edge.from === "local" && step.edge.to === "origin" && (
           <Edge arrow="left" label={step.edge.label} />
        )}

        {/* Sync edge (Upstream to Local directly) - skipping simple layout for this edge to keep flexbox simple. */}

        <NodeGraph node="local" title="Local" sub="Your Computer" state={step.graph.local} isHighlighted={step.highlight.includes("local")} />
      </div>

      {/* Explainer and Controls */}
      {!compact && (
        <div className="flex flex-col space-y-4 pt-4 border-t border-border">
          <div aria-live="polite" className="space-y-2">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full inline-flex items-center justify-center text-sm font-mono">{step.id}</span>
              {step.title}
            </h3>
            {step.command && (
              <pre className="p-2 bg-muted rounded-md text-sm font-mono overflow-x-auto text-muted-foreground border border-border">
                {step.command}
              </pre>
            )}
            <p className="text-muted-foreground text-sm max-w-2xl">{step.explain}</p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button size="icon" variant="outline" disabled={stepIndex === 0} onClick={() => setStepIndex((prev) => prev - 1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" disabled={stepIndex === workflowSteps.length - 1} onClick={() => setStepIndex((prev) => prev + 1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex-1 max-w-md hidden sm:block">
               <Progress value={((stepIndex + 1) / workflowSteps.length) * 100} className="h-2" />
            </div>

            <div className="text-sm font-mono text-muted-foreground hidden sm:block">
              {stepIndex + 1} / {workflowSteps.length}
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
      <div className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-4 opacity-50`}>
        <h4 className="font-bold text-lg mb-1">{title}</h4>
        <span className="text-xs text-muted-foreground">{sub}</span>
        <div className="mt-4 text-sm text-muted-foreground">Not initialized</div>
      </div>
    );
  }

  return (
    <motion.div 
      layout
      className={`flex-1 flex flex-col items-center border-2 rounded-xl p-4 transition-colors duration-500 ${isHighlighted ? 'border-primary bg-primary/5' : 'border-border/50 bg-background/50'}`}
    >
      <h4 className="font-bold text-lg mb-1">{title}</h4>
      <span className="text-xs text-muted-foreground">{sub}</span>
      
      <div className="mt-8 flex flex-col gap-2 items-center w-full">
        <AnimatePresence mode="popLayout">
          {state.commits.map((c) => (
            <motion.div
              layoutId={`${node}-${c.id}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              key={c.id}
              className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${c.branch === 'main' ? 'bg-blue-500/20 border-blue-500' : 'bg-green-500/20 border-green-500'} relative z-10`}
            />
          ))}
        </AnimatePresence>
        
        {/* Simple rendering of branches */}
        {state.branches.length > 1 && (
          <div className="mt-2 text-xs font-mono bg-muted px-2 py-1 rounded-md text-muted-foreground border">
            + feature branch
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Edge({ arrow, label }: { arrow: "left" | "right", label: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-0 md:py-0 text-primary">
      <span className="text-xs font-mono mb-1 bg-primary/10 px-2 py-0.5 rounded-full">{label}</span>
      {arrow === "right" ? (
        <motion.div 
          initial={{ x: -10, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          className="h-[2px] w-12 bg-primary relative"
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-[6px] border-l-primary" />
        </motion.div>
      ) : (
        <motion.div 
          initial={{ x: 10, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          className="h-[2px] w-12 bg-primary relative"
        >
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-[6px] border-r-primary" />
        </motion.div>
      )}
    </div>
  );
}
