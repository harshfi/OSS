import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RepoCard, Cursor } from "../primitives";
import { Stage, TerminalDock, SLOTS, Connector } from "../Layout";
import { GitPullRequest, User, FileDiff, MessageCircle, CheckCircle2, CircleDot, Laptop, GitCommit } from "lucide-react";
import { cn } from "@/lib/utils";

export function Module12Review({ step }: { step: number }) {
  const [typingProgress, setTypingProgress] = useState(0);

  useEffect(() => {
    if (step === 2) {
      setTypingProgress(0);
      const interval = setInterval(() => {
        setTypingProgress(p => Math.min(p + 0.05, 1));
      }, 50);
      return () => clearInterval(interval);
    } else {
      setTypingProgress(step > 2 ? 1 : 0);
    }
  }, [step]);

  const getCamera = () => {
    switch (step) {
      case 0: return { x: 0, y: 30, scale: 1.1 };
      case 1: return { x: 40, y: 10, scale: 1.2 };
      case 2: return { x: -30, y: -20, scale: 1.05 };
      case 3: return { x: 40, y: 10, scale: 1.2 };
      case 4: return { x: 0, y: 20, scale: 1.1 };
      default: return { x: 0, y: 0, scale: 1 };
    }
  };

  // PR Status state
  let prStatus = "Open";
  let prColor = { bg: "var(--scene-success-fill)", text: "var(--scene-success-stroke)" };
  let prIcon = <GitPullRequest className="w-3 h-3" />;
  
  if (step === 1 || step === 2) {
    prStatus = "Changes requested";
    prColor = { bg: "var(--scene-staged-fill)", text: "var(--scene-staged-stroke)" };
  } else if (step === 3) {
    prStatus = "Approved";
    prColor = { bg: "var(--scene-success-fill)", text: "var(--scene-success-stroke)" };
    prIcon = <CheckCircle2 className="w-3 h-3" />;
  } else if (step === 4) {
    prStatus = "Merged";
    prColor = { bg: "var(--scene-fork-fill)", text: "var(--scene-fork-stroke)" };
  }

  return (
    <Stage camera={getCamera()}>
      {/* PR Card (Top Center) */}
      <foreignObject x={100} y={40} width={200} height={100} className="overflow-visible">
        <motion.div 
          className="backdrop-blur-md border shadow-xl rounded-xl p-3 flex flex-col gap-2"
          style={{ backgroundColor: 'var(--scene-surface)', borderColor: 'var(--scene-border)' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold" style={{ color: 'var(--scene-text)' }}>fix-broken-link <span style={{ color: 'var(--scene-text-muted)', fontWeight: 'normal' }}>into</span> main</span>
            <motion.div 
              className="px-1.5 py-0.5 rounded text-[8px] font-bold flex items-center gap-1 border"
              animate={{ backgroundColor: prColor.bg, color: prColor.text, borderColor: prColor.text }}
            >
              {prIcon} {prStatus}
            </motion.div>
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex-1 rounded-lg h-12 border relative overflow-hidden flex items-center justify-center" style={{ backgroundColor: 'var(--scene-bg)', borderColor: 'var(--scene-border)' }}>
              <FileDiff className="w-4 h-4 opacity-50" style={{ color: 'var(--scene-text-muted)' }} />
              
              {/* Comment bubbles */}
              <AnimatePresence>
                {(step === 1 || step === 2) && (
                  <>
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                      className="absolute left-2 top-2" style={{ color: 'var(--scene-staged-stroke)' }}
                    >
                      <MessageCircle className="w-3 h-3 fill-current opacity-20" />
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ delay: 0.2 }}
                      className="absolute right-4 bottom-2" style={{ color: 'var(--scene-staged-stroke)' }}
                    >
                      <MessageCircle className="w-3 h-3 fill-current opacity-20" />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Resolved checks */}
              <AnimatePresence>
                {(step >= 3) && (
                  <>
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                      className="absolute left-2 top-2" style={{ color: 'var(--scene-success-stroke)' }}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ delay: 0.1 }}
                      className="absolute right-4 bottom-2" style={{ color: 'var(--scene-success-stroke)' }}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

            </div>

            {/* Reviewer Avatar */}
            <motion.div 
              className="w-8 h-8 rounded-full border flex items-center justify-center shadow-lg"
              style={{ backgroundColor: 'var(--scene-upstream-fill)', borderColor: 'var(--scene-upstream-stroke)', color: 'var(--scene-upstream-stroke)' }}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
            >
              <User className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.div>
      </foreignObject>

      {/* Local Laptop (Bottom Left) */}
      <motion.g 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 20 }}
      >
        <RepoCard title="Local Repo" icon={<Laptop className="w-6 h-6" />} variant="local" x={SLOTS.topLeft.x} y={SLOTS.bottomCenter.y} />
      </motion.g>

      {/* Connection from Laptop to PR */}
      <Connector 
        from={{ x: SLOTS.topLeft.x, y: SLOTS.bottomCenter.y - 40 }} 
        to={{ x: 150, y: 140 }} 
        animated={step === 2 && typingProgress < 1}
        color={step >= 2 ? "var(--scene-local-stroke)" : "var(--scene-line-idle)"} 
      />

      {/* Flying commit packet */}
      <AnimatePresence>
        {step === 2 && typingProgress > 0.8 && (
          <motion.g
            initial={{ offsetDistance: "0%" } as any}
            animate={{ offsetDistance: "100%" } as any}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ offsetPath: `path("M ${SLOTS.topLeft.x} ${SLOTS.bottomCenter.y - 40} C ${SLOTS.topLeft.x} 140, 150 160, 150 140")` } as any}
          >
            <circle r="4" style={{ fill: 'var(--scene-local-stroke)' }} />
            <circle r="8" style={{ fill: 'var(--scene-local-stroke)' }} opacity="0.3" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Merge animation (Step 4) */}
      <AnimatePresence>
        {step === 4 && (
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1], opacity: 1 }}
            style={{ translateX: 200, translateY: 150, color: 'var(--scene-fork-stroke)' }}
          >
            <GitCommit className="w-12 h-12 -translate-x-6 -translate-y-6" />
            
            {/* Confetti particles */}
            {[...Array(6)].map((_, i) => (
              <motion.circle
                key={i}
                r="2"
                style={{ fill: ["var(--scene-fork-stroke)", "var(--scene-upstream-stroke)", "var(--scene-success-stroke)"][i % 3] }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{ 
                  x: Math.cos(i * 60 * Math.PI / 180) * 40, 
                  y: Math.sin(i * 60 * Math.PI / 180) * 40,
                  opacity: 0 
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            ))}
          </motion.g>
        )}
      </AnimatePresence>

      <TerminalDock 
        command="git add . && git commit -m 'Fix' && git push origin" 
        typingProgress={typingProgress}
        isVisible={step === 2}
      />
    </Stage>
  );
}
