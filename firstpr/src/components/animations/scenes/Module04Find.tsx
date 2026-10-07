import React from "react";
import { motion } from "motion/react";
import { Stage } from "../Layout";
import { Search, Tag, MessageCircle } from "lucide-react";

export function Module04Find({ step }: { step: number }) {
  return (
    <Stage camera={{ x: 0, y: 0, scale: 1 }}>
      <foreignObject x={40} y={40} width={320} height={200} className="overflow-visible">
        <div className="flex flex-col gap-4 items-center w-full h-full">
          {/* Search bar */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full border-2 rounded-full p-2 flex items-center gap-2 shadow-sm"
            style={{ backgroundColor: 'var(--scene-surface)', borderColor: 'var(--scene-border)' }}
          >
            <Search className="w-4 h-4 ml-2" style={{ color: 'var(--scene-text-muted)' }} />
            <span className="text-xs font-mono" style={{ color: 'var(--scene-text-muted)' }}>is:issue is:open label:"good first issue"</span>
          </motion.div>

          {/* Issue card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: step >= 1 ? 1 : 0, scale: step >= 1 ? 1 : 0.9 }}
            className="w-full border-2 rounded-xl p-4 shadow-lg text-left relative"
            style={{ backgroundColor: 'var(--scene-surface)', borderColor: 'var(--scene-border)' }}
          >
            <div className="flex justify-between items-start">
              <span className="font-bold text-sm" style={{ color: 'var(--scene-text)' }}>Fix broken link in README</span>
              <div className="border px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1" style={{ backgroundColor: 'var(--scene-success-fill)', color: 'var(--scene-success-stroke)', borderColor: 'var(--scene-success-stroke)' }}>
                <Tag className="w-3 h-3" /> good first issue
              </div>
            </div>
            <p className="text-xs mt-2 line-clamp-2" style={{ color: 'var(--scene-text-muted)' }}>The link to the documentation in the main README is currently returning a 404. It should be updated to point to the new /docs path.</p>
            
            {/* Comment */}
            {step >= 2 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 pt-3 border-t flex items-start gap-2"
                style={{ borderColor: 'var(--scene-border)' }}
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--scene-local-stroke)' }}>
                  <UserIcon />
                </div>
                <div className="p-2 rounded-lg rounded-tl-none text-[10px] flex-1" style={{ backgroundColor: 'var(--scene-bg)', color: 'var(--scene-text-muted)' }}>
                  Hi! I'd like to work on this. I've found the correct link and will open a PR shortly.
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </foreignObject>
    </Stage>
  );
}

function UserIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3" style={{ color: 'var(--scene-surface)' }}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
}
