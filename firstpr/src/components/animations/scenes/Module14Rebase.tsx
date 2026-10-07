import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CommitNode, Cursor } from "../primitives";
import { Stage, TerminalDock, Connector } from "../Layout";
import { GitBranch, GitMerge } from "lucide-react";

export function Module14Rebase({ step }: { step: number }) {
  const [typingProgress, setTypingProgress] = useState(0);

  useEffect(() => {
    if (step === 1 || step === 2) {
      setTypingProgress(0);
      const interval = setInterval(() => {
        setTypingProgress(p => Math.min(p + 0.05, 1));
      }, 50);
      return () => clearInterval(interval);
    } else {
      setTypingProgress(1);
    }
  }, [step]);

  // step 0: diverge
  // step 1: merge (diamond)
  // step 2: rebase (linearize)
  // step 3: history linear

  return (
    <Stage camera={{ x: 0, y: 0, scale: 1 }}>
      {/* Main branch line */}
      <Connector 
        from={{ x: 60, y: 150 }}
        to={{ x: 340, y: 150 }}
        color="var(--scene-upstream-stroke)"
      />

      <CommitNode hash="a1b2c" variant="upstream" x={100} y={150} />
      
      {/* Feature branch line (original) */}
      <AnimatePresence>
        {step < 2 && (
          <motion.g initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Connector 
              from={{ x: 100, y: 150 }}
              to={{ x: 180, y: 80 }}
              curve="horizontal"
              color="var(--scene-local-stroke)"
            />
            <CommitNode hash="feat-1" variant="local" x={180} y={80} />
          </motion.g>
        )}
      </AnimatePresence>

      <CommitNode hash="main-upd" variant="upstream" x={200} y={150} />

      {/* Merge Diamond */}
      <AnimatePresence>
        {step === 1 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Connector 
              from={{ x: 200, y: 150 }}
              to={{ x: 260, y: 80 }}
              curve="horizontal"
              color="var(--scene-upstream-stroke)"
            />
            <Connector 
              from={{ x: 180, y: 80 }}
              to={{ x: 260, y: 80 }}
              color="var(--scene-local-stroke)"
            />
            <CommitNode hash="merge" variant="local" x={260} y={80} />
            <foreignObject x={260} y={40} width={80} height={30} className="overflow-visible">
              <div className="flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded border shadow-sm" style={{ backgroundColor: 'var(--scene-surface)', color: 'var(--scene-text)', borderColor: 'var(--scene-border)' }}>
                <GitMerge className="w-3 h-3" /> Merge Commit
              </div>
            </foreignObject>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Rebased Branch */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Connector 
              from={{ x: 200, y: 150 }}
              to={{ x: 280, y: 80 }}
              curve="horizontal"
              color="var(--scene-local-stroke)"
              animated={step === 2}
            />
            <motion.g
              initial={{ x: -100, y: 0 }}
              animate={{ x: 0, y: 0 }}
              transition={{ type: "spring", delay: 0.5 }}
            >
              <CommitNode hash="feat-1'" variant="local" x={280} y={80} />
              
              <foreignObject x={280} y={40} width={100} height={30} className="overflow-visible">
                <div className="flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded border w-fit" style={{ backgroundColor: 'var(--scene-local-fill)', color: 'var(--scene-local-stroke)', borderColor: 'var(--scene-local-stroke)' }}>
                  <GitBranch className="w-3 h-3" /> Rebased (New Hash)
                </div>
              </foreignObject>
            </motion.g>
          </motion.g>
        )}
      </AnimatePresence>

      <TerminalDock 
        command={step === 1 ? "git merge main" : step >= 2 ? "git rebase main" : ""} 
        typingProgress={typingProgress}
        isVisible={step === 1 || step >= 2}
      />
    </Stage>
  );
}
