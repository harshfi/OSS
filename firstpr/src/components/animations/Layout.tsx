import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Terminal as TerminalIcon } from "lucide-react";

export const SLOTS = {
  topLeft: { x: 80, y: 70 },
  topRight: { x: 320, y: 70 },
  topCenter: { x: 200, y: 70 },
  bottomCenter: { x: 200, y: 180 },
  center: { x: 200, y: 125 },
  terminal: { x: 12, y: 228, width: 376, height: 60 }
};

interface StageProps {
  children: React.ReactNode;
  camera?: { x?: number; y?: number; scale?: number };
  className?: string;
}

export function Stage({ children, camera, className }: StageProps) {
  const isDebug = new URLSearchParams(window.location.search).get("debug") === "layout";

  return (
    <div className={cn("relative w-full aspect-[4/3] overflow-hidden rounded-2xl border shadow-inner", className)} style={{ backgroundColor: 'var(--scene-bg)', borderColor: 'var(--scene-border)' }}>
      <motion.div 
        className="w-full h-full origin-center"
        animate={{ 
          scale: camera?.scale || 1, 
          x: camera?.x || 0, 
          y: camera?.y || 0 
        }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      >
        <svg viewBox="0 0 400 300" className="w-full h-full" style={{ overflow: 'visible', color: 'var(--scene-text)' }}>
          {children}
          {isDebug && <DebugOverlay />}
        </svg>
      </motion.div>
    </div>
  );
}

function DebugOverlay() {
  return (
    <g className="pointer-events-none opacity-50" fill="none" stroke="red" strokeWidth="1" strokeDasharray="2 2">
      {/* Top Left Slot */}
      <rect x={SLOTS.topLeft.x - 40} y={SLOTS.topLeft.y - 40} width="80" height="80" />
      <text x={SLOTS.topLeft.x} y={SLOTS.topLeft.y + 55} fontSize="8" fill="red" textAnchor="middle">TOP-LEFT</text>
      
      {/* Top Right Slot */}
      <rect x={SLOTS.topRight.x - 40} y={SLOTS.topRight.y - 40} width="80" height="80" />
      <text x={SLOTS.topRight.x} y={SLOTS.topRight.y + 55} fontSize="8" fill="red" textAnchor="middle">TOP-RIGHT</text>
      
      {/* Bottom Center Slot */}
      <rect x={SLOTS.bottomCenter.x - 40} y={SLOTS.bottomCenter.y - 40} width="80" height="80" />
      <text x={SLOTS.bottomCenter.x} y={SLOTS.bottomCenter.y + 55} fontSize="8" fill="red" textAnchor="middle">BOTTOM-CENTER</text>

      {/* Terminal Dock */}
      <rect x={SLOTS.terminal.x} y={SLOTS.terminal.y} width={SLOTS.terminal.width} height={SLOTS.terminal.height} stroke="blue" />
      <text x={200} y={SLOTS.terminal.y + 30} fontSize="8" fill="blue" textAnchor="middle">TERMINAL DOCK</text>
    </g>
  );
}

export function TerminalDock({ command, typingProgress, isVisible }: { command: string, typingProgress: number, isVisible: boolean }) {
  const visibleChars = Math.floor(typingProgress * command.length);
  
  // Syntax coloring logic
  const renderColoredText = () => {
    if (!command) return null;
    const parts = command.split(" ");
    return parts.map((part, i) => {
      let colorClass = "text-[#f8fafc]";
      if (i === 0 && part === "git") colorClass = "text-[#34d399]"; // emerald-400
      else if (i === 1) colorClass = "text-[#6ee7b7]"; // emerald-300
      else if (part.startsWith("-")) colorClass = "text-[#fbbf24]"; // amber-400
      else if (part.startsWith("http")) colorClass = "text-[#60a5fa]"; // blue-400
      
      const charStart = parts.slice(0, i).join(" ").length + (i > 0 ? 1 : 0);
      const charEnd = charStart + part.length;
      
      if (visibleChars <= charStart) return null;
      
      const visiblePart = part.slice(0, Math.max(0, visibleChars - charStart));
      
      return (
        <span key={i} className={colorClass}>
          {i > 0 ? " " : ""}{visiblePart}
        </span>
      );
    });
  };

  const hasCursor = visibleChars < command.length;
  const isDone = visibleChars >= command.length && command.length > 0;

  return (
    <foreignObject x={SLOTS.terminal.x} y={SLOTS.terminal.y} width={SLOTS.terminal.width} height={SLOTS.terminal.height}>
      <motion.div 
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: isVisible ? 0 : 80, opacity: isVisible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className="w-full h-full rounded-xl flex flex-col font-mono text-[10px] shadow-lg"
        style={{ backgroundColor: '#020617', borderColor: 'var(--scene-border)', borderWidth: 1 }}
      >
        <div className="flex items-center gap-1.5 px-3 py-1.5 border-b" style={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}>
          <div className="w-2 h-2 rounded-full bg-rose-500" />
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <div className="flex-1 text-center opacity-50"><TerminalIcon className="w-2.5 h-2.5 inline text-slate-400" /></div>
        </div>
        <div className="flex-1 p-2 px-3 flex flex-col justify-center" style={{ color: '#cbd5e1' }}>
          <div className="flex items-center">
            <span className="text-pink-500 mr-2">❯</span>
            <div className="whitespace-pre flex-wrap leading-tight">
              {renderColoredText()}
              {hasCursor && isVisible && (
                <motion.span 
                  animate={{ opacity: [1, 0, 1] }} 
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-1.5 h-3 bg-emerald-400 ml-0.5 inline-block align-middle" 
                />
              )}
            </div>
          </div>
          {isDone && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.2 }}
              className="mt-1 text-[8px]"
              style={{ color: '#64748b' }}
            >
              Output: Success.
            </motion.div>
          )}
        </div>
      </motion.div>
    </foreignObject>
  );
}

