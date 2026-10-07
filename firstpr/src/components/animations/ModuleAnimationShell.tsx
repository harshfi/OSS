import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { animationConfigs } from "./config";
import { AnimatePresence, motion } from "motion/react";

// Lazy load scenes or import them directly. For now we will import them directly.
// In a real app we'd map moduleId to a specific Scene component.
// We'll create a mapping component below.
import { Module01Intro } from "./scenes/Module01Intro";
import { Module02Terms } from "./scenes/Module02Terms";
import { Module03Setup } from "./scenes/Module03Setup";
import { Module04Find } from "./scenes/Module04Find";
import { Module05Fork } from "./scenes/Module05Fork";
import { Module06Remote } from "./scenes/Module06Remote";
import { Module07Branch } from "./scenes/Module07Branch";
import { Module08Commit } from "./scenes/Module08Commit";
import { Module09Commit } from "./scenes/Module09Commit";
import { Module10Push } from "./scenes/Module10Push";
import { Module11PR } from "./scenes/Module11PR";
import { Module12Review } from "./scenes/Module12Review";
import { Module13Conflict } from "./scenes/Module13Conflict";
import { Module14Rebase } from "./scenes/Module14Rebase";
import { Module15Etiquette } from "./scenes/Module15Etiquette";

type ValidModuleId = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12" | "13" | "14" | "15";

const scenes: Record<ValidModuleId, React.FC<{ step: number }>> = {
  "01": Module01Intro,
  "02": Module02Terms,
  "03": Module03Setup,
  "04": Module04Find,
  "05": Module05Fork,
  "06": Module06Remote,
  "07": Module07Branch,
  "08": Module08Commit,
  "09": Module09Commit,
  "10": Module10Push,
  "11": Module11PR,
  "12": Module12Review,
  "13": Module13Conflict,
  "14": Module14Rebase,
  "15": Module15Etiquette,
};

interface Props {
  moduleId: string;
  className?: string;
}

export function ModuleAnimationShell({ moduleId, className }: Props) {
  // TypeScript will complain if we access invalid ID without type casting, but we enforce it here:
  const validId = moduleId as ValidModuleId;
  const config = animationConfigs[validId];
  if (!config) throw new Error(`Missing animation config for module ${moduleId}`);
  
  const maxSteps = config.steps.length;
  const SceneComponent = scenes[validId];
  if (!SceneComponent) throw new Error(`Missing scene component for module ${moduleId}`);

  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-advance logic
  useEffect(() => {
    if (!isPlaying) return;
    
    const currentStepConfig = config.steps[step];
    const duration = currentStepConfig.duration || 2000;

    const timer = setTimeout(() => {
      setStep(s => {
        if (s >= maxSteps - 1) {
          setIsPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, duration);
    
    return () => clearTimeout(timer);
  }, [isPlaying, step, maxSteps, config.steps]);

  // Start auto-play once on mount (or when scrolled into view)
  // For simplicity, we just trigger it on mount.
  useEffect(() => {
    setStep(0);
    setIsPlaying(true);
  }, [moduleId]);

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

  const currentStepData = config.steps[step];

  return (
    <div className={cn("flex flex-col w-full max-w-[420px] mx-auto p-4 border border-border/50 rounded-[1.5rem] bg-card/40 backdrop-blur-md text-card-foreground shadow-xl shadow-black/5", className)}>
      
      {/* Animation Canvas */}
      <div className="w-full">
        <SceneComponent step={step} />
      </div>

      {/* Caption & Controls */}
      <div className="mt-4 flex flex-col items-center gap-4 bg-muted/30 p-4 rounded-2xl border border-border/40">
        
        {/* Caption */}
        <div className="h-10 flex items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-semibold"
            >
              <span className="text-muted-foreground mr-1.5">{step + 1}.</span>
              {currentStepData.caption}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Control Bar */}
        <div className="w-full flex items-center justify-between">
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
            <div className="flex gap-1.5 px-2">
              {config.steps.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => { setStep(i); setIsPlaying(false); }}
                  className={cn(
                    "relative h-2 rounded-full overflow-hidden transition-all duration-300",
                    i < step ? "bg-primary/40" : "bg-muted-foreground/20"
                  )}
                  style={{ width: i === step ? "32px" : "8px" }}
                >
                  {i === step && (
                    <motion.div
                      key={step + (isPlaying ? "-playing" : "-paused")}
                      className="absolute inset-0 bg-primary"
                      initial={{ width: isPlaying ? "0%" : "100%" }}
                      animate={{ width: "100%" }}
                      transition={{ 
                        duration: isPlaying ? (config.steps[i].duration || 2000) / 1000 : 0, 
                        ease: "linear" 
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
            <Button size="icon" variant="ghost" className="w-8 h-8 rounded-full hover:bg-muted" disabled={step === maxSteps - 1} onClick={handleNext}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <Button size="icon" variant="ghost" className="w-8 h-8 rounded-full text-muted-foreground hover:text-foreground" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
