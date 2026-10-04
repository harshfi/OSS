import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { workflowSteps } from "./WorkflowData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  GitFork, 
  Laptop, 
  Sparkles,
  CheckCircle2,
  FolderGit2,
  FileCode2,
  PackageCheck,
  ShieldCheck,
  PartyPopper,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  ArrowUp,
  ArrowLeftRight,
  Link2
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface WorkflowVisualizerProps {
  compact?: boolean;
  stepIndex?: number;
  onStepChange?: (index: number) => void;
  className?: string;
  showControls?: boolean;
}

const stepActionDetails: Record<number, { action: string; direction: string }> = {
  1: { action: "Forking: Creating a safe copy in your GitHub account", direction: "Original ➔ Your Fork" },
  2: { action: "Cloning: Downloading files to your computer", direction: "Your Fork ➔ Laptop" },
  3: { action: "Connecting: Linking laptop to original repository", direction: "Laptop ➔ Original (read-only)" },
  4: { action: "Branching: Creating an isolated draft branch", direction: "Local on Laptop" },
  5: { action: "Coding: Editing files in your code editor", direction: "Local on Laptop" },
  6: { action: "Committing: Packaging changes into an atomic snapshot", direction: "Local on Laptop" },
  7: { action: "Pushing: Uploading saved snapshot to your fork", direction: "Laptop ➔ Your Fork" },
  8: { action: "Pull Request: Proposing changes to the project maintainers", direction: "Your Fork ➔ Original" },
  9: { action: "Merged: Maintainers approved and incorporated your code!", direction: "Original ➔ Laptop" },
};

