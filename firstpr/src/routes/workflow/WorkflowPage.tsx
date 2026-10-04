import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
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
  ShieldCheck,
  FolderGit2,
  GitFork,
  Laptop,
  ArrowRight,
  ExternalLink,
  Code2
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function WorkflowPage() {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

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
      {/* 1. WELCOMING HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-card/70 via-background to-background py-10 md:py-14">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container max-w-5xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BEGINNER-FRIENDLY VISUAL WALKTHROUGH</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-sans mb-3">
            How Open Source Contributing <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Actually Works
            </span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
            No confusing jargon. See how your code travels safely from a cloud copy on GitHub down to your laptop, and back as a merged Pull Request.
          </p>

          {/* Action Redirect Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={() => navigate("/learn")}
              className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold h-11 px-6 shadow-lg shadow-emerald-500/20 gap-2 text-sm transition-all hover:scale-[1.02]"
            >
              <BookOpen className="w-4 h-4" />
              Start Guided Learn Course (Free)
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/lab")}
              className="h-11 px-5 border-border hover:bg-muted/60 gap-2 text-sm"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              Practice in Git Terminal
            </Button>
          </div>

          {/* 3 Reassurances for First-Timers */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-3xl mx-auto text-xs">
            <div className="p-3 rounded-xl border border-border/60 bg-card/40 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block">Zero Risk to the Project</strong>
                <span className="text-muted-foreground text-[11px]">You cannot accidentally break or delete the original code.</span>
              </div>
            </div>
            <div className="p-3 rounded-xl border border-border/60 bg-card/40 flex items-start gap-2.5">
              <Laptop className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block">Private on Your Laptop</strong>
                <span className="text-muted-foreground text-[11px]">Experiment freely. No one sees your draft until you upload it.</span>
              </div>
            </div>
            <div className="p-3 rounded-xl border border-border/60 bg-card/40 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block">Always Reviewed</strong>
                <span className="text-muted-foreground text-[11px]">Maintainers check every PR and guide you with friendly tips.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FRIENDLY STEP CONTROLLER */}
      <section className="sticky top-14 z-30 bg-background/95 backdrop-blur-md border-b border-border/50 py-3 shadow-md">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Play/Pause & Step Count */}
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
                <div className="px-2.5 text-xs font-mono text-muted-foreground border-x border-border">
                  {currentStepIndex + 1}/9
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

              {/* Direct Redirect to Learn Route */}
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/learn/${currentStep.learnModuleId}`)}
                className="h-8 px-2.5 text-xs font-mono gap-1 border-emerald-500/40 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/15"
                title={`Study ${currentStep.learnModuleTitle}`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Learn Mod {currentStep.learnModuleId}</span>
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>

            {/* Friendly Step Scrubber */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {workflowSteps.map((step, idx) => {
                const isActive = idx === currentStepIndex;
                const isCompleted = idx < currentStepIndex;
                const shortLabel = [
                  "1. Fork",
                  "2. Clone",
                  "3. Upstream",
                  "4. Branch",
                  "5. Code",
                  "6. Commit",
                  "7. Push",
                  "8. PR",
                  "9. Merge"
                ][idx];

                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      setCurrentStepIndex(idx);
                      setIsPlaying(false);
                    }}
                    className={cn(
                      "px-2.5 py-1 rounded-md text-xs font-sans transition-all flex items-center gap-1 shrink-0 border",
                      isActive
                        ? "bg-emerald-500 text-black border-emerald-400 font-bold shadow-sm shadow-emerald-500/30"
                        : isCompleted
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20"
                        : "bg-card border-border/60 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span>{shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN WORKFLOW VISUALIZER & EXPLANATION */}
      <main className="container max-w-5xl mx-auto px-4 pt-6 space-y-7">
        {/* Active Stage Card & Real-World Analogy */}
        <div className="p-5 md:p-6 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 font-mono text-xs">
                  {currentStep.stageBadge} of 9
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Where: <strong className="text-foreground">{currentStep.whereIsMyCode.split("(")[0]}</strong>
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                {currentStep.beginnerTitle}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                {currentStep.subtitle}
              </p>
            </div>

            {/* Quick Redirect to Matching Learn Module */}
            <div className="shrink-0">
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

          {/* REAL WORLD ANALOGY CALLOUT */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-950 dark:text-amber-200 text-xs md:text-sm flex items-start gap-3">
            <div className="h-6 w-6 rounded-md bg-amber-500/20 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400 mt-0.5">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <strong className="text-amber-800 dark:text-amber-300 font-bold block text-xs uppercase tracking-wider font-mono">
                Real-World Analogy
              </strong>
              <p className="leading-relaxed text-amber-900 dark:text-amber-200">
                {currentStep.analogy}
              </p>
            </div>
          </div>
        </div>

        {/* The Beginner-Friendly 3 Safe Places Visualizer */}
        <WorkflowVisualizer
          stepIndex={currentStepIndex}
          onStepChange={setCurrentStepIndex}
          showControls={false}
        />

        {/* 4. SIMPLE COMMAND PANE & PROMINENT LEARN REDIRECT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Command with Plain English explanation */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-xl border border-border/80 bg-black/80 shadow-xl overflow-hidden">
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground ml-2">
                    Terminal Command for this step
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                    className="text-[11px] font-mono text-muted-foreground hover:text-emerald-400 transition-colors flex items-center gap-1"
                  >
                    <Code2 className="w-3 h-3" />
                    <span>{showTechnicalDetails ? "Simple View" : "Technical Output"}</span>
                  </button>

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
              </div>

              {/* Terminal Command */}
              <div className="p-4 font-mono text-xs space-y-3">
                {currentStep.command ? (
                  <div>
                    <div className="flex items-start gap-2 text-emerald-300 bg-white/[0.04] p-3 rounded-md border border-white/5">
                      <span className="text-emerald-500 select-none font-bold">$</span>
                      <code className="text-xs sm:text-sm text-emerald-300 font-semibold select-all break-all">
                        {currentStep.command}
                      </code>
                    </div>
                  </div>
                ) : (
                  <div className="text-muted-foreground italic p-2 text-xs">
                    ✏️ No command needed here — work is done directly inside your code editor (like VS Code).
                  </div>
                )}

                {/* Plain English explanation */}
                <div className="text-xs font-sans text-muted-foreground pt-1 leading-relaxed">
                  <strong className="text-foreground">In plain English: </strong>
                  {currentStep.commandExplanation || currentStep.explain}
                </div>

                {/* Optional Technical Details Toggle */}
                {showTechnicalDetails && currentStep.stdout && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2 pt-2 border-t border-white/10"
                  >
                    <div className="text-[10px] uppercase font-mono text-muted-foreground">Simulated Console Output:</div>
                    <div className="p-2.5 rounded bg-black/60 border border-white/5 space-y-1 text-slate-300 font-mono text-[11px]">
                      {currentStep.stdout.map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Beginner Pro-Tip Card */}
            <div className="p-4 rounded-xl border border-border bg-card/40 flex items-start gap-3 text-xs">
              <div className="h-6 w-6 rounded-md bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <strong className="text-foreground block text-xs">Senior Contributor Tip</strong>
                <p className="text-muted-foreground leading-relaxed">
                  {currentStep.proTip}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: THE PROMINENT LEARN REDIRECT CARD */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 md:p-6 rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-card to-card shadow-lg shadow-emerald-500/10 relative overflow-hidden">
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
                      Learn Course Lesson
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
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {currentStep.learnLessonSummary}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Includes interactive quizzes & checklist validation!</span>
                </div>

                {/* THE PRIMARY REDIRECT BUTTON */}
                <div className="pt-2 flex flex-col gap-2">
                  <Button
                    onClick={() => navigate(`/learn/${currentStep.learnModuleId}`)}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold h-11 shadow-md shadow-emerald-500/20 text-xs font-mono gap-2 transition-all hover:scale-[1.01]"
                  >
                    <span>Read Module {currentStep.learnModuleId} in Learn Hub</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/learn")}
                    className="w-full text-xs font-mono h-9 border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    Browse Complete Course (12 Modules)
                  </Button>
                </div>
              </div>
            </div>

            {/* Beginner Pitfall to Avoid */}
            <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold font-mono text-[11px] text-rose-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Common Beginner Trap</span>
              </div>
              <p className="leading-relaxed text-rose-200">
                {currentStep.pitfall}
              </p>
            </div>
          </div>
        </div>

        {/* 5. THE 3 PLACES EXPLAINED SIMPLY */}
        <section className="pt-8 border-t border-border/60 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">
              The 3 Safe Places Explained in Simple Terms
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Why there are three copies and why this protects everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Upstream Card */}
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-400">Place 1: Original Project</span>
                <FolderGit2 className="w-4 h-4 text-blue-400" />
              </div>
              <h4 className="text-sm font-bold text-foreground">Like a Library Book</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Anyone can read it, but nobody can scribble directly on the pages. It stays protected by the authors.
              </p>
              <div className="text-[11px] text-blue-300/80 font-mono">
                Status: <strong>Read-Only</strong>
              </div>
            </div>

            {/* Origin Card */}
            <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-400">Place 2: Your Fork</span>
                <GitFork className="w-4 h-4 text-purple-400" />
              </div>
              <h4 className="text-sm font-bold text-foreground">Your Personal Photocopy</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your own cloud duplicate. You can write, test, and save changes here without affecting the library book.
              </p>
              <div className="text-[11px] text-purple-300/80 font-mono">
                Status: <strong>Your Cloud Copy</strong>
              </div>
            </div>

            {/* Local Card */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400">Place 3: Your Laptop</span>
                <Laptop className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-sm font-bold text-foreground">Your Study Desk</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Where you write the code in VS Code, run tests, and save progress. Completely private and offline.
              </p>
              <div className="text-[11px] text-emerald-300/80 font-mono">
                Status: <strong>Private Offline Workspace</strong>
              </div>
            </div>
          </div>
        </section>

        {/* 6. BOTTOM CTA: START LEARNING */}
        <section className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-card to-card p-8 md:p-10 text-center relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-4 relative z-10">
            <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 font-mono text-xs">
              READY TO PRACTICE?
            </Badge>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Start Your First Open Source Contribution
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Take the structured 12-module beginner course with step-by-step guidance, or test commands in the terminal lab.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Button
                onClick={() => navigate("/learn")}
                className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold h-11 px-6 shadow-lg shadow-emerald-500/20 text-sm gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Go to Learn Hub (Free Course)
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/lab")}
                className="h-11 px-5 text-sm gap-2"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                Launch Git Terminal
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
