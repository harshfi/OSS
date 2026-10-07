import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Laptop, Cloud, FileCode, CheckCircle, ArrowDown, ArrowUp, ArrowRight, GitMerge, FileText, Play, Pause, ChevronLeft, ChevronRight, RotateCcw, Globe, GitFork } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  scenario: string;
  className?: string;
}

export function GitCommandVisualizer({ scenario, className }: Props) {
  const [step, setStep] = useState(0);
  
  // Scenarios define how many steps they have
  const stepsMap: Record<string, number> = {
    "fork": 2,
    "clone": 2,
    "remote": 2,
    "branch": 2,
    "commit": 3,
    "push": 2,
    "pull-request": 2,
    "review": 3
  };
  
  const maxSteps = stepsMap[scenario] || 1;

  const [isPlaying, setIsPlaying] = useState(false);

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
    switch (scenario) {
      case "fork":
        return (
          <div className="relative w-full h-[180px] flex items-center justify-center">
            <div className="absolute left-[20%] flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-blue-500/10 border-2 border-blue-500/30 rounded-xl flex items-center justify-center text-blue-500">
                <Globe className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold text-blue-500">Original Repo</span>
            </div>
            
            <AnimatePresence>
              {step >= 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: -40, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-[20%] flex flex-col items-center gap-2"
                >
                  <div className="w-16 h-16 bg-primary/10 border-2 border-primary/30 rounded-xl flex items-center justify-center text-primary">
                    <GitFork className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-bold text-primary">Your Fork</span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {step >= 1 && (
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 100 }}
                  className="absolute top-1/2 left-[calc(20%+40px)] -translate-y-1/2 h-0.5 bg-primary/40"
                >
                  <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 text-primary/60 w-4 h-4 translate-x-1/2" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case "clone":
        return (
          <div className="relative w-full h-[180px] flex flex-col items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-primary/10 border-2 border-primary/30 rounded-xl flex items-center justify-center text-primary">
                <Cloud className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">GitHub Fork</span>
            </div>
            
            <AnimatePresence>
              {step >= 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-0.5 bg-primary/40"
                >
                  <ArrowDown className="absolute bottom-0 left-1/2 -translate-x-1/2 text-primary/60 w-4 h-4 translate-y-1/2" />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {step >= 1 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-500">
                    <Laptop className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Local Laptop</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case "remote":
        return (
          <div className="relative w-full h-[180px] flex items-center justify-between px-16">
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-12 h-12 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-500">
                <Laptop className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Local</span>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col gap-10">
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-12 h-12 bg-blue-500/10 border-2 border-blue-500/30 rounded-xl flex items-center justify-center text-blue-500">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Upstream</span>
              </div>
            </div>

            <AnimatePresence>
              {step >= 1 && (
                <motion.svg 
                  className="absolute inset-0 w-full h-full pointer-events-none" 
                  style={{ zIndex: 0 }}
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 1, pathLength: 1 }}
                >
                  <defs>
                    <marker id="arrow-upst" viewBox="0 0 10 10" refX="15" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                      <path d="M 0 0 L 10 5 L 0 10 z" className="fill-blue-500/50" />
                    </marker>
                  </defs>
                  <path d="M 100 90 Q 200 45 300 45" fill="none" strokeWidth="2" strokeDasharray="4 4" className="stroke-blue-500/40" markerEnd="url(#arrow-upst)" />
                </motion.svg>
              )}
            </AnimatePresence>
          </div>
        );

      case "branch":
        return (
          <div className="relative w-full h-[180px] flex items-center justify-center gap-12">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full border-4 border-blue-500 bg-background flex items-center justify-center z-10"></div>
              <div className="px-2 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-bold rounded">main</div>
            </div>

            <AnimatePresence>
              {step >= 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full border-4 border-primary bg-background flex items-center justify-center z-10"></div>
                  <div className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded">feature</div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {step >= 1 && (
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  className="absolute top-1/2 left-[calc(50%-24px)] -translate-y-1/2 h-1 bg-primary/40 -z-10"
                ></motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case "commit":
        return (
          <div className="relative w-full h-[180px] flex items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-2 opacity-50">
              <FileCode className="w-8 h-8 text-foreground" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Working Dir</span>
            </div>

            <AnimatePresence>
              {step >= 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col items-center gap-2 text-primary"
                >
                  <FileText className="w-8 h-8" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Staged</span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {step >= 2 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-2 text-emerald-500"
                >
                  <div className="w-8 h-8 rounded-full border-4 border-emerald-500 bg-background"></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Committed</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case "push":
        return (
          <div className="relative w-full h-[180px] flex flex-col items-center justify-center gap-12">
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-12 h-12 bg-primary/10 border-2 border-primary/30 rounded-xl flex items-center justify-center text-primary">
                <Cloud className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">origin</span>
            </div>

            <AnimatePresence>
              {step >= 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-0.5 bg-primary/40"
                >
                  <ArrowUp className="absolute top-0 left-1/2 -translate-x-1/2 text-primary/60 w-4 h-4 -translate-y-1/2" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-8 h-8 rounded-full border-4 border-emerald-500 bg-background"></div>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">local commit</span>
            </div>
          </div>
        );

      case "pull-request":
        return (
          <div className="relative w-full h-[180px] flex items-center justify-center gap-16">
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-12 h-12 bg-primary/10 border-2 border-primary/30 rounded-xl flex items-center justify-center text-primary">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Your Fork</span>
            </div>

            <AnimatePresence>
              {step >= 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg shadow-blue-500/20 flex items-center gap-1 z-20"
                >
                  <GitMerge className="w-3 h-3" /> PR #123
                </motion.div>
              )}
            </AnimatePresence>
            
            <AnimatePresence>
              {step >= 1 && (
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  className="absolute top-1/2 left-[calc(50%-32px)] -translate-y-1/2 h-0.5 bg-blue-500/40 border border-dashed border-blue-500/60 z-10"
                ></motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-12 h-12 bg-blue-500/10 border-2 border-blue-500/30 rounded-xl flex items-center justify-center text-blue-500">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Upstream</span>
            </div>
          </div>
        );

      case "review":
        return (
          <div className="relative w-full h-[180px] flex flex-col items-center justify-center gap-4">
            <div className="bg-muted border border-border px-4 py-3 rounded-xl flex items-center gap-4 w-64 shadow-sm">
              <div className="w-8 h-8 bg-blue-500/20 text-blue-500 rounded flex items-center justify-center"><GitMerge className="w-4 h-4" /></div>
              <div className="flex flex-col flex-1">
                <span className="text-sm font-bold">Fix broken link</span>
                <span className="text-[10px] text-muted-foreground">#123 opened by you</span>
              </div>
            </div>

            <AnimatePresence>
              {step >= 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> Approved
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {step >= 2 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 bg-primary text-white px-3 py-2 rounded-lg text-xs font-bold shadow-xl flex items-center gap-1.5"
                >
                  <GitMerge className="w-4 h-4" /> Merged!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      default:
        return <div>Scenario not implemented</div>;
    }
  };

  return (
    <div className={cn("flex flex-col w-full max-w-[420px] mx-auto p-4 border border-border/50 rounded-[1.5rem] bg-card/40 backdrop-blur-md text-card-foreground shadow-xl shadow-black/5", className)}>
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
