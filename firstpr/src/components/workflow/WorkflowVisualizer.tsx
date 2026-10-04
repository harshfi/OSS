import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { workflowSteps } from "./WorkflowData";
import type { Node, GraphState, Commit } from "./WorkflowData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  GitFork, 
  Server, 
  Laptop, 
  GitCommit, 
  GitBranch, 
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface WorkflowVisualizerProps {
  compact?: boolean;
  stepIndex?: number;
  onStepChange?: (index: number) => void;
  className?: string;
  showControls?: boolean;
}

export function WorkflowVisualizer({
  compact = false,
  stepIndex: controlledStepIndex,
  onStepChange,
  className,
  showControls = true,
}: WorkflowVisualizerProps) {
  const [internalStepIndex, setInternalStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(compact);
  const [selectedCommit, setSelectedCommit] = useState<Commit | null>(null);

  const isControlled = controlledStepIndex !== undefined;
  const currentIndex = isControlled ? controlledStepIndex : internalStepIndex;

  const handleStepChange = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex >= workflowSteps.length) return;
    if (isControlled && onStepChange) {
      onStepChange(newIndex);
    } else {
      setInternalStepIndex(newIndex);
    }
  }, [isControlled, onStepChange]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % workflowSteps.length;
      handleStepChange(nextIndex);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex, handleStepChange]);

  const step = workflowSteps[currentIndex];

  return (
    <div
      className={cn(
        "flex flex-col space-y-6 w-full rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md p-5 sm:p-7 shadow-xl shadow-black/20 text-card-foreground transition-all duration-300",
        className
      )}
    >
      {/* Visual Canvas Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/40">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold font-mono uppercase tracking-wider text-muted-foreground">
                3-Tier Architecture Canvas
              </h3>
              <Badge variant="outline" className="text-[11px] font-mono border-emerald-500/30 text-emerald-400 bg-emerald-500/5">
                Live State
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground/80 hidden sm:block">
              Observe how code and reference pointers synchronize across remotes and local workstation
            </p>
          </div>
        </div>

        {compact && (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-8 px-2.5 text-xs font-mono gap-1.5"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isPlaying ? "Pause" : "Auto-Play"}</span>
            </Button>
            <div className="text-xs font-mono text-muted-foreground px-2 py-1 rounded bg-muted/40 border border-border/40">
              {currentIndex + 1}/{workflowSteps.length}
            </div>
          </div>
        )}
      </div>

      {/* Visual Nodes Canvas (Upstream - Origin - Local) */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-stretch py-2 min-h-[340px]">
        {/* Connection Edge: Upstream <-> Origin (Top or Left-Center) */}
        {step.edge && step.edge.from === "upstream" && step.edge.to === "origin" && (
          <EdgeBadge label={step.edge.label} direction="right" position="upstream-origin" />
        )}
        {step.edge && step.edge.from === "origin" && step.edge.to === "upstream" && (
          <EdgeBadge label={step.edge.label} direction="left" position="upstream-origin" />
        )}

        {/* Connection Edge: Origin <-> Local */}
        {step.edge && step.edge.from === "origin" && step.edge.to === "local" && (
          <EdgeBadge label={step.edge.label} direction="right" position="origin-local" />
        )}
        {step.edge && step.edge.from === "local" && step.edge.to === "origin" && (
          <EdgeBadge label={step.edge.label} direction="left" position="origin-local" />
        )}

        {/* Direct Upstream <-> Local Edge (e.g. Sync / Add Remote / Pull) */}
        {step.edge && ((step.edge.from === "local" && step.edge.to === "upstream") || (step.edge.from === "upstream" && step.edge.to === "local")) && (
          <DirectSyncEdge label={step.edge.label} direction={step.edge.from === "local" ? "up" : "down"} />
        )}

        {/* 1. UPSTREAM NODE */}
        <NodeCard
          type="upstream"
          title="Upstream"
          subtitle="Original Maintainer Repo"
          badgeText="Canonical Remote"
          badgeColor="border-blue-500/30 text-blue-400 bg-blue-500/10"
          icon={<Server className="w-4 h-4 text-blue-400" />}
          state={step.graph.upstream}
          isHighlighted={step.highlight.includes("upstream")}
          activeBranch="main"
          onSelectCommit={setSelectedCommit}
        />

        {/* 2. ORIGIN NODE */}
        <NodeCard
          type="origin"
          title="Origin"
          subtitle="Your Fork on GitHub"
          badgeText="Remote Fork (origin)"
          badgeColor="border-purple-500/30 text-purple-400 bg-purple-500/10"
          icon={<GitFork className="w-4 h-4 text-purple-400" />}
          state={step.graph.origin}
          isHighlighted={step.highlight.includes("origin")}
          activeBranch={step.graph.origin?.branches.find(b => b.name !== "main")?.name || "main"}
          onSelectCommit={setSelectedCommit}
        />

        {/* 3. LOCAL MACHINE NODE */}
        <NodeCard
          type="local"
          title="Local Workstation"
          subtitle="Your Computer (SSD)"
          badgeText="Local Repo & Worktree"
          badgeColor="border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
          icon={<Laptop className="w-4 h-4 text-emerald-400" />}
          state={step.graph.local}
          isHighlighted={step.highlight.includes("local")}
          activeBranch={step.localState?.activeBranch || "main"}
          localWorkingState={step.localState}
          onSelectCommit={setSelectedCommit}
        />
      </div>

      {/* Selected Commit Inspector Popover */}
      <AnimatePresence>
        {selectedCommit && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/60 text-xs font-mono"
          >
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 font-bold">
                Commit {selectedCommit.hash}
              </span>
              <span className="text-foreground font-sans font-medium">{selectedCommit.message}</span>
              <Badge variant="outline" className="text-[10px] font-mono">
                branch: {selectedCommit.branch}
              </Badge>
            </div>
            <button
              onClick={() => setSelectedCommit(null)}
              className="text-muted-foreground hover:text-foreground text-xs px-2 py-0.5"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact Mode Bottom Bar */}
      {compact && (
        <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-foreground">{step.stageBadge}:</span>
            <span className="text-muted-foreground">{step.title}</span>
          </div>
          <div className="font-mono text-[11px] text-muted-foreground">
            Active: {step.highlight.join(" ⇄ ")}
          </div>
        </div>
      )}

      {/* Non-compact Controls (if requested within visualizer) */}
      {!compact && showControls && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/60">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 h-9"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              <span className="text-xs">{isPlaying ? "Pause" : "Auto-advance"}</span>
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-9 w-9"
              disabled={currentIndex === 0}
              onClick={() => handleStepChange(currentIndex - 1)}
              aria-label="Previous step"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-9 w-9"
              disabled={currentIndex === workflowSteps.length - 1}
              onClick={() => handleStepChange(currentIndex + 1)}
              aria-label="Next step"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <span className="text-xs font-mono text-muted-foreground ml-2">
              Step {currentIndex + 1} of {workflowSteps.length}
            </span>
          </div>

          {/* Quick step jump indicators */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
            {workflowSteps.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => handleStepChange(idx)}
                className={cn(
                  "h-7 px-2.5 rounded-md text-xs font-mono transition-all flex items-center gap-1 border",
                  idx === currentIndex
                    ? "bg-emerald-500/15 border-emerald-500 text-emerald-400 font-bold shadow-sm shadow-emerald-500/20"
                    : idx < currentIndex
                    ? "bg-muted/40 border-border/60 text-muted-foreground hover:text-foreground"
                    : "bg-background/40 border-border/30 text-muted-foreground/60 hover:text-foreground"
                )}
                title={s.title}
              >
                <span>{s.id}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SUBCOMPONENTS
// ---------------------------------------------------------------------------

interface NodeCardProps {
  type: Node;
  title: string;
  subtitle: string;
  badgeText: string;
  badgeColor: string;
  icon: React.ReactNode;
  state: GraphState | null;
  isHighlighted: boolean;
  activeBranch?: string;
  localWorkingState?: {
    workingDirectory: "Clean" | "Modified" | "Untracked";
    stagingArea: "Empty" | "Staged Snapshots";
    activeBranch: string;
    headCommit: string;
  };
  onSelectCommit: (commit: Commit) => void;
}

function NodeCard({
  type,
  title,
  subtitle,
  badgeText,
  badgeColor,
  icon,
  state,
  isHighlighted,
  activeBranch,
  localWorkingState,
  onSelectCommit,
}: NodeCardProps) {
  if (!state) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-xl p-6 border-2 border-dashed border-border/40 bg-muted/10 opacity-40 transition-all min-h-[300px]"
        )}
      >
        <div className="h-10 w-10 rounded-full bg-muted/40 flex items-center justify-center mb-3 text-muted-foreground">
          {icon}
        </div>
        <h4 className="font-mono font-bold text-sm text-foreground/80">{title}</h4>
        <span className="text-xs text-muted-foreground text-center mt-1">{subtitle}</span>
        <div className="mt-5 px-3 py-1 rounded-full bg-muted/60 text-[11px] font-mono text-muted-foreground border border-border/30">
          Uninitialized on local machine
        </div>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className={cn(
        "relative flex flex-col justify-between rounded-xl p-5 border-2 transition-all duration-300 min-h-[300px]",
        isHighlighted
          ? "border-emerald-500/80 bg-gradient-to-b from-emerald-500/10 via-card to-card shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30"
          : "border-border/60 bg-card/80 hover:border-border"
      )}
    >
      {/* Active Pulse Pill */}
      {isHighlighted && (
        <div className="absolute -top-3 right-4 px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-mono font-bold uppercase tracking-wider shadow-md shadow-emerald-500/30 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-black animate-ping" />
          Active Target
        </div>
      )}

      {/* Node Header */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-muted/60 border border-border flex items-center justify-center shrink-0">
              {icon}
            </div>
            <div>
              <h4 className="font-mono font-bold text-sm text-foreground leading-tight">{title}</h4>
              <p className="text-[11px] text-muted-foreground">{subtitle}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          <Badge variant="outline" className={cn("text-[10px] font-mono py-0", badgeColor)}>
            {badgeText}
          </Badge>
          {activeBranch && (
            <Badge variant="outline" className="text-[10px] font-mono py-0 border-border text-foreground/80 bg-muted/40 flex items-center gap-1">
              <GitBranch className="w-2.5 h-2.5 text-primary" />
              {activeBranch}
            </Badge>
          )}
        </div>
      </div>

      {/* Node Body: Commit Graph Representation */}
      <div className="my-5 flex flex-col gap-2.5">
        <div className="text-[11px] font-mono text-muted-foreground flex items-center justify-between">
          <span>Commit Snapshots</span>
          <span>{state.commits.length} commits</span>
        </div>

        <div className="flex flex-col gap-2">
          <AnimatePresence mode="popLayout">
            {state.commits.map((c) => {
              const isMainBranch = c.branch === "main";
              const isFeatureCommit = c.branch.startsWith("feat") || c.branch === "feature-branch";
              return (
                <motion.button
                  key={`${type}-${c.id}`}
                  layoutId={`${type}-${c.id}`}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={() => onSelectCommit(c)}
                  className={cn(
                    "w-full text-left p-2 rounded-lg border text-xs font-mono flex items-center justify-between transition-colors group cursor-pointer",
                    isFeatureCommit
                      ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20"
                      : isMainBranch
                      ? "bg-blue-500/10 border-blue-500/30 text-blue-300 hover:bg-blue-500/20"
                      : "bg-muted/40 border-border/60 text-muted-foreground hover:bg-muted"
                  )}
                >
                  <div className="flex items-center gap-2 truncate">
                    <GitCommit className={cn("w-3.5 h-3.5 shrink-0", isFeatureCommit ? "text-emerald-400" : "text-blue-400")} />
                    <span className="font-bold text-[11px]">{c.hash}</span>
                    <span className="truncate text-foreground/80 font-sans text-[11px]">{c.message}</span>
                  </div>
                  <span className="text-[10px] opacity-70 group-hover:opacity-100 shrink-0 ml-1">
                    {c.branch}
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Remotes indicator for local machine */}
        {state.remotes && state.remotes.length > 0 && (
          <div className="mt-2 pt-2 border-t border-border/40 flex flex-wrap gap-1">
            <span className="text-[10px] font-mono text-muted-foreground w-full">Configured Remotes:</span>
            {state.remotes.map((r) => (
              <span key={r.name} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-muted/80 text-foreground/80 border border-border/50">
                {r.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Node Footer: Local Machine Status Inspector */}
      {localWorkingState && type === "local" ? (
        <div className="pt-3 border-t border-border/40 grid grid-cols-2 gap-2 text-[11px] font-mono">
          <div className="p-1.5 rounded bg-muted/30 border border-border/30">
            <span className="text-muted-foreground block text-[9px] uppercase">Worktree</span>
            <span className={cn("font-semibold", localWorkingState.workingDirectory === "Modified" ? "text-amber-400" : "text-emerald-400")}>
              {localWorkingState.workingDirectory}
            </span>
          </div>
          <div className="p-1.5 rounded bg-muted/30 border border-border/30">
            <span className="text-muted-foreground block text-[9px] uppercase">Staging Area</span>
            <span className={cn("font-semibold", localWorkingState.stagingArea === "Staged Snapshots" ? "text-emerald-400" : "text-muted-foreground")}>
              {localWorkingState.stagingArea}
            </span>
          </div>
        </div>
      ) : (
        <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <span>Synced with Git Cloud</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Online
          </span>
        </div>
      )}
    </motion.div>
  );
}

// Visual Edge Action Badges
function EdgeBadge({ label, direction, position }: { label: string; direction: "left" | "right"; position: "upstream-origin" | "origin-local" }) {
  const isLeftHalf = position === "upstream-origin";
  return (
    <div
      className={cn(
        "hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none items-center justify-center",
        isLeftHalf ? "left-[30%] -translate-x-1/2" : "left-[69%] -translate-x-1/2"
      )}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500 text-black shadow-lg shadow-emerald-500/30 text-xs font-mono font-bold"
      >
        {direction === "left" && <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />}
        <span>{label}</span>
        {direction === "right" && <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />}
      </motion.div>
    </div>
  );
}

function DirectSyncEdge({ label, direction }: { label: string; direction: "up" | "down" }) {
  return (
    <div className="hidden md:flex absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none items-center justify-center">
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/30 text-xs font-mono font-bold"
      >
        <Info className="w-3 h-3" />
        <span>{label}</span>
        <span className="text-[10px] opacity-80">({direction === "up" ? "Direct Config" : "Fast-forward"})</span>
      </motion.div>
    </div>
  );
}
