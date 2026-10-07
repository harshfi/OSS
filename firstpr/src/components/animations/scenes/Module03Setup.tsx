import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Stage, TerminalDock } from "../Layout";
import { Key, User, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export function Module03Setup({ step }: { step: number }) {
  const [typingProgress, setTypingProgress] = useState(0);

  useEffect(() => {
    if (step === 1) {
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
      <foreignObject x={80} y={40} width={240} height={180} className="overflow-visible">
        <div className="flex flex-col gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: step >= 0 ? 1 : 0, x: step >= 0 ? 0 : -20 }}
            className="flex items-center gap-3 border p-3 rounded-xl shadow-sm"
            style={{ backgroundColor: 'var(--scene-surface)', borderColor: 'var(--scene-border)' }}
          >
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--scene-upstream-fill)', color: 'var(--scene-upstream-stroke)' }}><User className="w-5 h-5" /></div>
            <div className="font-mono text-xs" style={{ color: 'var(--scene-text)' }}>Git Installed</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 0 : -20 }}
            className="flex items-center gap-3 border p-3 rounded-xl shadow-sm"
            style={{ backgroundColor: 'var(--scene-surface)', borderColor: step === 1 ? 'var(--scene-local-stroke)' : 'var(--scene-border)' }}
          >
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--scene-local-fill)', color: 'var(--scene-local-stroke)' }}><Mail className="w-5 h-5" /></div>
            <div className="font-mono text-xs" style={{ color: 'var(--scene-text)' }}>Name & Email Configured</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: step >= 2 ? 1 : 0, x: step >= 2 ? 0 : -20 }}
            className="flex items-center gap-3 border p-3 rounded-xl shadow-sm"
            style={{ backgroundColor: 'var(--scene-surface)', borderColor: 'var(--scene-border)' }}
          >
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--scene-success-fill)', color: 'var(--scene-success-stroke)' }}><Key className="w-5 h-5" /></div>
            <div className="font-mono text-xs" style={{ color: 'var(--scene-text)' }}>SSH Key Generated</div>
          </motion.div>
        </div>
      </foreignObject>

      <TerminalDock 
        command={'git config --global user.name "You"\ngit config --global user.email "you@ext.com"'} 
        typingProgress={typingProgress}
        isVisible={step === 1}
      />
    </Stage>
  );
}
