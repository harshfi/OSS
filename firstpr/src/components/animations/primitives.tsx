import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Terminal as TerminalIcon, MousePointer2, GitCommit, FileCode, CheckCircle2 } from "lucide-react";

export function Terminal({ command, typingProgress, className }: { command: string, typingProgress: number, className?: string }) {
  const visibleChars = Math.floor(typingProgress * command.length);
  const text = command.slice(0, visibleChars);
  const hasCursor = visibleChars < command.length;

  return (
    <div className={cn("rounded-lg bg-slate-950 text-emerald-400 font-mono text-[10px] sm:text-xs p-3 shadow-xl overflow-hidden border border-slate-800", className)}>
      <div className="flex items-center gap-2 mb-2 border-b border-slate-800 pb-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex-1 flex justify-center opacity-50">
          <TerminalIcon className="w-3 h-3 text-slate-400" />
        </div>
      </div>
      <div className="flex">
        <span className="text-pink-500 mr-2">❯</span>
        <span>{text}</span>
        {hasCursor && (
          <motion.span 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-1.5 h-3.5 bg-emerald-400 ml-0.5 inline-block" 
          />
        )}
      </div>
    </div>
  );
}

export function RepoCard({ title, icon, variant = "blue", className, x = 0, y = 0, width = 80, height = 80, ...props }: any) {
  const variantMap: any = {
    blue: "upstream",
    upstream: "upstream",
    purple: "fork",
    fork: "fork",
    green: "local",
    local: "local",
    amber: "staged",
    staged: "staged",
  };
  
  const semantic = variantMap[variant] || "upstream";

  return (
    <foreignObject x={x - width/2} y={y - height/2} width={width} height={height} className="overflow-visible pointer-events-none">
      <motion.div 
        className={cn("flex flex-col items-center gap-1.5 w-full h-full", className)}
        {...props}
      >
        <div 
          className="w-12 h-12 border-2 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm"
          style={{ 
            backgroundColor: `var(--scene-${semantic}-fill)`,
            borderColor: `var(--scene-${semantic}-stroke)`,
            color: `var(--scene-${semantic}-stroke)`,
            boxShadow: `0 4px 12px var(--scene-${semantic}-glow), 0 4px 6px -1px rgba(0, 0, 0, 0.1)`
          }}
        >
          {icon}
        </div>
        <span 
          className="text-[8px] font-bold uppercase tracking-widest text-center whitespace-nowrap"
          style={{ color: `var(--scene-${semantic}-stroke)` }}
        >
          {title}
        </span>
      </motion.div>
    </foreignObject>
  );
}

export function Cursor({ x, y, className }: { x: number, y: number, className?: string }) {
  return (
    <foreignObject x={x} y={y} width="20" height="20" className="overflow-visible pointer-events-none z-50">
      <div className={cn("text-foreground drop-shadow-md", className)}>
        <MousePointer2 className="w-5 h-5 fill-background stroke-[1.5]" />
      </div>
    </foreignObject>
  );
}

export function CommitNode({ hash, variant = "main", x = 0, y = 0, className, ...props }: any) {
  const variantMap: any = {
    main: "upstream",
    feature: "local",
    upstream: "upstream",
    local: "local",
    fork: "fork"
  };
  
  const semantic = variantMap[variant] || "upstream";

  return (
    <foreignObject x={x - 45} y={y - 15} width={90} height={30} className="overflow-visible pointer-events-none">
      <motion.div 
        className={cn("flex items-center justify-center gap-1.5 p-1 px-2 rounded-full border-2 shadow-sm backdrop-blur-sm z-10 w-fit", className)}
        style={{
          backgroundColor: `var(--scene-${semantic}-fill)`,
          borderColor: `var(--scene-${semantic}-stroke)`,
          color: `var(--scene-${semantic}-stroke)`,
          boxShadow: `0 0 10px var(--scene-${semantic}-glow)`
        }}
        {...props}
      >
        <div 
          className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 shadow-sm"
          style={{ backgroundColor: `var(--scene-${semantic}-stroke)`, color: 'var(--scene-surface)' }}
        >
          <GitCommit className="w-3 h-3" />
        </div>
        <span className="text-[9px] font-mono font-bold tracking-tight">{hash}</span>
      </motion.div>
    </foreignObject>
  );
}

export function FileChip({ name, state = "untracked", x = 0, y = 0, className, ...props }: any) {
  const semantic = state === "untracked" ? "text-muted" : state === "modified" ? "upstream" : state === "staged" ? "staged" : "success";
  
  return (
    <motion.div 
      className={cn("flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-mono shadow-sm", className)} 
      style={{
        backgroundColor: state === "untracked" ? 'var(--scene-bg)' : `var(--scene-${semantic}-fill)`,
        borderColor: state === "untracked" ? 'var(--scene-border)' : `var(--scene-${semantic}-stroke)`,
        color: state === "untracked" ? 'var(--scene-text-muted)' : `var(--scene-${semantic}-stroke)`,
      }}
      {...props}
    >
      <FileCode className="w-4 h-4" />
      {name}
      {state === "committed" && <CheckCircle2 className="w-3 h-3 ml-1" />}
    </motion.div>
  );
}
