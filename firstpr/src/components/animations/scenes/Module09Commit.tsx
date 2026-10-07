import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Stage, TerminalDock } from "../Layout";
import { XCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Module09Commit({ step }: { step: number }) {
  const [typingProgress, setTypingProgress] = useState(0);

  useEffect(() => {
    if (step === 2) {
      setTypingProgress(0);
      const interval = setInterval(() => {
        setTypingProgress(p => Math.min(p + 0.05, 1));
      }, 50);
      return () => clearInterval(interval);
    } else {
      setTypingProgress(1);
    }
  }, [step]);

  return (
    <Stage camera={{ x: 0, y: 0, scale: 1 }}>
      <foreignObject x={40} y={40} width={320} height={200} className="overflow-visible">
        <div className="flex flex-col gap-4">
          
          <AnimatePresence mode="popLayout">
            {step === 0 && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-4 rounded-xl shadow-lg relative overflow-hidden border-2"
                style={{ backgroundColor: 'hsl(var(--destructive) / 0.1)', borderColor: 'hsl(var(--destructive))', color: 'hsl(var(--destructive))' }}
              >
                <div className="absolute top-2 right-2 opacity-20">
                  <XCircle className="w-16 h-16" />
                </div>
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Bad Commit
                </h3>
                <div className="font-mono text-xs p-2 rounded border shadow-inner" style={{ backgroundColor: 'var(--scene-surface)', borderColor: 'var(--scene-border)', color: 'var(--scene-text)' }}>
                  fixed stuff
                </div>
                <p className="text-[10px] mt-2 opacity-80">What was fixed? Why was it broken?</p>
              </motion.div>
            )}

            {step >= 1 && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 rounded-xl shadow-lg relative overflow-hidden border-2"
                style={{ backgroundColor: 'var(--scene-success-fill)', borderColor: 'var(--scene-success-stroke)', color: 'var(--scene-success-stroke)' }}
              >
                <div className="absolute top-2 right-2 opacity-20">
                  <CheckCircle2 className="w-16 h-16" />
                </div>
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Good Commit
                </h3>
                
                {step === 1 ? (
                  <div className="font-mono text-xs p-2 rounded border shadow-inner" style={{ backgroundColor: 'var(--scene-surface)', borderColor: 'var(--scene-border)', color: 'var(--scene-text)' }}>
                    Correct alignment in the header to fix mobile overflow
                  </div>
                ) : (
                  <div className="font-mono text-xs p-2 rounded border shadow-inner flex" style={{ backgroundColor: 'var(--scene-surface)', borderColor: 'var(--scene-border)' }}>
                    <span style={{ color: 'var(--scene-local-stroke)', fontWeight: 'bold' }}>fix</span>
                    <span style={{ color: 'var(--scene-upstream-stroke)' }}>(ui)</span>
                    <span style={{ color: 'var(--scene-text)' }}>: correct alignment in header</span>
                  </div>
                )}
                
                <p className="text-[10px] mt-2 opacity-80">
                  {step === 1 ? "Explains exactly what changed." : "Conventional format adds machine-readable structure."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </foreignObject>

      <TerminalDock 
        command="git commit -m 'fix(ui): correct alignment in header'"
        typingProgress={typingProgress}
        isVisible={step === 2}
      />
    </Stage>
  );
}
