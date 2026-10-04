import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { workflowSteps } from "@/components/workflow/WorkflowData";
import { WorkflowVisualizer } from "@/components/workflow/WorkflowVisualizer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Terminal, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  Sparkles, 
  AlertTriangle, 
  Lightbulb, 
  Layers, 
  ExternalLink,
  GitBranch,
  ShieldCheck,
  Cpu,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function WorkflowPage() {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"internals" | "protip" | "pitfall">("internals");

  const currentStep = workflowSteps[currentStepIndex];

  // Auto-advance loop when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % workflowSteps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "ArrowRight") {
        setCurrentStepIndex((prev) => Math.min(prev + 1, workflowSteps.length - 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.key.toLowerCase() === "l") {
        navigate(`/learn/${currentStep.learnModuleId}`);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep.learnModuleId, navigate]);

  const handleCopyCommand = () => {
    if (!currentStep.command) return;
    navigator.clipboard.writeText(currentStep.command);
    setCopied(true);
    toast.success("Command copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-card/80 via-background to-background py-12 md:py-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERACTIVE GIT & GITHUB PIPELINE</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans">
              The Open Source <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Contribution Workflow
              </span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Understand the complete Git lifecycle from your first cloud fork to a merged Pull Request.
              Visualize how code snapshots, remotes, and branches move between Upstream, Origin, and your local machine.
            </p>

            {/* Top Action Redirect Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button
                onClick={() => navigate("/learn")}
                className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold h-11 px-6 shadow-lg shadow-emerald-500/20 gap-2 text-sm transition-all hover:scale-[1.02]"
              >
                <BookOpen className="w-4 h-4" />
                Go to Guided Learn Curriculum
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/lab")}
                className="h-11 px-5 border-border hover:bg-muted/60 gap-2 text-sm"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                Practice in Git Terminal Lab
              </Button>
            </div>

            {/* Metric Pills */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl text-xs font-mono">
              <div className="p-2.5 rounded-lg border border-border/50 bg-card/40 flex flex-col items-center">
                <span className="text-foreground font-bold text-sm">9 Stages</span>
                <span className="text-muted-foreground text-[11px]">Fork to Merge</span>
              </div>
              <div className="p-2.5 rounded-lg border border-border/50 bg-card/40 flex flex-col items-center">
                <span className="text-emerald-400 font-bold text-sm">3 Tiers</span>
                <span className="text-muted-foreground text-[11px]">Upstream/Origin/Local</span>
              </div>
              <div className="p-2.5 rounded-lg border border-border/50 bg-card/40 flex flex-col items-center">
                <span className="text-blue-400 font-bold text-sm">12 Modules</span>
                <span className="text-muted-foreground text-[11px]">Connected Lessons</span>
              </div>
              <div className="p-2.5 rounded-lg border border-border/50 bg-card/40 flex flex-col items-center">
                <span className="text-cyan-400 font-bold text-sm">Zero Risk</span>
                <span className="text-muted-foreground text-[11px]">Sandboxed Workflow</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PIPELINE STEP SCRUBBER & CONTROLS */}
      <section className="sticky top-14 z-30 bg-background/95 backdrop-blur-md border-b border-border/50 py-3 shadow-md">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Playback Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="sm"
                variant={isPlaying ? "default" : "outline"}
                className={cn("gap-1.5 h-8 text-xs font-mono", isPlaying && "bg-emerald-500 text-black hover:bg-emerald-600")}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? "Pause Tour" : "Auto-Tour"}</span>
              </Button>

              <div className="flex items-center border border-border rounded-md overflow-hidden bg-card">
                <button
                  disabled={currentStepIndex === 0}
                  onClick={() => setCurrentStepIndex((prev) => prev - 1)}
                  className="h-8 w-8 flex items-center justify-center hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  aria-label="Previous step"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="px-2 text-xs font-mono text-muted-foreground border-x border-border">
                  {currentStepIndex + 1}/{workflowSteps.length}
                </div>
                <button
                  disabled={currentStepIndex === workflowSteps.length - 1}
                  onClick={() => setCurrentStepIndex((prev) => prev + 1)}
                  className="h-8 w-8 flex items-center justify-center hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  aria-label="Next step"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Direct Link to Learn Route */}
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/learn/${currentStep.learnModuleId}`)}
                className="h-8 px-2.5 text-xs font-mono gap-1 border-emerald-500/40 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/15"
                title={`Study ${currentStep.learnModuleTitle}`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Learn Mod {currentStep.learnModuleId}</span>
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>

            {/* Step Pills Scrubber */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {workflowSteps.map((step, idx) => {
                const isActive = idx === currentStepIndex;
                const isCompleted = idx < currentStepIndex;
                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      setCurrentStepIndex(idx);
                      setIsPlaying(false);
                    }}
                    className={cn(
                      "px-2.5 py-1 rounded-md text-xs font-mono transition-all flex items-center gap-1.5 shrink-0 border",
                      isActive
                        ? "bg-emerald-500 text-black border-emerald-400 font-bold shadow-sm shadow-emerald-500/30"
                        : isCompleted
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20"
                        : "bg-card border-border/60 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span>{step.id}</span>
                    <span className="hidden lg:inline text-[11px] truncate max-w-[100px]">{step.stageBadge.replace(/Stage \d: /, "")}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN WORKFLOW VISUALIZER & INTERACTIVE CONSOLE */}
      <main className="container max-w-6xl mx-auto px-4 pt-8 space-y-8">
        {/* Step Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl border border-border/80 bg-card/50 backdrop-blur-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 font-mono text-xs">
                {currentStep.stageBadge}
              </Badge>
              <span className="text-xs font-mono text-muted-foreground">
                Target: {currentStep.highlight.join(" & ")}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
              {currentStep.title}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
              {currentStep.subtitle}
            </p>
          </div>

          {/* Quick Jump to Related Learn Module Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            <Button
              onClick={() => navigate(`/learn/${currentStep.learnModuleId}`)}
              className="bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 h-10 px-4 text-xs font-mono font-semibold gap-2 shadow-sm transition-all"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Jump to {currentStep.learnModuleTitle.split(":")[0]}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* The 3-Tier Visual Architecture Component */}
        <WorkflowVisualizer
          stepIndex={currentStepIndex}
          onStepChange={setCurrentStepIndex}
          showControls={false}
        />

        {/* 4. TERMINAL SIMULATOR & STEP EXECUTION PANE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Command Terminal Box */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="rounded-xl border border-border/80 bg-black/80 shadow-2xl overflow-hidden">
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground ml-2">
                    zsh — open-source-project ({currentStep.localState?.activeBranch || "main"})
                  </span>
                </div>
                {currentStep.command && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCopyCommand}
                    className="h-7 px-2 text-xs font-mono text-muted-foreground hover:text-white gap-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </Button>
                )}
              </div>

              {/* Terminal Body */}
              <div className="p-5 font-mono text-xs space-y-4 overflow-x-auto">
                {currentStep.command ? (
                  <div>
                    <div className="text-emerald-400/70 text-[11px] mb-1"># Command executed at this stage:</div>
                    <div className="flex items-start gap-2 text-emerald-300 bg-white/[0.04] p-3 rounded-md border border-white/5">
                      <span className="text-emerald-500 select-none font-bold">$</span>
                      <code className="text-sm text-emerald-300 font-semibold select-all break-all">
                        {currentStep.command}
                      </code>
                    </div>
                  </div>
                ) : (
                  <div className="text-muted-foreground italic p-2">
                    # No terminal command for this stage — work is conducted in your code editor.
                  </div>
                )}

                {/* Simulated Command Output */}
                {currentStep.stdout && currentStep.stdout.length > 0 && (
                  <div className="space-y-1 pt-2">
                    <div className="text-muted-foreground text-[10px] uppercase tracking-wider">Simulated Console Output:</div>
                    <div className="p-3 rounded-md bg-black/60 border border-white/5 space-y-1 text-slate-300">
                      {currentStep.stdout.map((line, i) => (
                        <div key={i} className="leading-relaxed">
                          {line.startsWith("✓") ? (
                            <span className="text-emerald-400 font-bold">{line}</span>
                          ) : line.startsWith("$") ? (
                            <span className="text-blue-400 font-bold">{line}</span>
                          ) : line.includes("Fast-forward") || line.includes("changed") ? (
                            <span className="text-cyan-300">{line}</span>
                          ) : (
                            <span>{line}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Command Flags Breakdown */}
                {currentStep.commandFlags && currentStep.commandFlags.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[10px] uppercase font-mono text-muted-foreground block mb-2">Flag Breakdown:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentStep.commandFlags.map((cf, i) => (
                        <div key={i} className="p-2 rounded bg-white/[0.03] border border-white/5 text-[11px]">
                          <span className="text-emerald-400 font-bold block">{cf.flag}</span>
                          <span className="text-muted-foreground">{cf.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Explanation Prose */}
            <div className="p-4 rounded-xl border border-border bg-card/40 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                Stage Explanation
              </h4>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {currentStep.explain}
              </p>
            </div>
          </div>

          {/* Right Column: Deep Dive Tabs & Learn Module Bridge */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {/* The Featured LEARN REDIRECT CARD */}
            <div className="p-5 rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-card to-card shadow-lg shadow-emerald-500/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <BookOpen className="w-24 h-24 text-emerald-400" />
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wide">
                      Learn Path Connection
                    </span>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-mono border-emerald-500/30 text-emerald-300">
                    Mod {currentStep.learnModuleId}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {currentStep.learnModuleTitle}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {currentStep.learnLessonSummary}
                  </p>
                </div>

                {/* THE REQUESTED PROMINENT REDIRECT BUTTON */}
                <div className="pt-2 flex flex-col gap-2">
                  <Button
                    onClick={() => navigate(`/learn/${currentStep.learnModuleId}`)}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold h-10 shadow-md shadow-emerald-500/20 text-xs font-mono gap-2 transition-all hover:scale-[1.01]"
                  >
                    <span>Open Module {currentStep.learnModuleId} in Learn Hub</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/learn")}
                    className="w-full text-xs font-mono h-8 border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    Browse All 12 Learning Modules
                  </Button>
                </div>
              </div>
            </div>

            {/* Deep Dive Tabs: Internals, Pro-Tip, Pitfall */}
            <div className="rounded-xl border border-border bg-card p-4 space-y-4">
              <div className="flex items-center border-b border-border pb-3 gap-1">
                <button
                  onClick={() => setActiveTab("internals")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors flex items-center gap-1.5",
                    activeTab === "internals"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  <span>Git Internals</span>
                </button>
                <button
                  onClick={() => setActiveTab("protip")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors flex items-center gap-1.5",
                    activeTab === "protip"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pro Tip</span>
                </button>
                <button
                  onClick={() => setActiveTab("pitfall")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors flex items-center gap-1.5",
                    activeTab === "pitfall"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span>Pitfall</span>
                </button>
              </div>

              {/* Tab Contents */}
              <AnimatePresence mode="wait">
                {activeTab === "internals" && (
                  <motion.div
                    key="internals"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-2 text-xs"
                  >
                    <span className="text-muted-foreground font-mono block text-[11px]">
                      Under the Hood mechanics:
                    </span>
                    <ul className="space-y-2">
                      {currentStep.underTheHood.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-foreground/80 leading-relaxed">
                          <span className="text-blue-400 font-mono mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {activeTab === "protip" && (
                  <motion.div
                    key="protip"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1.5"
                  >
                    <div className="flex items-center gap-1.5 font-bold font-mono text-[11px] text-amber-400">
                      <Lightbulb className="w-4 h-4" />
                      <span>Maintainer Advice</span>
                    </div>
                    <p className="leading-relaxed font-sans text-amber-200">
                      {currentStep.proTip}
                    </p>
                  </motion.div>
                )}

                {activeTab === "pitfall" && (
                  <motion.div
                    key="pitfall"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-1.5"
                  >
                    <div className="flex items-center gap-1.5 font-bold font-mono text-[11px] text-rose-400">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Common Beginner Trap</span>
                    </div>
                    <p className="leading-relaxed font-sans text-rose-200">
                      {currentStep.pitfall}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 5. THE 3-TIER ARCHITECTURE COMPARISON REFERENCE */}
        <section className="pt-8 border-t border-border/60 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">
              The 3 Tiers of Open Source Development
            </h3>
            <p className="text-sm text-muted-foreground">
              Beginners often confuse the three copies. Here is the mental model senior engineers maintain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Upstream Card */}
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-blue-500/40 text-blue-400 font-mono text-xs">
                  Tier 1: Upstream
                </Badge>
                <ShieldCheck className="w-4 h-4 text-blue-400" />
              </div>
              <h4 className="text-base font-bold text-foreground">Original Repository</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The canonical source of truth on GitHub (e.g. <code className="text-blue-300">facebook/react</code>). You have <strong>read-only</strong> access. You cannot push here directly.
              </p>
              <div className="pt-2 text-[11px] font-mono text-blue-300/80 border-t border-blue-500/20 space-y-1">
                <div>• Location: GitHub Cloud</div>
                <div>• Permission: Read-only</div>
                <div>• Role: Source of truth</div>
              </div>
            </div>

            {/* Origin Card */}
            <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-purple-500/40 text-purple-400 font-mono text-xs">
                  Tier 2: Origin (Your Fork)
                </Badge>
                <Layers className="w-4 h-4 text-purple-400" />
              </div>
              <h4 className="text-base font-bold text-foreground">Your Cloud Copy</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your server-side fork on GitHub (e.g. <code className="text-purple-300">your-username/react</code>). You have <strong>full write access</strong>. It acts as the staging ground for PRs.
              </p>
              <div className="pt-2 text-[11px] font-mono text-purple-300/80 border-t border-purple-500/20 space-y-1">
                <div>• Location: GitHub Cloud</div>
                <div>• Permission: Full Read/Write</div>
                <div>• Role: Pull Request staging</div>
              </div>
            </div>

            {/* Local Card */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 font-mono text-xs">
                  Tier 3: Local Workstation
                </Badge>
                <Terminal className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-base font-bold text-foreground">Your Computer (SSD)</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The cloned repository on your physical machine. Contains the working tree, staging index, and .git history. Where all coding and testing happens.
              </p>
              <div className="pt-2 text-[11px] font-mono text-emerald-300/80 border-t border-emerald-500/20 space-y-1">
                <div>• Location: Local Machine</div>
                <div>• Permission: Full Local Ownership</div>
                <div>• Role: Code editing & commits</div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. COMPLETE WORKFLOW TO LEARN MODULE MATRIX */}
        <section className="pt-8 border-t border-border/60 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Workflow Stage to Learn Module Matrix</h3>
              <p className="text-sm text-muted-foreground">
                Every stage in this workflow corresponds to an in-depth lesson in FirstPR's Learn Hub.
              </p>
            </div>
            <Button
              onClick={() => navigate("/learn")}
              variant="outline"
              className="gap-2 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 font-mono text-xs shrink-0"
            >
              <BookOpen className="w-4 h-4" />
              Explore All Modules
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {workflowSteps.map((step) => (
              <div
                key={step.id}
                onClick={() => navigate(`/learn/${step.learnModuleId}`)}
                className="p-4 rounded-xl border border-border/70 bg-card hover:border-emerald-500/50 hover:bg-card/90 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-muted-foreground font-bold">{step.stageBadge}</span>
                    <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-500/10">
                      Mod {step.learnModuleId}
                    </Badge>
                  </div>
                  <h5 className="font-semibold text-sm text-foreground group-hover:text-emerald-300 transition-colors">
                    {step.title}
                  </h5>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {step.learnLessonSummary}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span>Start Module {step.learnModuleId}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. BOTTOM CALL TO ACTION BANNER */}
        <section className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-card to-card p-8 md:p-12 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 font-mono text-xs">
              READY FOR ACTION?
            </Badge>
            <h3 className="text-3xl font-extrabold tracking-tight">
              Turn Visual Understanding into Muscle Memory
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Take the interactive 12-module beginner course with step-by-step checklists, or jump straight into the sandboxed terminal simulator to practice real Git commands.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Button
                onClick={() => navigate("/learn")}
                className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold h-11 px-6 shadow-lg shadow-emerald-500/20 text-sm gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Start Learn Hub Course
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/lab")}
                className="h-11 px-6 text-sm gap-2"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                Launch Git Lab Terminal
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/issues")}
                className="h-11 px-4 text-sm gap-1.5 text-muted-foreground hover:text-foreground"
              >
                <GitBranch className="w-4 h-4" />
                Find Good First Issues
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
