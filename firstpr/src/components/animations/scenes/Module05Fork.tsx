import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { RepoCard, Cursor } from "../primitives";
import { Stage, TerminalDock, SLOTS, Connector } from "../Layout";
import { Globe, GitFork, Laptop } from "lucide-react";

export function Module05Fork({ step }: { step: number }) {
  const [typingProgress, setTypingProgress] = useState(0);

  useEffect(() => {
    if (step === 3) {
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
      case 0: return { x: 0, y: 0, scale: 1 };
      case 1: return { x: 30, y: 10, scale: 1.05 };
      case 2: return { x: -30, y: 10, scale: 1.05 };
      case 3: return { x: 0, y: -20, scale: 1.05 };
      default: return { x: 0, y: 0, scale: 1 };
    }
  };

  return (
    <Stage camera={getCamera()}>
      {/* Connection Line (Fork) */}
      <Connector 
        from={{ x: SLOTS.topLeft.x + 40, y: SLOTS.topLeft.y }} 
        to={{ x: SLOTS.topRight.x - 40, y: SLOTS.topRight.y }} 
        curve="horizontal"
        animated={step === 2}
        color={step >= 2 ? "var(--scene-fork-stroke)" : "var(--scene-line-idle)"} 
        packet={step === 2}
      />

      {/* Connection Line (Clone) */}
      <Connector 
        from={{ x: SLOTS.topRight.x, y: SLOTS.topRight.y + 40 }} 
        to={{ x: SLOTS.bottomCenter.x, y: SLOTS.bottomCenter.y - 40 }} 
        animated={step === 3 && typingProgress < 1}
        color={step >= 3 ? "var(--scene-local-stroke)" : "var(--scene-line-idle)"} 
        packet={step === 3 && typingProgress < 1}
      />

      {/* Original Repo (Always visible) */}
      <RepoCard 
        title="Original" 
        icon={<Globe className="w-6 h-6" />} 
        variant="upstream" 
        x={SLOTS.topLeft.x} 
        y={SLOTS.topLeft.y} 
      />
      
      {/* Fork Button */}
      <foreignObject x={SLOTS.topLeft.x + 20} y={SLOTS.topLeft.y + 10} width="60" height="30" className="overflow-visible z-20">
        <motion.div 
          className="border shadow-sm rounded-md px-2 py-1 text-[9px] font-bold flex items-center justify-center gap-1"
          animate={{
            scale: step === 1 ? [1, 0.9, 1.1, 1] : 1,
            backgroundColor: step === 1 ? "var(--scene-fork-fill)" : "var(--scene-surface)",
            color: step === 1 ? "var(--scene-fork-stroke)" : "var(--scene-text)",
            borderColor: step === 1 ? "var(--scene-fork-stroke)" : "var(--scene-border)"
          }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <GitFork className="w-3 h-3" /> Fork
        </motion.div>
      </foreignObject>

      {/* Cursor */}
      <AnimateCursor step={step} />

      {/* Your Fork */}
      <motion.g 
        initial={{ opacity: 0, scale: 0.5, x: -50 }}
        animate={{ 
          opacity: step >= 2 ? 1 : 0, 
          scale: step >= 2 ? 1 : 0.5,
          x: step >= 2 ? 0 : -50
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <RepoCard 
          title="Your Fork" 
          icon={<GitFork className="w-6 h-6" />} 
          variant="fork" 
          x={SLOTS.topRight.x} 
          y={SLOTS.topRight.y} 
        />
      </motion.g>

      {/* Local Laptop */}
      <motion.g 
        initial={{ opacity: 0, scale: 0.5, y: -30 }}
        animate={{ 
          opacity: step >= 3 && typingProgress > 0.8 ? 1 : 0, 
          scale: step >= 3 && typingProgress > 0.8 ? 1 : 0.5,
          y: step >= 3 && typingProgress > 0.8 ? 0 : -30 
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <RepoCard 
          title="Local Repo" 
          icon={<Laptop className="w-6 h-6" />} 
          variant="local" 
          x={SLOTS.bottomCenter.x} 
          y={SLOTS.bottomCenter.y} 
        />
      </motion.g>

      {/* Docked Terminal */}
      <TerminalDock 
        command="git clone https://github.com/YOU/repo.git" 
        typingProgress={typingProgress}
        isVisible={step === 3}
      />
    </Stage>
  );
}

function AnimateCursor({ step }: { step: number }) {
  let x = 200;
  let y = 150;
  let opacity = 0;
  let scale = 1;

  if (step === 0) {
    x = 200;
    y = 150;
    opacity = 1;
  } else if (step === 1) {
    x = SLOTS.topLeft.x + 40;
    y = SLOTS.topLeft.y + 25; // center of fork button
    opacity = 1;
    scale = [1, 0.9, 1] as any; // click ripple
  }

  return (
    <motion.g 
      animate={{ x, y, opacity, scale }}
      transition={{ type: "spring", stiffness: 60, damping: 15, delay: step === 1 ? 0 : 0 }}
    >
      <Cursor x={0} y={0} />
    </motion.g>
  );
}
