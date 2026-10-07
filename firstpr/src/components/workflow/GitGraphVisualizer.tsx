import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GitCommit, GitMerge, AlertCircle, ChevronRight, ChevronLeft, RotateCcw, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GitGraphVisualizerProps {
  scenario: "merge-conflict" | "rebase" | "etiquette";
  className?: string;
}

export function GitGraphVisualizer({ scenario, className }: GitGraphVisualizerProps) {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const maxSteps = scenario === "etiquette" ? 3 : 4;

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStep(s => {
        if (s >= maxSteps - 1) {
          setIsPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [isPlaying, maxSteps]);

  const handleNext = () => {
    setIsPlaying(false);
    setStep(s => Math.min(s + 1, maxSteps - 1));
  };
  
  const handlePrev = () => {
    setIsPlaying(false);
    setStep(s => Math.max(s - 1, 0));
  };
  
  const handleReset = () => {
    setIsPlaying(false);
    setStep(0);
  };

  const renderScenario = () => {
    if (scenario === "merge-conflict") {
      return (
        <div className="relative w-full h-[180px]">
          {/* SVG Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <defs>
              <marker id="arrow-blue" viewBox="0 0 10 10" refX="16" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" className="fill-blue-500/50" />
              </marker>
              <marker id="arrow-primary" viewBox="0 0 10 10" refX="16" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary/50" />
              </marker>
            </defs>

            {/* Main Branch Base */}
            <line x1="10%" y1="50" x2="40%" y2="50" strokeWidth="4" className="stroke-blue-500/30" markerEnd="url(#arrow-blue)" />
            
            {/* Feature Branch Base */}
            <AnimatePresence>
              {step >= 0 && (
                <motion.line 
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  x1="10%" y1="50" x2="40%" y2="130" strokeWidth="4" className="stroke-primary/30" markerEnd="url(#arrow-primary)" 
                />
              )}
              {step >= 1 && (
                <motion.line 
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  x1="40%" y1="130" x2="65%" y2="130" strokeWidth="4" className="stroke-primary/30" markerEnd="url(#arrow-primary)" 
                />
              )}
              {step >= 3 && (
                <>
                  <motion.line 
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    x1="40%" y1="50" x2="90%" y2="50" strokeWidth="4" className="stroke-blue-500/30" markerEnd="url(#arrow-blue)" 
                  />
                  <motion.line 
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    x1="65%" y1="130" x2="90%" y2="50" strokeWidth="4" className="stroke-primary/30" markerEnd="url(#arrow-primary)" 
                  />
                </>
              )}
            </AnimatePresence>
          </svg>

          {/* Nodes */}
          <div className="absolute left-[10%] top-[50px] -translate-x-1/2 -translate-y-1/2">
            <CommitNode color="blue" hash="a1b2" />
          </div>
          <div className="absolute left-[40%] top-[50px] -translate-x-1/2 -translate-y-1/2">
            <CommitNode color="blue" hash="c3d4" />
          </div>
          
          <div className="absolute left-[40%] top-[130px] -translate-x-1/2 -translate-y-1/2">
            <CommitNode color="primary" hash="e5f6" />
          </div>
          
          <AnimatePresence>
            {step >= 1 && (
              <motion.div 
                className="absolute left-[65%] top-[130px] -translate-x-1/2 -translate-y-1/2" 
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              >
                <CommitNode color="primary" hash="g7h8" />
              </motion.div>
            )}
            
            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5 }}
                className="absolute top-[80px] left-[65%] -translate-x-1/2 -translate-y-1/2 z-20 bg-destructive/10 border border-destructive/30 text-destructive px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-lg shadow-destructive/10"
              >
                <AlertCircle className="w-3 h-3" /> Conflict!
              </motion.div>
            )}

            {step >= 3 && (
              <motion.div 
                className="absolute left-[90%] top-[50px] -translate-x-1/2 -translate-y-1/2" 
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              >
                <CommitNode color="green" hash="merge" icon={<GitMerge className="w-3 h-3" />} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }
    
    if (scenario === "rebase") {
      return (
        <div className="relative w-full h-[180px]">
          {/* SVG Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <defs>
              <marker id="arrow-blue2" viewBox="0 0 10 10" refX="16" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" className="fill-blue-500/50" />
              </marker>
              <marker id="arrow-primary2" viewBox="0 0 10 10" refX="16" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary/50" />
              </marker>
            </defs>

            {/* Main Branch */}
            <line x1="10%" y1="50" x2="40%" y2="50" strokeWidth="4" className="stroke-blue-500/30" markerEnd="url(#arrow-blue2)" />
            
            {/* Feature Branch BEFORE Rebase */}
            <AnimatePresence>
              {step < 2 && (
                <motion.line 
                  exit={{ opacity: 0 }}
                  x1="10%" y1="50" x2="40%" y2="130" strokeWidth="4" className="stroke-primary/30" markerEnd="url(#arrow-primary2)" 
                />
              )}
              {step === 1 && (
                <motion.line 
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} exit={{ opacity: 0 }}
                  x1="40%" y1="130" x2="65%" y2="130" strokeWidth="4" className="stroke-primary/30" markerEnd="url(#arrow-primary2)" 
                />
              )}
              
              {/* Feature Branch AFTER Rebase */}
              {step >= 2 && (
                <motion.line 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  x1="40%" y1="50" x2="65%" y2="50" strokeWidth="4" className="stroke-primary/30" markerEnd="url(#arrow-primary2)" 
                />
              )}
              {step >= 3 && (
                <motion.line 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  x1="65%" y1="50" x2="90%" y2="50" strokeWidth="4" className="stroke-primary/30" markerEnd="url(#arrow-primary2)" 
                />
              )}
            </AnimatePresence>
          </svg>

          {/* Nodes */}
          <div className="absolute left-[10%] top-[50px] -translate-x-1/2 -translate-y-1/2">
            <CommitNode color="blue" hash="a1b2" />
          </div>
          <div className="absolute left-[40%] top-[50px] -translate-x-1/2 -translate-y-1/2">
            <CommitNode color="blue" hash="c3d4" />
          </div>
          
          <motion.div 
            className="absolute"
            animate={{ 
              top: step >= 2 ? "50px" : "130px", 
              left: step >= 2 ? "65%" : "40%",
              x: "-50%", y: "-50%"
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <CommitNode color="primary" hash={step >= 2 ? "e5f6'" : "e5f6"} />
          </motion.div>
          
          <AnimatePresence>
            {step >= 1 && (
              <motion.div 
                className="absolute"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, scale: 1,
                  top: step >= 2 ? "50px" : "130px", 
                  left: step >= 2 ? "90%" : "65%",
                  x: "-50%", y: "-50%"
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                <CommitNode color="primary" hash={step >= 2 ? "g7h8'" : "g7h8"} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    // Etiquette
    return (
      <div className="w-full flex flex-col items-center justify-center space-y-4 h-[180px] p-4">
        <motion.div 
          animate={{ scale: step === 0 ? 1.05 : 1, opacity: step === 0 ? 1 : 0.4 }}
          className="flex items-center gap-4 bg-muted/30 p-3 rounded-xl border border-border w-full max-w-sm"
        >
          <div className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm">1</div>
          <div className="flex flex-col">
            <span className="font-bold text-sm">Communicate Early</span>
            <span className="text-[11px] text-muted-foreground">Open an issue before coding</span>
          </div>
        </motion.div>
        
        <motion.div 
          animate={{ scale: step === 1 ? 1.05 : 1, opacity: step === 1 ? 1 : 0.4 }}
          className="flex items-center gap-4 bg-muted/30 p-3 rounded-xl border border-border w-full max-w-sm"
        >
          <div className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm">2</div>
          <div className="flex flex-col">
            <span className="font-bold text-sm">Keep PRs Small</span>
            <span className="text-[11px] text-muted-foreground">Easier to review & merge</span>
          </div>
        </motion.div>

        <motion.div 
          animate={{ scale: step === 2 ? 1.05 : 1, opacity: step === 2 ? 1 : 0.4 }}
          className="flex items-center gap-4 bg-muted/30 p-3 rounded-xl border border-border w-full max-w-sm"
        >
          <div className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm">3</div>
          <div className="flex flex-col">
            <span className="font-bold text-sm">Be Patient</span>
            <span className="text-[11px] text-muted-foreground">Maintainers are volunteers</span>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className={cn("flex flex-col w-full max-w-[420px] mx-auto p-4 border border-border/50 rounded-3xl bg-card/40 backdrop-blur-md text-card-foreground shadow-xl shadow-black/5", className)}>
      <div className="relative flex flex-col justify-center items-center p-2 min-h-[180px] rounded-2xl bg-background/50 border border-border/40 shadow-inner overflow-hidden">
        {renderScenario()}
      </div>
      
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/30 p-3 rounded-2xl border border-border/40">
        <h3 className="font-bold text-[1.05rem] capitalize px-2 leading-tight hidden sm:block">{scenario.replace("-", " ")}</h3>
        
        <div className="flex items-center gap-2">
          <Button size="icon" variant={isPlaying ? "default" : "secondary"} className={cn("w-10 h-10 rounded-full transition-all", isPlaying && "shadow-lg shadow-primary/30")} onClick={() => {
            if (step >= maxSteps - 1) setStep(0);
            setIsPlaying(!isPlaying);
          }}>
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </Button>
          
          <div className="flex items-center gap-1 ml-1 bg-background/50 rounded-full p-1 border border-border/50">
            <Button size="icon" variant="ghost" className="w-8 h-8 rounded-full hover:bg-muted" disabled={step === 0} onClick={handlePrev}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex gap-1 px-1">
              {Array.from({ length: maxSteps }).map((_, i) => (
                <div key={i} className={cn("w-2 h-2 rounded-full transition-all duration-300", i === step ? "bg-primary scale-110" : i < step ? "bg-primary/40" : "bg-muted-foreground/20")} />
              ))}
            </div>
            <Button size="icon" variant="ghost" className="w-8 h-8 rounded-full hover:bg-muted" disabled={step === maxSteps - 1} onClick={handleNext}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <Button size="icon" variant="ghost" className="w-8 h-8 rounded-full text-muted-foreground hover:text-foreground ml-1" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function CommitNode({ color, hash, icon }: { color: "blue" | "primary" | "green", hash: string, icon?: React.ReactNode }) {
  const colorMap = {
    blue: "bg-blue-500/20 text-blue-500 border-blue-500/30",
    primary: "bg-primary/20 text-primary border-primary/30",
    green: "bg-green-500/20 text-green-500 border-green-500/30",
  };

  return (
    <div className={cn("flex items-center gap-1.5 p-1 pr-2.5 rounded-full border shadow-sm backdrop-blur-sm z-10 bg-background/90", colorMap[color])}>
      <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0 shadow-sm", colorMap[color])}>
        {icon || <GitCommit className="w-3 h-3" />}
      </div>
      <span className="text-[10px] font-mono font-bold tracking-tight">{hash}</span>
    </div>
  );
}
