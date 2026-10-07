import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RepoCard } from "../primitives";
import { Stage, TerminalDock, SLOTS, Connector } from "../Layout";
import { Globe, GitFork, Laptop, CheckCircle2 } from "lucide-react";

export function Module06Remote({ step }: { step: number }) {
  const [typingProgress, setTypingProgress] = useState(0);

  useEffect(() => {
    if (step === 2 || step === 3) {
      setTypingProgress(0);
      const interval = setInterval(() => {
        setTypingProgress(p => Math.min(p + 0.05, 1));
      }, 50);
      return () => clearInterval(interval);
    } else {
      setTypingProgress(step > 3 ? 1 : 0);
    }
  }, [step]);

  const getCamera = () => {
    switch (step) {
      case 0: return { x: -30, y: -20, scale: 1.1 };
      case 1: return { x: 30, y: 10, scale: 1.1 };
      case 2: return { x: 0, y: 0, scale: 1.05 };
      case 3: return { x: 30, y: -10, scale: 1.1 };
      case 4: return { x: 0, y: 20, scale: 1.1 };
      default: return { x: 0, y: 0, scale: 1 };
    }
  };

  const command = step === 2 
    ? "git remote add upstream https://github.com/..." 
    : "git fetch upstream";

  return (
    <Stage camera={getCamera()}>
      {/* Upstream Repo (fades in step 1) */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: step >= 1 ? 1 : 0, 
          scale: step >= 1 ? 1 : 0.8,
        }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        <RepoCard 
          title="Upstream" 
          icon={<Globe className="w-6 h-6" />} 
          variant="upstream" 
          x={SLOTS.topLeft.x} 
          y={SLOTS.topLeft.y} 
          className={step === 1 ? "animate-pulse" : ""}
        />
      </motion.g>

      {/* Origin Repo */}
      <motion.g
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <RepoCard 
          title="Origin (Fork)" 
          icon={<GitFork className="w-6 h-6" />} 
          variant="fork" 
          x={SLOTS.topRight.x} 
          y={SLOTS.topRight.y} 
        />
      </motion.g>

      {/* Local Laptop */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <RepoCard 
          title="Local Repo" 
          icon={<Laptop className="w-6 h-6" />} 
          variant="local" 
          x={SLOTS.bottomCenter.x} 
          y={SLOTS.bottomCenter.y} 
        />
      </motion.g>

      {/* Connector: Local to Origin */}
      <Connector 
        from={{ x: SLOTS.bottomCenter.x + 20, y: SLOTS.bottomCenter.y - 40 }} 
        to={{ x: SLOTS.topRight.x, y: SLOTS.topRight.y + 40 }} 
        label="origin"
        animated={step >= 4}
        color="var(--scene-fork-stroke)"
        packet={step >= 4}
      />

      {/* Connector: Local to Upstream */}
      <AnimatePresence>
        {step >= 2 && typingProgress > 0.8 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Connector 
              from={{ x: SLOTS.bottomCenter.x - 20, y: SLOTS.bottomCenter.y - 40 }} 
              to={{ x: SLOTS.topLeft.x, y: SLOTS.topLeft.y + 40 }} 
              label="upstream"
              animated={step >= 3 && typingProgress > 0.8}
              color="var(--scene-upstream-stroke)"
              packet={step === 3 && typingProgress > 0.8}
            />
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 3 && typingProgress > 0.8 && (
          <motion.foreignObject 
            x={SLOTS.bottomCenter.x - 60} 
            y={SLOTS.bottomCenter.y - 50} 
            width={120} height={30}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex justify-center">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg border" style={{ backgroundColor: 'var(--scene-upstream-fill)', borderColor: 'var(--scene-upstream-stroke)', color: 'var(--scene-upstream-stroke)' }}>
                +3 new commits
              </span>
            </div>
          </motion.foreignObject>
        )}
      </AnimatePresence>

      {/* Success mark */}
      <AnimatePresence>
        {step === 4 && (
          <motion.foreignObject
            x={SLOTS.bottomCenter.x + 10} 
            y={SLOTS.bottomCenter.y - 30} 
            width={40} height={40}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="overflow-visible"
          >
            <div className="relative w-8 h-8 text-[var(--scene-success-stroke)] drop-shadow-xl">
              <CheckCircle2 className="w-8 h-8 fill-[var(--scene-success-fill)]" />
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-[var(--scene-success-stroke)]"
                animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </motion.foreignObject>
        )}
      </AnimatePresence>

      <TerminalDock 
        command={command} 
        typingProgress={typingProgress}
        isVisible={step === 2 || step === 3}
      />
    </Stage>
  );
}
