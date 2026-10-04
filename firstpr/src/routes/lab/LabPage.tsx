import { useState, useEffect } from "react";
import { Terminal } from "@/components/terminal/Terminal";
import { executeCommand, scenarios } from "./LabEngine";
import type { RepoState, CommandAnalysis, CommandTokenBreakdown } from "./LabEngine";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronRight,
  RefreshCcw,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  AlertTriangle,
  Info,
  Terminal as TerminalIcon,
  GitBranch,
  GitFork,
  Check,
  Copy,
  BookOpen,
  ListOrdered,
  ShieldCheck,
  Globe,
  Search,
  Target,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

import {
  gitCheatSheetCommands,
  searchCheatSheet,
  type CheatSheetCategory,
  type CheatSheetCommand,
} from "./gitCheatSheetData";
import { X, ExternalLink } from "lucide-react";

type OutputLine = { text: string; isError?: boolean };

const cheatSheetCategories: CheatSheetCategory[] = [
  "All",
  "Setup & Config",
  "Create & Clone",
  "Staging & Committing",
  "Branching & Merging",
  "Sharing & Remotes",
  "Inspection & Logs",
  "Undo & Reset",
  "Stashing",
  "Rebase & Advanced",
];

const popularSearchIntents = [
  "command to add file",
  "how to undo commit",
  "create feature branch",
  "push branch to github",
  "save work to stash",
  "squash commits rebase",
  "discard file edits",
  "set author email",
  "clone repository",
  "sync with upstream",
];