export function WorkflowVisualizer({
  compact = false,
  stepIndex: controlledStepIndex,
  onStepChange,
  className,
  showControls = true,
}: WorkflowVisualizerProps) {
  const [internalStepIndex, setInternalStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(compact);

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
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex, handleStepChange]);

  const step = workflowSteps[currentIndex];
  const actionInfo = stepActionDetails[step.id] || { action: step.title, direction: "Active" };

  return (
    <div
      className={cn(
        "flex flex-col space-y-4 w-full rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md p-4 sm:p-6 shadow-lg text-card-foreground transition-all duration-300",
        className
      )}
    >
      {/* Friendly Visual Canvas Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-foreground">
                The 3 Safe Places in Open Source
              </h3>
              <Badge variant="outline" className="text-[11px] font-mono border-emerald-500/30 text-emerald-400 bg-emerald-500/5">
                {step.stageBadge} of 9
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Watch how your code moves with directional arrows between the original project, your personal copy, and your computer.
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
              <span>{isPlaying ? "Pause" : "Play"}</span>
            </Button>
            <div className="text-xs font-mono text-muted-foreground px-2 py-1 rounded bg-muted/40 border border-border/40">
              {currentIndex + 1}/9
            </div>
          </div>
        )}
      </div>

      {/* Prominent Non-Overlapping Action Flow Banner */}
      <div className="flex items-center justify-center py-1">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500 text-black shadow-md shadow-emerald-500/20 text-xs font-semibold"
        >
          <span className="h-2 w-2 rounded-full bg-black animate-ping shrink-0" />
          <span>{actionInfo.action}</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] bg-black/15 px-2 py-0.5 rounded-full font-mono font-medium">
            {actionInfo.direction}
          </span>
        </motion.div>
      </div>

      {/* Visual Journey: 3 Welcoming Places with Directional Connectors */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 lg:gap-3 py-1">
        {/* 1. ORIGINAL PROJECT CARD */}
        <div className="flex-1 min-w-0 flex flex-col">
          <PlaceCard
            title="1. Original Project"
            subtitle="Maintainer's GitHub"
            badge="Protected • Look Only"
            badgeColor="border-blue-500/30 text-blue-500 dark:text-blue-400 bg-blue-500/10"
            icon={<FolderGit2 className="w-5 h-5 text-blue-500 dark:text-blue-400" />}
            isTarget={step.highlight.includes("upstream")}
            description="The official public codebase. You have read-only access here, so you cannot accidentally break or delete anything."
          >
            <div className="mt-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20 text-xs space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[11px] text-blue-500 dark:text-blue-300 font-semibold">
                <span>original-owner/project</span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-500 dark:text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" /> Safe
                </span>
              </div>
              <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span>Official <code className="text-blue-500 dark:text-blue-300">main</code> branch</span>
              </div>
              {step.id === 1 && (
                <div className="pt-1.5 border-t border-blue-500/20 text-emerald-600 dark:text-emerald-300 text-[11px] flex items-center gap-1 font-semibold">
                  <ArrowRight className="w-3 h-3 text-emerald-500 dark:text-emerald-400 animate-pulse" />
                  <span>Copying code ➔ Your Cloud Fork</span>
                </div>
              )}
              {step.id === 8 && (
                <div className="pt-1.5 border-t border-purple-500/20 text-purple-600 dark:text-purple-300 text-[11px] flex items-center gap-1 font-semibold">
                  <ArrowLeft className="w-3 h-3 text-purple-400 animate-pulse" />
                  <span>Receiving PR from Your Fork</span>
                </div>
              )}
              {step.id === 9 && (
                <div className="pt-1.5 border-t border-blue-500/20 text-emerald-600 dark:text-emerald-300 text-[11px] flex items-center gap-1 font-semibold">
                  <PartyPopper className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  <span>Your PR is merged here!</span>
                </div>
              )}
            </div>
          </PlaceCard>
        </div>

        {/* CONNECTOR 1: Original <-> Fork */}
        <DesktopConnector type="upstream-origin" stepId={step.id} />
        <MobileConnector type="upstream-origin" stepId={step.id} />

        {/* 2. YOUR FORK CARD */}
        <div className="flex-1 min-w-0 flex flex-col">
          <PlaceCard
            title="2. Your Cloud Copy"
            subtitle="Your Personal Fork on GitHub"
            badge="Your Playground • Full Control"
            badgeColor="border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10"
            icon={<GitFork className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
            isTarget={step.highlight.includes("origin")}
            description="Your personal clone in the cloud. You have 100% write access here to test anything without affecting the original project."
          >
            <div className="mt-3 p-3 rounded-lg bg-purple-500/5 border border-purple-500/20 text-xs space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[11px] text-purple-600 dark:text-purple-300 font-semibold">
                <span>your-username/project</span>
                <span className="text-[10px] text-purple-500 dark:text-purple-400">Your Fork</span>
              </div>
              <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                {step.id >= 7 && step.id <= 8 ? (
                  <span className="text-purple-600 dark:text-purple-300 font-semibold">
                    Branch: <code className="text-emerald-600 dark:text-emerald-300">feat/fix-nav-contrast</code>
                  </span>
                ) : (
                  <span>Branch: <code className="text-purple-600 dark:text-purple-300">main</code> (cloud backup)</span>
                )}
              </div>
              {step.id === 1 && (
                <div className="pt-1.5 border-t border-purple-500/20 text-emerald-600 dark:text-emerald-300 text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                  <span>Fork created safely from upstream</span>
                </div>
              )}
              {step.id === 2 && (
                <div className="pt-1.5 border-t border-purple-500/20 text-emerald-600 dark:text-emerald-300 text-[11px] flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-emerald-500 dark:text-emerald-400 animate-pulse" />
                  <span>Ready to clone ➔ Your Laptop</span>
                </div>
              )}
              {step.id === 7 && (
                <div className="pt-1.5 border-t border-purple-500/20 text-emerald-600 dark:text-emerald-300 text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                  <span>Commits received from laptop push</span>
                </div>
              )}
              {step.id === 8 && (
                <div className="pt-1.5 border-t border-purple-500/20 text-purple-600 dark:text-purple-300 text-[11px] flex items-center gap-1 font-semibold">
                  <ArrowLeft className="w-3 h-3 text-purple-400 animate-pulse" />
                  <span>Opening PR ➔ Original Project</span>
                </div>
              )}
            </div>
          </PlaceCard>
        </div>

        {/* CONNECTOR 2: Fork <-> Laptop */}
        <DesktopConnector type="origin-local" stepId={step.id} />
        <MobileConnector type="origin-local" stepId={step.id} />

        {/* 3. YOUR LAPTOP CARD */}
        <div className="flex-1 min-w-0 flex flex-col">
          <PlaceCard
            title="3. Your Laptop"
            subtitle="Your Local Workspace (SSD)"
            badge="Private • Offline & Safe"
            badgeColor="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
            icon={<Laptop className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
            isTarget={step.highlight.includes("local")}
            description="Where you open files in your editor, write code, run tests, and save atomic snapshots before uploading."
          >
            <div className="mt-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[11px] text-emerald-600 dark:text-emerald-300 font-semibold">
                <span>~/projects/project</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Local</span>
              </div>

              {/* Current Stage Status on Laptop */}
              <div className="text-[11px] text-muted-foreground">
                {step.id < 2 ? (
                  <span className="text-muted-foreground italic">Waiting to clone...</span>
                ) : step.id === 2 ? (
                  <span className="text-emerald-600 dark:text-emerald-300 font-medium flex items-center gap-1">
                    <ArrowRight className="w-3 h-3 text-emerald-400" />
                    <span>📥 Files freshly downloaded</span>
                  </span>
                ) : step.id === 3 ? (
                  <span className="text-blue-500 dark:text-blue-300 font-medium flex items-center gap-1">
                    <Link2 className="w-3 h-3 text-blue-400" />
                    <span>🔗 Connected to original project</span>
                  </span>
                ) : step.id === 4 ? (
                  <span className="text-emerald-600 dark:text-emerald-300 font-medium">🌿 Active branch: <code className="text-emerald-600 dark:text-emerald-400 font-bold">feat/fix-nav-contrast</code></span>
                ) : step.id === 5 ? (
                  <span className="text-amber-600 dark:text-amber-300 font-medium flex items-center gap-1">
                    <FileCode2 className="w-3 h-3" /> 2 files edited (in progress)
                  </span>
                ) : step.id === 6 ? (
                  <span className="text-emerald-600 dark:text-emerald-300 font-medium flex items-center gap-1">
                    <PackageCheck className="w-3.5 h-3.5" /> 📦 Snapshot created: "fix(nav): ..."
                  </span>
                ) : step.id === 7 ? (
                  <span className="text-emerald-600 dark:text-emerald-300 font-medium flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3 text-emerald-400 animate-pulse" />
                    <span>🚀 Pushing commits ➔ Your Fork</span>
                  </span>
                ) : step.id === 8 ? (
                  <span className="text-emerald-600 dark:text-emerald-300 font-medium">🚀 Uploaded to GitHub</span>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-300 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>✨ Clean main branch synced</span>
                  </span>
                )}
              </div>
            </div>
          </PlaceCard>
        </div>
      </div>

      {/* Dedicated Direct Upstream Link Bridge for Step 3 and Step 9 */}
      {step.id === 3 && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl border border-blue-500/40 bg-blue-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
        >
          <div className="flex items-center gap-2.5 text-blue-300 font-medium">
            <div className="h-7 w-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Link2 className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            </div>
            <span>
              <strong className="text-foreground">Direct Upstream Connection: </strong>
              <code>git remote add upstream</code> creates a direct read-only bridge from <strong className="text-emerald-400">Your Laptop</strong> ➔ <strong className="text-blue-400">Original Project</strong>.
            </span>
          </div>
          <div className="font-mono text-[11px] bg-blue-500/20 border border-blue-500/30 text-blue-200 px-3 py-1 rounded-full flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
            <span>Laptop</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>Original (Read-only fetch)</span>
          </div>
        </motion.div>
      )}

      {step.id === 9 && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
        >
          <div className="flex items-center gap-2.5 text-emerald-300 font-medium">
            <div className="h-7 w-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <PartyPopper className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
            </div>
            <span>
              <strong className="text-foreground">Direct Upstream Sync: </strong>
              <code>git pull upstream main</code> downloads the approved merged code directly from <strong className="text-blue-400">Original Project</strong> ➔ <strong className="text-emerald-400">Your Laptop</strong>!
            </span>
          </div>
          <div className="font-mono text-[11px] bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
            <span>Original</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Laptop (Merged & Synced!)</span>
          </div>
        </motion.div>
      )}

      {/* Reassuring Beginner Safety Banner */}
      <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            <strong className="text-foreground">Why you can't break anything: </strong>
            {step.safetyGuarantee}
          </span>
        </div>
        <div className="font-mono text-[11px] text-muted-foreground shrink-0 sm:text-right">
          📍 Code status: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{step.whereIsMyCode.split("(")[0]}</span>
        </div>
      </div>

      {/* Non-compact Controls */}
      {!compact && showControls && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-border/60">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 h-9"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              <span className="text-xs">{isPlaying ? "Pause Tour" : "Auto-advance Tour"}</span>
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
              Step {currentIndex + 1} of 9
            </span>
          </div>

          {/* Quick Step Indicators */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
            {workflowSteps.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => handleStepChange(idx)}
                className={cn(
                  "h-7 px-2.5 rounded-md text-xs font-mono transition-all flex items-center gap-1 border",
                  idx === currentIndex
                    ? "bg-emerald-500 text-black border-emerald-400 font-bold shadow-sm shadow-emerald-500/20"
                    : idx < currentIndex
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20"
                    : "bg-background/40 border-border/40 text-muted-foreground hover:text-foreground"
                )}
                title={s.beginnerTitle}
              >
                <span>{s.id}</span>
                <span className="hidden xl:inline text-[11px] truncate max-w-[80px]">{s.beginnerTitle.split(" ")[0]}</span>
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

interface ConnectorProps {
  type: "upstream-origin" | "origin-local";
  stepId: number;
}

function getConnectorState(type: "upstream-origin" | "origin-local", stepId: number) {
  if (type === "upstream-origin") {
    if (stepId === 1) {
      return {
        isActive: true,
        direction: "forward" as const, // Original -> Fork
        label: "Fork",
        sublabel: "Cloud copy",
        color: "emerald" as const,
      };
    }
    if (stepId === 8) {
      return {
        isActive: true,
        direction: "backward" as const, // Fork -> Original
        label: "PR",
        sublabel: "Propose fix",
        color: "purple" as const,
      };
    }
    return {
      isActive: false,
      direction: "none" as const,
      label: stepId === 9 ? "Merged" : "Cloud link",
      sublabel: "",
      color: "muted" as const,
    };
  } else {
    // origin-local
    if (stepId === 2) {
      return {
        isActive: true,
        direction: "forward" as const, // Fork -> Laptop
        label: "Clone",
        sublabel: "Download files",
        color: "emerald" as const,
      };
    }
    if (stepId === 7) {
      return {
        isActive: true,
        direction: "backward" as const, // Laptop -> Fork
        label: "Push",
        sublabel: "Upload branch",
        color: "emerald" as const,
      };
    }
    return {
      isActive: false,
      direction: "none" as const,
      label: stepId < 2 ? "Waiting" : "Local link",
      sublabel: "",
      color: "muted" as const,
    };
  }
}

function DesktopConnector({ type, stepId }: ConnectorProps) {
  const state = getConnectorState(type, stepId);

  return (
    <div className="hidden md:flex flex-col items-center justify-center shrink-0 w-12 lg:w-16 self-center px-0.5 select-none">
      {/* Action Badge */}
      <div className="mb-1.5 h-6 flex items-center justify-center">
        {state.isActive ? (
          <motion.div
            key={`${type}-${stepId}-badge`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn(
              "px-2 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-tight flex items-center gap-1 shadow-sm whitespace-nowrap",
              state.color === "purple"
                ? "bg-purple-500 text-white shadow-purple-500/30 ring-1 ring-purple-400/40"
                : "bg-emerald-500 text-black shadow-emerald-500/30 ring-1 ring-emerald-400/40"
            )}
          >
            {state.direction === "backward" && <ArrowLeft className="w-2.5 h-2.5 stroke-[2.5]" />}
            <span>{state.label}</span>
            {state.direction === "forward" && <ArrowRight className="w-2.5 h-2.5 stroke-[2.5]" />}
          </motion.div>
        ) : (
          <span className="text-[10px] font-mono text-muted-foreground/50">
            {state.label === "Merged" ? "✓ Merged" : "⇄"}
          </span>
        )}
      </div>

      {/* Track & Arrow */}
      <div className="relative w-full flex items-center justify-center h-6">
        {/* Base Track Line */}
        <div
          className={cn(
            "w-full h-0.5 rounded-full transition-colors duration-300",
            state.isActive
              ? state.color === "purple"
                ? "bg-purple-500/40"
                : "bg-emerald-500/40"
              : "border-t border-dashed border-border/80"
          )}
        />

        {/* Active Animated Traveling Particle Beam */}
        {state.isActive && (
          <motion.div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full shadow-md pointer-events-none",
              state.color === "purple"
                ? "bg-purple-300 shadow-purple-400"
                : "bg-emerald-300 shadow-emerald-400"
            )}
            animate={{
              left: state.direction === "forward" ? ["10%", "85%"] : ["85%", "10%"],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.25, 0.8],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Directional Arrowheads */}
        {state.isActive ? (
          state.direction === "forward" ? (
            <div className="absolute right-0 flex items-center text-emerald-400">
              <ArrowRight className="w-4 h-4 stroke-[2.5] animate-pulse" />
            </div>
          ) : (
            <div className="absolute left-0 flex items-center text-purple-400">
              <ArrowLeft className="w-4 h-4 stroke-[2.5] animate-pulse" />
            </div>
          )
        ) : (
          <div className="absolute flex items-center justify-center text-muted-foreground/30 text-[10px]">
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      {/* Subtext description on active */}
      <div className="h-4 flex items-center justify-center mt-1">
        {state.isActive ? (
          <span className="text-[9px] font-mono text-muted-foreground/90 whitespace-nowrap text-center">
            {state.sublabel}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function MobileConnector({ type, stepId }: ConnectorProps) {
  const state = getConnectorState(type, stepId);

  return (
    <div className="flex md:hidden flex-col items-center justify-center py-2 my-1 w-full select-none">
      {state.isActive ? (
        <motion.div
          key={`${type}-${stepId}-mobile`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "flex items-center justify-between w-full max-w-xs px-3.5 py-1.5 rounded-full text-xs font-bold font-mono shadow-sm",
            state.color === "purple"
              ? "bg-purple-500/15 border border-purple-500/40 text-purple-300 shadow-purple-500/10"
              : "bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 shadow-emerald-500/10"
          )}
        >
          <div className="flex items-center gap-1.5">
            {state.direction === "backward" ? (
              <ArrowUp className="w-3.5 h-3.5 stroke-[2.5] animate-bounce" />
            ) : (
              <ArrowDown className="w-3.5 h-3.5 stroke-[2.5] animate-bounce" />
            )}
            <span>{state.label}</span>
          </div>

          <span className="text-[11px] font-normal opacity-80">{state.sublabel}</span>

          {state.direction === "backward" ? (
            <ArrowUp className="w-3.5 h-3.5 stroke-[2.5] animate-bounce" />
          ) : (
            <ArrowDown className="w-3.5 h-3.5 stroke-[2.5] animate-bounce" />
          )}
        </motion.div>
      ) : (
        <div className="flex items-center gap-2 text-muted-foreground/40 text-[11px] font-mono py-1">
          <div className="w-12 h-px bg-border/60" />
          <span>{state.label === "Merged" ? "✓ Merged" : "↕"}</span>
          <div className="w-12 h-px bg-border/60" />
        </div>
      )}
    </div>
  );
}

interface PlaceCardProps {
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  icon: React.ReactNode;
  isTarget: boolean;
  description: string;
  children: React.ReactNode;
}

function PlaceCard({
  title,
  subtitle,
  badge,
  badgeColor,
  icon,
  isTarget,
  description,
  children,
}: PlaceCardProps) {
  return (
    <motion.div
      layout
      className={cn(
        "relative flex flex-col justify-between rounded-xl p-4 sm:p-5 border-2 transition-all duration-300 min-h-[250px] h-full",
        isTarget
          ? "border-emerald-500 bg-gradient-to-b from-emerald-500/10 via-card to-card shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/40"
          : "border-border/60 bg-card/80 opacity-80 hover:opacity-100 hover:border-border"
      )}
    >
      {/* Active Pulse Pill */}
      {isTarget && (
        <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-mono font-bold uppercase tracking-wider shadow-md shadow-emerald-500/30 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-black animate-ping" />
          Active Place
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-start gap-2.5 mb-2">
          <div className="h-9 w-9 rounded-lg bg-muted/60 border border-border flex items-center justify-center shrink-0">
            {icon}
          </div>
          <div>
            <h4 className="font-bold text-sm text-foreground leading-tight">{title}</h4>
            <p className="text-[11px] text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        <Badge variant="outline" className={cn("text-[10px] font-mono py-0 mt-1 mb-2", badgeColor)}>
          {badge}
        </Badge>

        <p className="text-xs text-muted-foreground/90 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Inner preview card */}
      {children}
    </motion.div>
  );
}
