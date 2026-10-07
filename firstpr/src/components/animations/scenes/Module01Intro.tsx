import React from "react";
import { Stage } from "../Layout";
import { Globe, Users, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Module01Intro({ step }: { step: number }) {
  const icons = [
    { icon: <Globe className="w-12 h-12" style={{ color: 'var(--scene-upstream-stroke)' }} />, label: "Global Impact", active: step >= 0 },
    { icon: <Users className="w-12 h-12" style={{ color: 'var(--scene-local-stroke)' }} />, label: "Community", active: step >= 1 },
    { icon: <Trophy className="w-12 h-12" style={{ color: 'var(--scene-success-stroke)' }} />, label: "Skills", active: step >= 2 }
  ];

  return (
    <Stage camera={{ x: 0, y: 0, scale: 1 }}>
      <foreignObject x={40} y={60} width={320} height={180} className="overflow-visible">
        <div className="flex justify-between items-center w-full h-full px-4">
          <AnimatePresence>
            {icons.map((item, i) => (
              item.active && (
               <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", delay: 0.1 * i }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-20 h-20 rounded-2xl border-2 shadow-xl flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: 'var(--scene-surface)', borderColor: 'var(--scene-border)' }}>
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 opacity-10"
                      style={{ background: 'radial-gradient(circle at 50% 50%, var(--scene-text) 0%, transparent 60%)' }}
                    />
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold font-mono" style={{ color: 'var(--scene-text-muted)' }}>{item.label}</span>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </foreignObject>
    </Stage>
  );
}
