import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileChip, CommitNode } from "../primitives";
import { Stage, TerminalDock, SLOTS } from "../Layout";

export function Module08Commit({ step }: { step: number }) {
  const [typingProgress, setTypingProgress] = useState(0);

  useEffect(() => {
    if (step === 1 || step === 2) {
      setTypingProgress(0);
      const interval = setInterval(() => {
        setTypingProgress(p => Math.min(p + 0.05, 1));
      }, 50);
      return () => clearInterval(interval);
    } else {
      setTypingProgress(step > 2 ? 1 : 0);
    }
  }, [step]);

  const command = step === 1 ? "git add ." : step === 2 ? "git commit -m 'Fix'" : "";

  return (
    <Stage camera={{ x: 0, y: 0, scale: 1 }}>
      {/* Areas */}
      <foreignObject x="10" y="50" width="120" height="150" className="overflow-visible">
        <div className="w-full h-full border-2 border-dashed rounded-xl relative" style={{ backgroundColor: 'var(--scene-bg)', borderColor: 'var(--scene-border)' }}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 text-[10px] font-bold uppercase tracking-widest" style={{ backgroundColor: 'var(--scene-surface)', color: 'var(--scene-text-muted)' }}>
            Working Dir
          </div>
        </div>
      </foreignObject>

      <foreignObject x="140" y="50" width="120" height="150" className="overflow-visible">
        <div className="w-full h-full border-2 border-dashed rounded-xl relative" style={{ backgroundColor: 'var(--scene-staged-fill)', borderColor: 'var(--scene-staged-stroke)' }}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap" style={{ backgroundColor: 'var(--scene-surface)', color: 'var(--scene-staged-stroke)' }}>
            Staging Area
          </div>
        </div>
      </foreignObject>

      <foreignObject x="270" y="50" width="120" height="150" className="overflow-visible">
        <div className="w-full h-full border-2 border-dashed rounded-xl relative" style={{ backgroundColor: 'var(--scene-local-fill)', borderColor: 'var(--scene-local-stroke)' }}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap" style={{ backgroundColor: 'var(--scene-surface)', color: 'var(--scene-local-stroke)' }}>
            Local Repo
          </div>
        </div>
      </foreignObject>

      {/* File Chip */}
      <AnimatePresence>
        {step < 3 && (
          <motion.foreignObject
            className="overflow-visible z-20"
            initial={false}
            animate={{
              x: step >= 1 ? 160 : 30,
              y: 110,
              scale: step === 2 && typingProgress > 0.8 ? 0 : 1,
              opacity: step === 2 && typingProgress > 0.8 ? 0 : 1,
            }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            width={80} height={30}
          >
            <FileChip name="index.html" state={step >= 1 ? "staged" : "modified"} className="w-fit" />
          </motion.foreignObject>
        )}
      </AnimatePresence>

      {/* Commit Node */}
      <motion.g
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: step >= 2 && typingProgress > 0.8 ? 1 : 0,
          scale: step >= 2 && typingProgress > 0.8 ? 1 : 0.5
        }}
        transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.2 }}
      >
        <CommitNode hash="c4d5e6f" variant="local" x={330} y={125} />
      </motion.g>

      <TerminalDock 
        command={command} 
        typingProgress={typingProgress}
        isVisible={step === 1 || step === 2}
      />
    </Stage>
  );
}
