import React from "react";
import { motion } from "motion/react";
import { Stage, Connector } from "../Layout";
import { RepoCard } from "../primitives";
import { User, Globe } from "lucide-react";

export function Module02Terms({ step }: { step: number }) {
  return (
    <Stage camera={{ x: 0, y: 0, scale: 1 }}>
      {/* Upstream */}
      {step >= 0 && (
        <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <RepoCard 
            title="UPSTREAM" 
            variant="upstream" 
            icon={<Globe className="w-6 h-6" style={{ color: 'var(--scene-upstream-stroke)' }} />} 
            x={160} y={20} 
          />
        </motion.g>
      )}

      {/* Origin (Fork) */}
      {step >= 1 && (
        <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Connector 
            from={{ x: 240, y: 65 }} 
            to={{ x: 280, y: 120 }} 
            curve="horizontal"
            color="var(--scene-fork-stroke)" 
            animated={step === 1}
          />
          <RepoCard 
            title="ORIGIN (FORK)" 
            variant="fork" 
            icon={<User className="w-6 h-6" style={{ color: 'var(--scene-fork-stroke)' }} />} 
            x={280} y={120} 
          />
        </motion.g>
      )}

      {/* Local */}
      {step >= 3 && (
        <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Connector 
            from={{ x: 320, y: 210 }} 
            to={{ x: 240, y: 240 }} 
            curve="horizontal"
            color="var(--scene-local-stroke)" 
            animated={step === 3}
          />
          <RepoCard 
            title="LOCAL REPO" 
            variant="local" 
            x={160} y={240} 
          />
        </motion.g>
      )}
    </Stage>
  );
}
