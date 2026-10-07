import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { RepoCard, CommitNode } from "../primitives";
import { Stage, TerminalDock, SLOTS, Connector } from "../Layout";
import { GitFork, Laptop, ArrowUp } from "lucide-react";

export function Module10Push({ step }: { step: number }) {
  const [typingProgress, setTypingProgress] = useState(0);

  useEffect(() => {
    if (step === 1) {
      setTypingProgress(0);
      const interval = setInterval(() => {
        setTypingProgress(p => Math.min(p + 0.05, 1));
      }, 50);
      return () => clearInterval(interval);
    } else {
      setTypingProgress(step > 1 ? 1 : 0);
    }
  }, [step]);

  const getCamera = () => {
    switch (step) {
      case 0: return { x: 0, y: 30, scale: 1.1 };
      case 1: return { x: -30, y: 10, scale: 1.05 };
      case 2: return { x: 0, y: 0, scale: 1.1 };
      default: return { x: 0, y: 0, scale: 1 };
    }
  };

  return (
    <Stage camera={getCamera()}>
      {/* Connection Line */}
      <Connector 
        from={{ x: SLOTS.bottomCenter.x, y: SLOTS.bottomCenter.y - 40 }}
        to={{ x: SLOTS.topCenter.x, y: SLOTS.topCenter.y + 40 }}
        color="var(--scene-fork-stroke)"
        animated={step >= 1 && typingProgress > 0.8}
        packet={step === 1 && typingProgress > 0.8}
      />

      {/* Your Fork (Origin) */}
      <motion.g 
        animate={{ y: step >= 2 ? 0 : 20 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <RepoCard 
          title="Origin (Fork)" 
          icon={<GitFork className="w-6 h-6" />} 
          variant="fork" 
          x={SLOTS.topCenter.x} 
          y={SLOTS.topCenter.y} 
        />
        
        {/* Pushed Commit */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: step >= 2 ? 1 : 0, 
            scale: step >= 2 ? 1 : 0.5,
            x: SLOTS.topCenter.x + 80,
            y: SLOTS.topCenter.y
          }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <CommitNode hash="c4d5e6f" variant="local" x={0} y={0} />
        </motion.g>
      </motion.g>

      {/* Local Laptop */}
      <RepoCard 
        title="Local Repo" 
        icon={<Laptop className="w-6 h-6" />} 
        variant="local" 
        x={SLOTS.bottomCenter.x} 
        y={SLOTS.bottomCenter.y} 
      />
      
      {/* Ahead Badge */}
      <foreignObject x={SLOTS.bottomCenter.x + 30} y={SLOTS.bottomCenter.y - 30} width={40} height={20} className="overflow-visible z-20">
        <motion.div 
          className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 w-fit"
          style={{ backgroundColor: 'var(--scene-local-fill)', color: 'var(--scene-local-stroke)', border: '1px solid var(--scene-local-stroke)' }}
          animate={{ opacity: step >= 2 ? 0 : 1, scale: step >= 2 ? 0 : 1 }}
        >
          <ArrowUp className="w-2 h-2" /> 1
        </motion.div>
      </foreignObject>

      {/* Terminal */}
      <TerminalDock 
        command="git push origin main" 
        typingProgress={typingProgress}
        isVisible={step === 1}
      />
    </Stage>
  );
}
