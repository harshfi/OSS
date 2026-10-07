import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Stage } from "../Layout";
import { GitPullRequest, MessageSquare, CheckCircle2, ThumbsUp } from "lucide-react";

export function Module15Etiquette({ step }: { step: number }) {
  return (
    <Stage camera={{ x: 0, y: 0, scale: 1 }}>
      <foreignObject x={40} y={40} width={320} height={220} className="overflow-visible">
        <div className="rounded-xl border-2 shadow-xl p-4 flex flex-col h-full relative overflow-hidden" style={{ backgroundColor: 'var(--scene-surface)', borderColor: 'var(--scene-border)' }}>
          {/* PR Header */}
          <div className="flex items-start gap-3 border-b pb-3" style={{ borderColor: 'var(--scene-border)' }}>
            <div className="mt-1 p-1.5 rounded-md" style={{ backgroundColor: 'var(--scene-success-fill)', color: 'var(--scene-success-stroke)' }}>
              <GitPullRequest className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm" style={{ color: 'var(--scene-text)' }}>Add installation guide</h3>
                <span className="text-xs font-mono" style={{ color: 'var(--scene-text-muted)' }}>#42</span>
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--scene-text-muted)' }}>
                opened just now by <span className="font-medium" style={{ color: 'var(--scene-text)' }}>you</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="py-3 flex-1">
            <AnimatePresence mode="popLayout">
              {step >= 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <div className="flex gap-2 items-center">
                    <div className="h-2 w-32 rounded" style={{ backgroundColor: 'var(--scene-line-idle)' }} />
                    <div className="h-2 w-16 rounded" style={{ backgroundColor: 'var(--scene-line-idle)' }} />
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="h-2 w-24 rounded" style={{ backgroundColor: 'var(--scene-line-idle)' }} />
                    <div className="h-2 w-40 rounded" style={{ backgroundColor: 'var(--scene-line-idle)' }} />
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="h-2 w-48 rounded" style={{ backgroundColor: 'var(--scene-line-idle)' }} />
                  </div>
                </motion.div>
              )}
              
              {/* Keep PR small badge */}
              {step >= 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 flex items-center gap-3 text-[10px] font-mono border rounded p-1.5 w-fit"
                  style={{ backgroundColor: 'var(--scene-bg)', borderColor: 'var(--scene-border)' }}
                >
                  <span className="font-bold" style={{ color: 'var(--scene-success-stroke)' }}>+15 lines</span>
                  <span className="font-bold" style={{ color: 'var(--scene-conflict-stroke)' }}>-2 lines</span>
                  <span style={{ color: 'var(--scene-text-muted)' }}>1 file changed</span>
                  <div className="ml-2 px-1.5 py-0.5 rounded flex items-center gap-1" style={{ backgroundColor: 'var(--scene-upstream-fill)', color: 'var(--scene-upstream-stroke)' }}>
                    <ThumbsUp className="w-3 h-3" /> Small PR
                  </div>
                </motion.div>
              )}

              {/* Feedback */}
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 space-y-2 border-l-2 pl-3"
                  style={{ borderColor: 'var(--scene-border)' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--scene-upstream-stroke)', color: 'var(--scene-surface)' }}>
                      <MessageSquare className="w-2 h-2" />
                    </div>
                    <span className="text-[10px] font-bold" style={{ color: 'var(--scene-text)' }}>Maintainer:</span>
                    <span className="text-[10px]" style={{ color: 'var(--scene-text-muted)' }}>Could you add a link to the docs?</span>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-2 ml-2"
                  >
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--scene-local-stroke)', color: 'var(--scene-surface)' }}>
                      <span className="text-[8px] font-bold">You</span>
                    </div>
                    <span className="text-[10px] border px-2 py-0.5 rounded" style={{ color: 'var(--scene-text-muted)', backgroundColor: 'var(--scene-bg)', borderColor: 'var(--scene-border)' }}>
                      Done! Thanks for catching that.
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Merged Overlay */}
          <AnimatePresence>
            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 backdrop-blur-sm flex items-center justify-center z-10"
                style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl shadow-2xl border-4"
                  style={{ backgroundColor: 'var(--scene-surface)', borderColor: 'var(--scene-fork-stroke)' }}
                >
                  <div className="p-3 rounded-full" style={{ backgroundColor: 'var(--scene-fork-stroke)', color: 'var(--scene-surface)' }}>
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="text-xl font-black uppercase tracking-widest" style={{ color: 'var(--scene-fork-stroke)' }}>Merged!</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </foreignObject>
    </Stage>
  );
}