export function Connector({
  from,
  to,
  curve = "vertical",
  color = "var(--scene-upstream-stroke)",
  animated = false,
  label,
  arrow = false,
  packet = false,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  curve?: "vertical" | "horizontal" | "straight";
  color?: string;
  animated?: boolean;
  label?: string;
  arrow?: boolean;
  packet?: boolean;
}) {
  let pathData = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  if (curve === "vertical") {
    pathData = `M ${from.x} ${from.y} C ${from.x} ${(from.y + to.y) / 2}, ${to.x} ${(from.y + to.y) / 2}, ${to.x} ${to.y}`;
  } else if (curve === "horizontal") {
    pathData = `M ${from.x} ${from.y} C ${(from.x + to.x) / 2} ${from.y}, ${(from.x + to.x) / 2} ${to.y}, ${to.x} ${to.y}`;
  }

  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  
  // Extract base color name if possible (e.g., var(--scene-upstream-stroke) -> upstream)
  const isSemantic = color.includes('--scene-') && color.includes('-stroke');
  const baseName = isSemantic ? color.split('--scene-')[1].split('-stroke')[0] : '';
  const glowColor = isSemantic ? `var(--scene-${baseName}-glow)` : 'transparent';
  const fillColor = isSemantic ? `var(--scene-${baseName}-fill)` : color;

  return (
    <g className="connector-group">
      <path
        d={pathData}
        fill="none"
        stroke={animated ? color : "var(--scene-line-idle)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={animated ? "6 8" : "3 6"}
        className={animated ? "opacity-100" : "opacity-60"}
      />
      
      {/* Glow layer for active path */}
      {animated && glowColor !== 'transparent' && (
        <path
          d={pathData}
          fill="none"
          stroke={glowColor}
          strokeWidth="6"
          strokeLinecap="round"
          className="opacity-50 blur-sm"
        />
      )}

      {animated && !packet && (
        <motion.path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="12 12"
          animate={{ strokeDashoffset: [24, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      )}
      
      {arrow && (
        <path
          d="M -4 -4 L 0 0 L -4 4"
          fill="none"
          stroke={animated ? color : "var(--scene-line-idle)"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform={`translate(${to.x}, ${to.y})`}
        />
      )}
      
      {packet && animated && (
        <motion.g
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{ offsetPath: `path('${pathData}')`, offsetRotate: "auto" } as any}
        >
          {/* Packet trail/glow */}
          <ellipse cx="-4" cy="0" rx="8" ry="3" fill={glowColor} className="blur-sm" />
          {/* Packet dot */}
          <circle cx="0" cy="0" r="3.5" fill={color} />
        </motion.g>
      )}

      {label && (
        <foreignObject
          x={midX - 40}
          y={midY - 10}
          width={80}
          height={20}
          className="overflow-visible pointer-events-none"
        >
          <div className="w-full h-full flex items-center justify-center">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-[var(--scene-border)] shadow-sm bg-[var(--scene-surface)]"
              style={{ color }}
            >
              {label}
            </span>
          </div>
        </foreignObject>
      )}
    </g>
  );
}