export default function LabPage() {
  const navigate = useNavigate();
  const [scenarioId, setScenarioId] = useState(1);
  const scenario = scenarios.find((s) => s.id === scenarioId) || scenarios[0];

  const [state, setState] = useState<RepoState>(scenario.initialState);
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [hintLevel, setHintLevel] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [latestAnalysis, setLatestAnalysis] = useState<CommandAnalysis | null>(null);
  const [presetInput, setPresetInput] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("mission");
  const [guideSearch, setGuideSearch] = useState<string>("");
  const [guideCategory, setGuideCategory] = useState<CheatSheetCategory>("All");

  // Initialize when scenario changes
  useEffect(() => {
    setState(scenario.initialState);
    setOutput([
      { text: "✨ Welcome to the FirstPR Interactive Terminal Lab (Practice Sandbox)." },
      { text: `Scenario ${scenario.id}: ${scenario.title}` },
      { text: "🔒 Safe Environment: Commands run in virtual memory and do NOT affect your real GitHub." },
      { text: "Type Git commands below to practice the open source workflow.\n" },
    ]);
    setHintLevel(0);
    setCompleted(false);
    setLatestAnalysis(null);
    setPresetInput("");
    setActiveTab("mission");
  }, [scenario]);

  const handleCommand = (cmd: string) => {
    setOutput((prev) => [...prev, { text: `user@machine:${state.cwd}$ ${cmd}` }]);

    const res = executeCommand(cmd, state, scenario);

    if (res.out[0] === "__CLEAR__") {
      setOutput([]);
    } else if (res.out[0] === "__NEXT_SCENARIO__") {
      if (scenarioId < scenarios.length) {
        setScenarioId((s) => s + 1);
        toast.success(`Advancing to Scenario ${scenarioId + 1}`);
      } else {
        toast.info("You've completed all scenarios!");
      }
    } else {
      const newOutput: OutputLine[] = res.out.map((t) => ({ text: t }));
      if (res.error) newOutput.push({ text: res.error, isError: true });
      setOutput((prev) => [...prev, ...newOutput]);
    }

    setState(res.state);

    if (res.analysis) {
      setLatestAnalysis(res.analysis);
      if (res.analysis.status === "incorrect" || res.analysis.status === "out-of-sequence") {
        toast.error("Command Error / Out of Sequence", {
          description: "Click the 'Command Inspector' tab to see what to write instead.",
        });
      }
    }

    const isGoalMet = scenario.checkGoal(res.state);
    if (isGoalMet && !completed) {
      setCompleted(true);
      toast.success(`🎉 Great work! Scenario ${scenario.id} completed!`, {
        description: "You completed all tasks in the proper open-source sequence.",
      });
    }
  };

  const handleReset = () => {
    setState(scenario.initialState);
    setOutput([{ text: "🔄 Environment reset to initial scenario state." }]);
    setHintLevel(0);
    setCompleted(false);
    setLatestAnalysis(null);
    setPresetInput("");
    setActiveTab("mission");
    toast.info("Lab environment reset.");
  };

  const completedStepsCount = scenario.steps.filter((st) => st.check(state)).length;
  const progressPercent = Math.round((completedStepsCount / scenario.steps.length) * 100);
  const activeStepIndex = scenario.steps.findIndex((st) => !st.check(state));
  const activeStep = activeStepIndex !== -1 ? scenario.steps[activeStepIndex] : null;

  const copyToTerminal = (command: string) => {
    setPresetInput(command);
    toast.success("Command copied into terminal prompt!");
  };

  const searchResults = searchCheatSheet(guideSearch, guideCategory, gitCheatSheetCommands);

  // Category counts based on current search query
  const categoryCounts = cheatSheetCategories.reduce((acc, cat) => {
    if (cat === "All") {
      acc[cat] = searchCheatSheet(guideSearch, "All", gitCheatSheetCommands).length;
    } else {
      acc[cat] = searchCheatSheet(guideSearch, cat, gitCheatSheetCommands).length;
    }
    return acc;
  }, {} as Record<CheatSheetCategory, number>);

  return (
    <div className="container mx-auto p-3 md:p-4 flex flex-col min-h-[calc(100vh-5.5rem)] max-w-7xl pb-12">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
            <TerminalIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                Terminal Lab
              </h1>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[11px] gap-1 py-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Safe Virtual Sandbox</span>
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Scenario {scenario.id} of {scenarios.length}: {scenario.title} — Step-by-step interactive tasks with command meanings.
            </p>
          </div>
        </div>

        {/* Scenario Switcher & Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-muted rounded-lg p-1 border">
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => setScenarioId(s.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  s.id === scenarioId
                    ? "bg-background text-foreground shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.id}
              </button>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={() => navigate("/rescue")}>
            <HelpCircle className="w-4 h-4 mr-1.5 text-amber-500" /> Rescue
          </Button>

          <Button variant="outline" size="sm" onClick={handleReset}>
            <RefreshCcw className="w-4 h-4 mr-1.5" /> Reset
          </Button>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="flex flex-col lg:flex-row gap-4 flex-1 items-start min-h-0">
        {/* Terminal Window (50% on Desktop, Sticky) */}
        <div className="w-full lg:w-[50%] h-[580px] lg:h-[calc(100vh-6.5rem)] lg:sticky lg:top-3 flex flex-col min-h-[460px] shrink-0">
          <Terminal
            onCommand={handleCommand}
            output={output}
            cwd={state.cwd}
            presetInput={presetInput}
          />
        </div>

        {/* Learning, Analysis & State Panel (50% on Desktop, Smooth Scrollable Tabs) */}
        <div className="w-full lg:w-[50%] flex flex-col gap-3 min-h-[500px] lg:max-h-[calc(100vh-6.5rem)] lg:overflow-y-auto pr-1 sm:pr-2 pb-6 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900/50">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex flex-col gap-3 w-full"
          >
            <TabsList className="grid grid-cols-4 w-full shrink-0 bg-muted/70 p-1 border">
              <TabsTrigger value="mission" className="text-xs flex items-center justify-center gap-1.5 py-2 font-medium data-[state=active]:font-bold">
                <Target className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="truncate">Current Mission</span>
              </TabsTrigger>
              <TabsTrigger value="inspector" className="text-xs flex items-center justify-center gap-1.5 py-2 relative font-medium data-[state=active]:font-bold">
                <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="truncate">Inspector</span>
                {latestAnalysis && latestAnalysis.status === "incorrect" && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1 right-1 animate-ping" />
                )}
              </TabsTrigger>
              <TabsTrigger value="state" className="text-xs flex items-center justify-center gap-1.5 py-2 font-medium data-[state=active]:font-bold">
                <GitBranch className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Repo State</span>
              </TabsTrigger>
              <TabsTrigger value="cheatsheet" className="text-xs flex items-center justify-center gap-1.5 py-2 font-medium data-[state=active]:font-bold">
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">All Commands</span>
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: CURRENT MISSION & STEPS */}
            <TabsContent value="mission" className="space-y-4 focus-visible:outline-none mt-0">
              <Card className="border-border/80 shadow-md bg-card/95">
                <CardHeader className="p-4 pb-3 bg-muted/30 border-b space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={completed ? "default" : "secondary"} className="text-xs font-semibold">
                        {completed ? "Completed ✓" : `Step ${completedStepsCount} of ${scenario.steps.length}`}
                      </Badge>
                      <CardTitle className="text-base font-bold tracking-tight">{scenario.title}</CardTitle>
                    </div>
                    {completed && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  </div>
                  <CardDescription className="text-xs text-foreground/80 leading-relaxed">
                    {scenario.description}
                  </CardDescription>

                  {/* Progress Bar */}
                  <div className="pt-1 space-y-1.5">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span className="font-medium">Scenario Progress</span>
                      <span className="font-bold text-foreground font-mono">{progressPercent}% ({completedStepsCount}/{scenario.steps.length} tasks)</span>
                    </div>
                    <Progress value={progressPercent} className="h-2 bg-muted rounded-full" />
                  </div>
                </CardHeader>

                <CardContent className="p-4 space-y-4">
                  {/* ACTIVE MISSION CARD (When Scenario Not Yet Completed) */}
                  {activeStep && !completed && (
                    <div className="p-4 rounded-xl border-2 border-primary/50 bg-gradient-to-b from-primary/15 via-background to-card space-y-3.5 relative shadow-lg">
                      <div className="flex items-center justify-between gap-2 border-b border-primary/20 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                          </span>
                          <Badge className="bg-primary text-primary-foreground text-[11px] uppercase font-bold tracking-wider py-0.5 px-2.5 shadow-sm">
                            Active Mission • Task {activeStepIndex + 1} of {scenario.steps.length}
                          </Badge>
                        </div>
                        <span className="text-[11px] font-semibold text-primary/90 flex items-center gap-1">
                          Run in Terminal <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-foreground flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary shrink-0" />
                          {activeStep.taskTitle || activeStep.label}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {activeStep.instruction}
                        </p>
                      </div>

                      {/* PROMINENT TARGET COMMAND BOX WITH 1-CLICK PASTE */}
                      <div className="p-3.5 rounded-lg bg-zinc-950 border-2 border-emerald-500/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-inner">
                        <div className="space-y-0.5 min-w-0 flex-1">
                          <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400/80">
                            Command to run in terminal:
                          </div>
                          <div className="font-mono text-sm sm:text-base text-emerald-400 font-bold break-all selection:bg-emerald-500 selection:text-black">
                            {activeStep.exampleCommand}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => copyToTerminal(activeStep.exampleCommand)}
                          className="h-9 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold shrink-0 gap-1.5 shadow-md px-3.5 transition-all active:scale-95"
                        >
                          <Copy className="w-4 h-4" />
                          <span>Paste in Terminal</span>
                        </Button>
                      </div>

                      {/* WHAT THIS COMMAND MEANS */}
                      <div className="p-3 rounded-lg bg-background/90 border border-border/90 space-y-2 text-xs shadow-sm">
                        <div className="font-bold text-primary flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>What this command means:</span>
                        </div>
                        <p className="text-foreground font-medium text-xs leading-relaxed">
                          {activeStep.commandMeaning}
                        </p>

                        {/* PART BY PART TOKENS BREAKDOWN */}
                        {activeStep.breakdown && activeStep.breakdown.length > 0 && (
                          <div className="pt-2 border-t border-border/60">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                              Command Parts & Flags Anatomy:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {activeStep.breakdown.map((b, i) => (
                                <div
                                  key={i}
                                  className={`px-2 py-1 rounded border text-[11px] flex items-center gap-1.5 ${
                                    b.isFlag
                                      ? "bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300 font-medium"
                                      : "bg-muted/80 border-border text-foreground"
                                  }`}
                                >
                                  <code className="font-mono font-bold text-primary">{b.token}</code>
                                  <span className="text-[10px] text-muted-foreground">→ {b.meaning}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* WHY THIS STEP & ORDER */}
                      <div className="p-2.5 rounded-lg bg-muted/40 border border-border/70 text-[11px] space-y-1">
                        <div className="font-bold text-primary flex items-center gap-1">
                          <Info className="w-3.5 h-3.5" /> Why this order in open source:
                        </div>
                        <p className="text-muted-foreground leading-normal">
                          {activeStep.whyDoThis}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* STEP CHECKLIST WITH COMMAND PREVIEWS */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                      <span>All Tasks in Scenario ({completedStepsCount}/{scenario.steps.length})</span>
                      <span className="font-normal text-muted-foreground/80">Follow in sequence</span>
                    </div>

                    {scenario.steps.map((st, idx) => {
                      const isDone = st.check(state);
                      const isActive = idx === activeStepIndex;

                      return (
                        <div
                          key={st.id}
                          className={`p-3 rounded-lg border text-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                            isDone
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                              : isActive
                              ? "bg-primary/10 border-primary/60 text-foreground ring-2 ring-primary/30 shadow-sm"
                              : "bg-muted/30 border-border/40 text-muted-foreground opacity-70"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-mono text-[11px] font-bold ${
                                isDone
                                  ? "bg-emerald-500 text-white"
                                  : isActive
                                  ? "bg-primary text-primary-foreground"
                                  : "border border-muted-foreground/40 text-muted-foreground"
                              }`}
                            >
                              {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className={`font-semibold text-xs ${isDone ? "line-through opacity-80" : "text-foreground"}`}>
                                {st.label}
                              </div>
                              <div className="text-[11px] text-primary/90 font-mono break-all font-semibold">
                                {st.exampleCommand}
                              </div>
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center gap-1.5 self-end sm:self-center">
                            {isDone ? (
                              <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-400 bg-emerald-500/10 py-0.5 px-2">
                                Done ✓
                              </Badge>
                            ) : (
                              <Button
                                size="sm"
                                variant={isActive ? "default" : "outline"}
                                onClick={() => copyToTerminal(st.exampleCommand)}
                                className={`h-7 text-xs font-mono gap-1 px-2.5 ${
                                  isActive ? "bg-primary text-primary-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                <Copy className="w-3 h-3" />
                                <span>Paste</span>
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* SCENARIO COMPLETED BANNER */}
                  {completed && (
                    <div className="p-4 bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-card border-2 border-emerald-500/40 rounded-xl space-y-3 shadow-md">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                            <CheckCircle2 className="w-4 h-4" /> All Tasks Solved!
                          </div>
                          <h3 className="text-base font-bold text-foreground mt-2">
                            Scenario {scenario.id} Complete!
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                            You successfully mastered and executed all commands for this stage in open source sequence.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        {scenarioId < scenarios.length ? (
                          <Button
                            size="sm"
                            onClick={() => setScenarioId((s) => s + 1)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold h-9 gap-1.5 flex-1 shadow"
                          >
                            <span>Next Scenario {scenarioId + 1}</span>
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => navigate("/workflow")}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold h-9 gap-1.5 flex-1 shadow"
                          >
                            <span>Explore Full Git Workflow</span>
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleReset}
                          className="text-xs h-9"
                        >
                          <RefreshCcw className="w-3.5 h-3.5 mr-1" /> Replay
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* HINTS SECTION */}
                  <div className="pt-2 border-t space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                        <HelpCircle className="w-3.5 h-3.5" /> Hints ({hintLevel}/{scenario.hints.length})
                      </span>
                      {hintLevel < scenario.hints.length && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setHintLevel((h) => h + 1)}
                          className="h-6 text-xs text-primary font-semibold hover:bg-primary/10"
                        >
                          Reveal Hint +
                        </Button>
                      )}
                    </div>
                    {scenario.hints.slice(0, hintLevel).map((hint, i) => (
                      <div
                        key={i}
                        className="text-xs text-foreground/90 p-2.5 bg-muted/60 border rounded-md font-mono"
                      >
                        💡 {hint}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 2: COMMAND INSPECTOR */}
            <TabsContent value="inspector" className="space-y-3 focus-visible:outline-none mt-0">
              <AnimatePresence mode="wait">
                {latestAnalysis ? (
                  <motion.div
                    key={latestAnalysis.rawCommand + latestAnalysis.status}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {/* Status & Verdict Card */}
                    <Card
                      className={`border-l-4 shadow-sm ${
                        latestAnalysis.status === "correct"
                          ? "border-l-emerald-500 bg-emerald-500/5 border-emerald-500/30"
                          : latestAnalysis.status === "out-of-sequence"
                          ? "border-l-amber-500 bg-amber-500/5 border-amber-500/30"
                          : latestAnalysis.status === "incorrect"
                          ? "border-l-rose-500 bg-rose-500/5 border-rose-500/30"
                          : "border-l-blue-500 bg-blue-500/5 border-blue-500/30"
                      }`}
                    >
                      <CardHeader className="p-4 pb-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {latestAnalysis.status === "correct" && (
                              <Badge className="bg-emerald-500 text-white hover:bg-emerald-600 gap-1 text-xs">
                                <CheckCircle2 className="w-3.5 h-3.5" /> {latestAnalysis.badgeText}
                              </Badge>
                            )}
                            {latestAnalysis.status === "out-of-sequence" && (
                              <Badge variant="secondary" className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 gap-1 text-xs font-semibold">
                                <ListOrdered className="w-3.5 h-3.5" /> {latestAnalysis.badgeText}
                              </Badge>
                            )}
                            {latestAnalysis.status === "incorrect" && (
                              <Badge variant="destructive" className="gap-1 text-xs">
                                <AlertTriangle className="w-3.5 h-3.5" /> Execution Error
                              </Badge>
                            )}
                            {latestAnalysis.status === "neutral" && (
                              <Badge variant="secondary" className="gap-1 text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30">
                                <Info className="w-3.5 h-3.5" /> Informational Command
                              </Badge>
                            )}
                            <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded text-foreground font-semibold">
                              {latestAnalysis.commandName}
                            </span>
                          </div>
                          <Badge variant="outline" className="text-[10px] text-muted-foreground">
                            {latestAnalysis.gitConcept}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2 space-y-3.5">
                        {/* Syntax confirmation pill */}
                        <div className="flex items-center gap-2 text-xs">
                          {latestAnalysis.syntaxValid ? (
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20 text-[11px]">
                              <Check className="w-3 h-3" /> Command Syntax is 100% Valid
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-medium border border-rose-500/20 text-[11px]">
                              <AlertTriangle className="w-3 h-3" /> Syntax / Execution Error
                            </div>
                          )}
                        </div>

                        {/* PROMINENT CORRECTED CODE BOX (When an error occurs) */}
                        {latestAnalysis.status === "incorrect" && latestAnalysis.correctedCommand && (
                          <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 space-y-2.5 shadow-sm">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              <span>What to write instead (Corrected Code):</span>
                            </div>

                            <div className="p-2.5 rounded bg-zinc-950 font-mono text-xs text-emerald-400 border border-emerald-500/30 flex items-center justify-between gap-2 shadow-inner">
                              <span className="font-semibold">{latestAnalysis.correctedCommand}</span>
                              <Button
                                size="sm"
                                className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-sans shrink-0 font-medium"
                                onClick={() => copyToTerminal(latestAnalysis.correctedCommand!)}
                              >
                                <Copy className="w-3.5 h-3.5 mr-1" /> Paste into Terminal
                              </Button>
                            </div>

                            {latestAnalysis.correctionReason && (
                              <p className="text-[11px] text-foreground/80 leading-relaxed">
                                💡 <strong>Explanation:</strong> {latestAnalysis.correctionReason}
                              </p>
                            )}

                            {latestAnalysis.scenarioTargetCommand && (
                              <div className="pt-2 border-t border-emerald-500/20 text-xs space-y-1">
                                <div className="text-muted-foreground text-[11px]">
                                  Or if working on <strong>Scenario {scenario.id} ({scenario.title})</strong>:
                                </div>
                                <div className="p-2 rounded bg-background border border-border/70 flex items-center justify-between gap-2 font-mono text-[11px]">
                                  <span className="text-primary font-semibold truncate">{latestAnalysis.scenarioTargetCommand}</span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-6 text-[11px] font-sans shrink-0"
                                    onClick={() => copyToTerminal(latestAnalysis.scenarioTargetCommand!)}
                                  >
                                    <Copy className="w-3 h-3 mr-1" /> Paste Scenario Code
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* OUT-OF-SEQUENCE WORKFLOW FORMAT CALLOUT */}
                        {latestAnalysis.sequenceInfo && latestAnalysis.sequenceInfo.isOutOfSequence && (
                          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 space-y-2">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
                              <ListOrdered className="w-4 h-4" />
                              <span>Workflow Format Notice: Prerequisite Commands Needed First</span>
                            </div>
                            <p className="text-xs text-foreground/90 leading-relaxed">
                              {latestAnalysis.sequenceInfo.explanation}
                            </p>

                            {/* Prerequisite commands list */}
                            {latestAnalysis.sequenceInfo.prerequisites && (
                              <div className="space-y-1.5 pt-1">
                                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                                  In Open Source Format, run these commands first:
                                </span>
                                {latestAnalysis.sequenceInfo.prerequisites.map((p, i) => (
                                  <div
                                    key={i}
                                    className="p-2 rounded bg-background border border-amber-500/20 text-xs flex items-center justify-between gap-2"
                                  >
                                    <div className="space-y-0.5 font-mono text-[11px]">
                                      <div className="font-semibold text-primary">{p.cmd}</div>
                                      <div className="font-sans text-[10px] text-muted-foreground">
                                        {p.reason}
                                      </div>
                                    </div>
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      className="h-6 text-[11px] shrink-0"
                                      onClick={() => copyToTerminal(p.cmd)}
                                    >
                                      <Copy className="w-3 h-3 mr-1" /> Paste
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* What the command means */}
                        <div className="p-3 rounded-lg bg-muted/40 border space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                            <BookOpen className="w-3.5 h-3.5 text-primary" />
                            <span>Command Meaning & Function:</span>
                          </div>
                          <p className="text-xs md:text-sm font-medium text-foreground leading-relaxed">
                            {latestAnalysis.commandMeaning || latestAnalysis.summary}
                          </p>

                          {/* Token Breakdown */}
                          {latestAnalysis.breakdown && latestAnalysis.breakdown.length > 0 && (
                            <div className="pt-2 border-t border-border/50 space-y-1.5">
                              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">
                                Token-by-Token Meaning:
                              </span>
                              <div className="space-y-1">
                                {latestAnalysis.breakdown.map((token, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between p-1.5 rounded bg-background border border-border/70 text-xs"
                                  >
                                    <code className={`font-mono font-bold px-1.5 py-0.5 rounded text-[11px] ${
                                      token.isFlag ? "bg-amber-500/15 text-amber-600 dark:text-amber-400" : "bg-primary/10 text-primary"
                                    }`}>
                                      {token.token}
                                    </code>
                                    <span className="text-muted-foreground text-[11px] text-right">
                                      {token.meaning}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Breakdown of arguments & flags */}
                        {latestAnalysis.details && latestAnalysis.details.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                              Key Notes:
                            </h4>
                            <ul className="space-y-1">
                              {latestAnalysis.details.map((d, i) => (
                                <li key={i} className="text-xs text-foreground/80 flex items-start gap-1.5">
                                  <span className="text-primary mt-0.5">•</span>
                                  <span>{d.replace(/`([^`]+)`/g, "$1")}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* What happens on real GitHub vs sandbox */}
                        <div className="p-2.5 rounded-lg bg-muted/40 border text-xs space-y-1">
                          <div className="flex items-center gap-1.5 font-semibold text-foreground">
                            <Globe className="w-3.5 h-3.5 text-primary" />
                            <span>Sandbox vs. Real GitHub:</span>
                          </div>
                          <p className="text-muted-foreground text-[11px]">
                            <strong className="text-foreground">In this practice sandbox:</strong> Updates the virtual repository state in browser memory.
                          </p>
                          <p className="text-muted-foreground text-[11px]">
                            <strong className="text-foreground">On real GitHub:</strong> Runs on your local machine and communicates with github.com servers securely.
                          </p>
                        </div>

                        {/* Feedback / Diagnosis */}
                        <div className="pt-2 border-t border-border/50">
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                            Assessment & Feedback:
                          </h4>
                          <p className="text-xs text-foreground/90">
                            {latestAnalysis.feedback}
                          </p>
                        </div>

                        {/* Suggestion / Correction Action */}
                        {latestAnalysis.suggestion && !latestAnalysis.sequenceInfo?.isOutOfSequence && (
                          <div className="p-2.5 rounded-lg bg-background border border-border/80 flex items-center justify-between gap-2">
                            <div className="text-xs">
                              <span className="font-semibold text-primary">Next Action: </span>
                              <span className="text-muted-foreground">{latestAnalysis.suggestion}</span>
                            </div>
                            {latestAnalysis.correctedCommand && (
                              <Button
                                size="sm"
                                variant="secondary"
                                className="h-7 text-xs font-mono shrink-0"
                                onClick={() => copyToTerminal(latestAnalysis.correctedCommand!)}
                              >
                                <Copy className="w-3 h-3 mr-1" /> Use Fix
                              </Button>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <div className="p-6 text-center border rounded-xl bg-muted/20 border-dashed space-y-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                      <TerminalIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Interactive Command Inspector</h4>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
                        Type any Git command in the terminal on the left. The inspector will tell you if the syntax is valid, what the code means, and what happens on real GitHub!
                      </p>
                    </div>
                    <div className="pt-2 flex flex-wrap justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs font-mono"
                        onClick={() => copyToTerminal(scenario.steps[0]?.exampleCommand || "git status")}
                      >
                        Try: {scenario.steps[0]?.exampleCommand || "git status"}
                      </Button>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </TabsContent>

            {/* TAB 3: LIVE REPO STATE */}
            <TabsContent value="state" className="space-y-3 focus-visible:outline-none mt-0">
              <Card className="border-border/60">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-xs uppercase text-muted-foreground font-semibold flex items-center justify-between">
                    <span>Virtual Git Repository State</span>
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {state.cwd}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2 space-y-4 font-mono text-xs">
                  {/* HEAD & Active Branch */}
                  <div className="p-2.5 rounded-lg bg-muted/40 border">
                    <span className="text-muted-foreground block text-[11px] uppercase font-bold mb-1">
                      Current HEAD Pointer:
                    </span>
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-4 h-4 text-primary" />
                      <span className="font-bold text-foreground">{state.head}</span>
                      <span className="text-muted-foreground text-[11px]">
                        ({state.branches[state.head]?.length || 0} commits)
                      </span>
                    </div>
                  </div>

                  {/* Branches */}
                  <div>
                    <span className="text-muted-foreground block text-[11px] uppercase font-bold mb-1">
                      Local Branches:
                    </span>
                    <div className="space-y-1">
                      {Object.keys(state.branches).map((b) => (
                        <div
                          key={b}
                          className={`px-2.5 py-1.5 rounded flex items-center justify-between text-xs ${
                            b === state.head
                              ? "bg-primary/10 border border-primary/30 font-semibold text-primary"
                              : "bg-muted/30 text-muted-foreground"
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <GitBranch className="w-3.5 h-3.5" />
                            {b}
                          </span>
                          <span className="text-[11px]">
                            {state.branches[b]?.length || 0} commit(s)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Remotes */}
                  <div>
                    <span className="text-muted-foreground block text-[11px] uppercase font-bold mb-1">
                      Configured Remotes:
                    </span>
                    {Object.keys(state.remotes).length === 0 ? (
                      <p className="text-muted-foreground text-xs italic">(No remotes configured yet)</p>
                    ) : (
                      <div className="space-y-1.5">
                        {Object.entries(state.remotes).map(([name, url]) => (
                          <div
                            key={name}
                            className="p-2 rounded bg-muted/30 border border-border/50 text-xs flex items-center justify-between"
                          >
                            <div className="flex items-center gap-1.5 font-semibold text-foreground">
                              <GitFork className="w-3.5 h-3.5 text-blue-500" />
                              {name}
                            </div>
                            <span className="text-muted-foreground truncate max-w-[200px] text-[11px]">
                              {url}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Staged & Modified Files */}
                  <div>
                    <span className="text-muted-foreground block text-[11px] uppercase font-bold mb-1">
                      Working Tree & Staging Index:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded bg-muted/20 border">
                        <span className="text-emerald-500 font-semibold block text-[11px]">
                          Staged ({state.staged.length})
                        </span>
                        {state.staged.length === 0 ? (
                          <span className="text-muted-foreground text-[11px] italic">clean</span>
                        ) : (
                          state.staged.map((f) => (
                            <span key={f} className="block text-emerald-400 font-mono text-[11px]">
                              + {f}
                            </span>
                          ))
                        )}
                      </div>
                      <div className="p-2 rounded bg-muted/20 border">
                        <span className="text-amber-500 font-semibold block text-[11px]">
                          Modified ({state.modified.length})
                        </span>
                        {state.modified.length === 0 ? (
                          <span className="text-muted-foreground text-[11px] italic">clean</span>
                        ) : (
                          state.modified.map((f) => (
                            <span key={f} className="block text-amber-400 font-mono text-[11px]">
                              ~ {f}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Git Config */}
                  <div>
                    <span className="text-muted-foreground block text-[11px] uppercase font-bold mb-1">
                      Identity Config:
                    </span>
                    <div className="p-2 rounded bg-muted/20 border text-[11px] space-y-0.5">
                      <div>
                        <span className="text-muted-foreground">user.name: </span>
                        <span className="text-foreground font-semibold">
                          {state.config.name || "(not set)"}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">user.email: </span>
                        <span className="text-foreground font-semibold">
                          {state.config.email || "(not set)"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 4: CHEATSHEET & ALL COMMANDS */}
            <TabsContent value="cheatsheet" className="space-y-3.5 focus-visible:outline-none mt-0">
              {/* Official Reference & Sandbox Safety Note */}
              <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-500/10 via-primary/5 to-card border border-emerald-500/30 text-xs space-y-1.5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Official Git Cheat Sheet & Sandbox Practice:</span>
                  </div>
                  <a
                    href="https://git-scm.com/cheat-sheet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                  >
                    <span>git-scm.com/cheat-sheet</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-foreground/80 text-[11px] leading-relaxed">
                  Complete reference of all Git commands from the official GitHub & Git-SCM cheat sheet with plain English meanings, use cases, and token breakdowns. Type any command or search intent below!
                </p>
              </div>

              {/* Filter & Smart Intent Search Bar */}
              <div className="space-y-2.5 bg-card/60 p-3 rounded-xl border border-border/80">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder='Search by command or intent (e.g. "command to add file", "how to undo commit", "git stash")...'
                      value={guideSearch}
                      onChange={(e) => setGuideSearch(e.target.value)}
                      className="w-full bg-background border border-border/80 rounded-lg pl-9 pr-8 py-2 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
                    />
                    {guideSearch && (
                      <button
                        onClick={() => setGuideSearch("")}
                        className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      if (!guideSearch.trim()) {
                        toast.info("Showing all commands.");
                      } else {
                        toast.success(`Search completed for "${guideSearch}"`);
                      }
                    }}
                    className="h-9 px-3.5 text-xs bg-primary hover:bg-primary/90 text-primary-foreground font-bold shrink-0 shadow-sm gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Search</span>
                  </Button>
                </div>

                {/* Popular Search Intents Quick Chips */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Quick Intent Search:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {popularSearchIntents.map((intent) => (
                      <button
                        key={intent}
                        onClick={() => {
                          setGuideSearch(intent);
                          setGuideCategory("All");
                        }}
                        className={`text-[10px] px-2 py-0.5 rounded-md border transition-all ${
                          guideSearch.toLowerCase() === intent.toLowerCase()
                            ? "bg-primary text-primary-foreground font-bold border-primary shadow-sm"
                            : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border-border/60"
                        }`}
                      >
                        "{intent}"
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Pills with Dynamic Count Badges */}
                <div className="pt-1 border-t border-border/50">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                    Filter by Stage & Category:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cheatSheetCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setGuideCategory(cat)}
                        className={`px-2 py-1 rounded-md text-[11px] font-medium border transition-all flex items-center gap-1.5 ${
                          guideCategory === cat
                            ? "bg-primary text-primary-foreground font-bold border-primary shadow-sm"
                            : "bg-muted/40 text-muted-foreground hover:text-foreground border-border/50 hover:bg-muted/70"
                        }`}
                      >
                        <span>{cat}</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                            guideCategory === cat
                              ? "bg-primary-foreground/20 text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {categoryCounts[cat] || 0}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Match Header */}
              <div className="flex items-center justify-between text-xs px-1 text-muted-foreground font-medium">
                <div>
                  {guideSearch ? (
                    <span>
                      Found <strong className="text-foreground">{searchResults.length}</strong> matching commands for{" "}
                      <span className="text-primary font-mono font-bold">"{guideSearch}"</span>
                    </span>
                  ) : (
                    <span>
                      Showing <strong className="text-foreground">{searchResults.length}</strong> commands in{" "}
                      <strong className="text-foreground">{guideCategory}</strong>
                    </span>
                  )}
                </div>
                {(guideSearch || guideCategory !== "All") && (
                  <button
                    onClick={() => {
                      setGuideSearch("");
                      setGuideCategory("All");
                    }}
                    className="text-[11px] text-primary hover:underline font-semibold"
                  >
                    Reset Filters
                  </button>
                )}
              </div>

              {/* Command List Cards */}
              <div className="space-y-3">
                {searchResults.map(({ command: item }, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-4 rounded-xl bg-card border border-border/80 hover:border-primary/50 transition-all space-y-3 text-xs shadow-sm"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] font-semibold bg-primary/10 text-primary border-primary/30 py-0.5">
                          {item.category}
                        </Badge>
                        <span className="font-bold text-sm text-foreground">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-[9px] text-muted-foreground font-mono">
                          {item.cheatSheetRef}
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => copyToTerminal(item.cmd)}
                          className="h-7 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 gap-1 shadow-sm active:scale-95 transition-all"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Paste to Terminal</span>
                        </Button>
                      </div>
                    </div>

                    {/* Code Box */}
                    <div className="p-3 rounded-lg bg-zinc-950 font-mono text-xs sm:text-sm text-emerald-400 font-bold break-all border border-emerald-500/30 flex items-center justify-between gap-2 shadow-inner">
                      <span>{item.cmd}</span>
                    </div>

                    {/* Command Meaning */}
                    <div className="p-2.5 rounded-lg bg-background/90 border border-border/70 space-y-1">
                      <div className="text-[11px] font-bold text-primary flex items-center gap-1.5 uppercase tracking-wider">
                        <BookOpen className="w-3.5 h-3.5" /> What this command means & does:
                      </div>
                      <p className="text-foreground font-medium text-xs leading-relaxed">
                        {item.commandMeaning}
                      </p>
                    </div>

                    {/* When & Why to Use It */}
                    {item.useCase && (
                      <div className="p-2.5 rounded-lg bg-muted/40 border border-border/60 text-[11px] space-y-1">
                        <div className="font-bold text-foreground flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> When & why to use it:
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.useCase}
                        </p>
                      </div>
                    )}

                    {/* Token Breakdown Chips */}
                    {item.breakdown && item.breakdown.length > 0 && (
                      <div className="pt-2 border-t border-border/50">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">
                          Command Parts & Flags Anatomy:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.breakdown.map((b, bi) => (
                            <div
                              key={bi}
                              className={`px-2 py-1 rounded border text-[11px] flex items-center gap-1.5 ${
                                b.isFlag
                                  ? "bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300 font-medium"
                                  : "bg-muted/80 border-border text-foreground"
                              }`}
                            >
                              <code className="font-mono font-bold text-primary">{b.token}</code>
                              <span className="text-[10px] text-muted-foreground">→ {b.meaning}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Real-World vs Sandbox Effect */}
                    <div className="text-[11px] text-muted-foreground pt-1.5 border-t border-border/40 flex items-start gap-1">
                      <Globe className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-foreground">Real GitHub: </strong>
                        <span>{item.realWorldEffect}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {searchResults.length === 0 && (
                  <div className="p-8 text-center text-xs text-muted-foreground border rounded-xl bg-muted/20 border-dashed space-y-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                      <Search className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">No matching Git commands found</h4>
                      <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                        We couldn't find any commands matching "{guideSearch}" in category "{guideCategory}".
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setGuideSearch("");
                        setGuideCategory("All");
                      }}
                      className="text-xs"
                    >
                      Clear Search & View All Commands
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
