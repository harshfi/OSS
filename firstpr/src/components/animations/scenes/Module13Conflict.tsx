import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CommitNode, FileChip, Cursor } from "../primitives";
import { Stage, TerminalDock, Connector } from "../Layout";
import { GitBranch, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Module13Conflict({ step }: { step: number }) {
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

  return (
    <Stage camera={{ x: 0, y: 0, scale: 1 }}>
      {/* Main Branch Line */}
      <Connector 
        from={{ x: 100, y: 140 }}
        to={{ x: 300, y: 140 }}
        color="var(--scene-upstream-stroke)"
      />
      
      {/* Feature Branch Line */}
      <Connector 
        from={{ x: 100, y: 140 }}
        to={{ x: 250, y: 60 }}
        curve="horizontal"
        color="var(--scene-local-stroke)"
      />
      
      {/* Merge Line (Attempted) */}
      <Connector 
        from={{ x: 250, y: 60 }}
        to={{ x: 300, y: 140 }}
        curve="horizontal"
        color="var(--scene-conflict-stroke)"
        animated={step >= 0 && step < 3}
        arrow={false}
      />
      
      {/* Merge Line (Resolved) */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
             <Connector 
              from={{ x: 250, y: 60 }}
              to={{ x: 300, y: 140 }}
              curve="horizontal"
              color="var(--scene-upstream-stroke)"
              animated={true}
            />
          </motion.g>
        )}
      </AnimatePresence>

      <CommitNode hash="base" variant="upstream" x={100} y={140} className="opacity-50" />
      <CommitNode hash="main-upd" variant="upstream" x={200} y={140} />
      <CommitNode hash="feat-upd" variant="local" x={250} y={60} />
      
      {step >= 3 && (
        <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
          <CommitNode hash="merge" variant="upstream" x={300} y={140} />
        </motion.g>
      )}

      {/* Conflict File visual */}
      <foreignObject x={80} y={200} width={240} height={80} className="overflow-visible">
        <div className="p-3 rounded-lg border-2 shadow-lg backdrop-blur-sm transition-colors duration-500" 
          style={{ 
            backgroundColor: step < 2 ? 'var(--scene-conflict-fill)' : 'var(--scene-success-fill)', 
            borderColor: step < 2 ? 'var(--scene-conflict-stroke)' : 'var(--scene-success-stroke)' 
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            {step < 2 ? (
              <AlertTriangle className="w-4 h-4" style={{ color: 'var(--scene-conflict-stroke)' }} />
            ) : (
              <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--scene-success-fill)' }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--scene-success-stroke)' }} />
              </div>
            )}
            <span className="text-xs font-mono font-bold" style={{ color: 'var(--scene-text)' }}>index.ts</span>
          </div>
          
          <div className="space-y-1 font-mono text-[9px]">
            {step < 2 ? (
              <>
                <div className="font-bold" style={{ color: 'var(--scene-conflict-stroke)' }}>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</div>
                <div style={{ color: 'var(--scene-upstream-stroke)' }}>const color = 'blue';</div>
                <div className="font-bold" style={{ color: 'var(--scene-conflict-stroke)' }}>=======</div>
                <div style={{ color: 'var(--scene-local-stroke)' }}>const color = 'red';</div>
                <div className="font-bold" style={{ color: 'var(--scene-conflict-stroke)' }}>&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature</div>
              </>
            ) : (
              <div className="font-bold" style={{ color: 'var(--scene-success-stroke)' }}>const color = 'purple';</div>
            )}
          </div>
        </div>
      </foreignObject>

      {/* Editor Cursor */}
      <AnimatePresence>
        {step === 2 && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.g
              animate={{ 
                x: [0, 80, 0],
                y: [0, 30, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Cursor x={160} y={230} className="text-[var(--scene-local-stroke)]" />
            </motion.g>
          </motion.g>
        )}
      </AnimatePresence>

      <TerminalDock 
        command={step === 3 ? "git commit -m 'Resolve merge conflict'" : "git merge feature\nCONFLICT (content): Merge conflict in index.ts\nAutomatic merge failed; fix conflicts and then commit the result."} 
        typingProgress={step === 3 ? typingProgress : 1}
        isVisible={step === 1 || step === 3}
      />
    </Stage>
  );
}
