import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CommitNode } from "../primitives";
import { Stage, TerminalDock, Connector } from "../Layout";
import { GitBranch, Lock } from "lucide-react";

export function Module07Branch({ step }: { step: number }) {
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
      case 0: return { x: 30, y: 10, scale: 1.1 };
      case 1: return { x: -30, y: -20, scale: 1.05 };
      case 2: return { x: 0, y: 20, scale: 1.1 };
      default: return { x: 0, y: 0, scale: 1 };
    }
  };

  return (
    <Stage camera={getCamera()}>
      {/* Main Branch Line */}
      <Connector 
        from={{ x: 60, y: 140 }}
        to={{ x: 340, y: 140 }}
        color="var(--scene-upstream-stroke)"
      />
      
      {/* Main Commits */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <CommitNode hash="a1b2c3d" variant="main" x={120} y={140} className="opacity-50" />
        <CommitNode hash="b2c3d4e" variant="main" x={200} y={140} />
      </motion.g>

      {/* Main Branch Label */}
      <foreignObject x={280} y={125} width={80} height={30} className="overflow-visible">
        <div 
          className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border"
          style={{ backgroundColor: 'var(--scene-upstream-fill)', borderColor: 'var(--scene-upstream-stroke)', color: 'var(--scene-upstream-stroke)' }}
        >
          <GitBranch className="w-3 h-3" /> main
          {step >= 1 && <Lock className="w-3 h-3 ml-1" style={{ color: 'var(--scene-conflict-stroke)' }} />}
        </div>
      </foreignObject>

      {/* Feature Branch */}
      <AnimatePresence>
        {step >= 1 && typingProgress > 0.8 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Feature Branch Curve */}
            <Connector 
              from={{ x: 200, y: 140 }}
              to={{ x: 280, y: 80 }}
              curve="horizontal"
              color="var(--scene-local-stroke)"
              animated={true}
              packet={true}
            />

            {/* Feature Branch Label */}
            <foreignObject x={260} y={65} width={120} height={30} className="overflow-visible">
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", delay: 0.5 }}
                className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border w-fit"
                style={{ backgroundColor: 'var(--scene-local-fill)', borderColor: 'var(--scene-local-stroke)', color: 'var(--scene-local-stroke)' }}
              >
                <GitBranch className="w-3 h-3" /> fix-broken-link
              </motion.div>
            </foreignObject>
          </motion.g>
        )}
      </AnimatePresence>

      {/* HEAD Pointer */}
      <motion.foreignObject
        animate={{
          x: step >= 2 ? 275 - 20 : 200 - 20,
          y: step >= 2 ? 40 : 100
        }}
        transition={{ type: "spring", stiffness: 70, damping: 15 }}
        width={40} height={20} className="overflow-visible z-20"
      >
        <div className="text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded shadow-lg text-center relative" style={{ backgroundColor: 'var(--scene-text)', color: 'var(--scene-bg)' }}>
          HEAD
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45" style={{ backgroundColor: 'var(--scene-text)' }} />
        </div>
      </motion.foreignObject>

      <TerminalDock 
        command="git checkout -b fix-broken-link" 
        typingProgress={typingProgress}
        isVisible={step === 1}
      />
    </Stage>
  );
}
