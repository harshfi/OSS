import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RepoCard, Cursor } from "../primitives";
import { Stage, SLOTS, Connector } from "../Layout";
import { Globe, GitFork, GitPullRequest, CheckSquare } from "lucide-react";

export function Module11PR({ step }: { step: number }) {
  const getCamera = () => {
    switch (step) {
      case 0: return { x: -30, y: 10, scale: 1.05 };
      case 1: return { x: 0, y: 10, scale: 1.1 };
      case 2: return { x: 0, y: 0, scale: 1.05 };
      default: return { x: 0, y: 0, scale: 1 };
    }
  };

  return (
    <Stage camera={getCamera()}>
      {/* Upstream Repo */}
      <RepoCard 
        title="Upstream" 
        icon={<Globe className="w-6 h-6" />} 
        variant="upstream" 
        x={SLOTS.topLeft.x} 
        y={SLOTS.topLeft.y} 
      />

      {/* Your Fork */}
      <RepoCard 
        title="Origin (Fork)" 
        icon={<GitFork className="w-6 h-6" />} 
        variant="fork" 
        x={SLOTS.topRight.x} 
        y={SLOTS.topRight.y} 
      />
      
      {/* Banner */}
      <AnimatePresence>
        {step === 0 && (
          <motion.foreignObject 
            x={SLOTS.topRight.x - 70} 
            y={SLOTS.topRight.y + 40} 
            width={160} height={40} 
            className="overflow-visible z-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="w-full text-[10px] p-2 rounded-md font-bold flex justify-between items-center shadow-sm backdrop-blur-sm border" style={{ backgroundColor: 'var(--scene-success-fill)', borderColor: 'var(--scene-success-stroke)', color: 'var(--scene-success-stroke)' }}>
              <span>Compare & pull request</span>
              <button className="px-2 py-0.5 rounded shadow" style={{ backgroundColor: 'var(--scene-success-stroke)', color: 'var(--scene-surface)' }}>Create</button>
            </div>
          </motion.foreignObject>
        )}
      </AnimatePresence>

      {/* Connection Line */}
      <Connector 
        from={{ x: SLOTS.topRight.x - 40, y: SLOTS.topRight.y }}
        to={{ x: SLOTS.topLeft.x + 40, y: SLOTS.topLeft.y }}
        color={step === 2 ? "var(--scene-success-stroke)" : "var(--scene-line-idle)"}
        animated={step === 2}
        packet={step === 2}
      />

      {/* PR Modal/Card */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.foreignObject
            className="overflow-visible z-30"
            initial={{ opacity: 0, scale: 0.8, x: SLOTS.topRight.x - 50, y: SLOTS.topRight.y + 20 }}
            animate={{ 
              opacity: 1, 
              scale: step === 2 ? 0.8 : 1,
              x: step === 2 ? SLOTS.topCenter.x - 100 : SLOTS.topCenter.x - 80,
              y: step === 2 ? SLOTS.topCenter.y : SLOTS.topCenter.y + 30
            }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            width={200} height={100}
          >
            <div className="bg-card border-border shadow-xl rounded-xl p-3 w-full h-full border relative" style={{ backgroundColor: 'var(--scene-surface)' }}>
              <div className="flex items-center gap-2 border-b border-border/50 pb-2 mb-2">
                <GitPullRequest className="w-4 h-4" style={{ color: 'var(--scene-success-stroke)' }} />
                <span className="text-xs font-bold" style={{ color: 'var(--scene-text)' }}>Fix broken link</span>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] flex items-center gap-1" style={{ color: 'var(--scene-text-muted)' }}>
                  <CheckSquare className="w-3 h-3 text-[var(--scene-local-stroke)]" /> Fixes #123
                </div>
                <div className="text-[10px] flex items-center gap-1" style={{ color: 'var(--scene-text-muted)' }}>
                  {step >= 1 ? <CheckSquare className="w-3 h-3 text-[var(--scene-local-stroke)]" /> : <div className="w-3 h-3 border rounded-sm" />} Tested changes
                </div>
              </div>
              {step === 2 && (
                <motion.div 
                  className="absolute -right-2 -top-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-md"
                  style={{ backgroundColor: 'var(--scene-success-stroke)', color: 'var(--scene-surface)' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  OPEN
                </motion.div>
              )}
            </div>
          </motion.foreignObject>
        )}
      </AnimatePresence>

      {/* Cursor */}
      <AnimateCursor step={step} />
    </Stage>
  );
}

function AnimateCursor({ step }: { step: number }) {
  const [pos, setPos] = useState({ x: 350, y: 150, opacity: 0 });

  useEffect(() => {
    if (step === 0) {
      setPos({ x: 180, y: 150, opacity: 1 });
      const t = setTimeout(() => {
        setPos({ x: SLOTS.topRight.x - 10, y: SLOTS.topRight.y + 40, opacity: 1 });
      }, 800);
      return () => clearTimeout(t);
    } else if (step === 1) {
      setPos({ x: SLOTS.topCenter.x - 20, y: SLOTS.topCenter.y + 70, opacity: 1 });
    } else {
      setPos({ x: 350, y: 150, opacity: 0 });
    }
  }, [step]);

  return (
    <motion.g 
      animate={pos}
      transition={{ type: "spring", stiffness: 50, damping: 15 }}
    >
      <Cursor x={0} y={0} />
    </motion.g>
  );
}
