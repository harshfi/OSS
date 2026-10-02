import { useState, useEffect } from "react";
import { Terminal } from "@/components/terminal/Terminal";
import { executeCommand, scenarios } from "./LabEngine";
import type { RepoState, CommandAnalysis } from "./LabEngine";
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
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

type OutputLine = { text: string; isError?: boolean };

type QuickCommand = {
  category: "Setup" | "Repository" | "Branching" | "Committing" | "Publishing" | "Syncing" | "Undo";
  cmd: string;
  name: string;
  summary: string;
  realWorldEffect: string;
};

const allGitCommands: QuickCommand[] = [
  // Setup
  {
    category: "Setup",
    name: "Set Author Name",
    cmd: 'git config --global user.name "Your Name"',
    summary: "Configures the author name stamped onto every commit you create.",
    realWorldEffect: "Saves to your local ~/.gitconfig file. Open source maintainers see this in the Git log.",
  },
  {
    category: "Setup",
    name: "Set Author Email",
    cmd: 'git config --global user.email "your.email@example.com"',
    summary: "Links your commits to your GitHub account so your profile avatar shows up on PRs.",
    realWorldEffect: "GitHub matches this email to award green contribution squares on your profile.",
  },
  {
    category: "Setup",
    name: "View Config Settings",
    cmd: "git config --list",
    summary: "Displays all active Git configuration keys, user names, and emails.",
    realWorldEffect: "Inspects your global and local Git settings without modifying anything.",
  },

  // Repository
  {
    category: "Repository",
    name: "Clone Repository",
    cmd: "git clone https://github.com/your-username/repo.git",
    summary: "Downloads a full copy of a GitHub repository to your local computer.",
    realWorldEffect: "Creates a folder on your drive and sets up the 'origin' remote pointing to your fork.",
  },
  {
    category: "Repository",
    name: "Add Upstream Remote",
    cmd: "git remote add upstream https://github.com/maintainer/repo.git",
    summary: "Connects your local project to the original maintainer's repository.",
    realWorldEffect: "Allows you to pull and fetch official updates to keep your fork up to date.",
  },
  {
    category: "Repository",
    name: "List Remotes",
    cmd: "git remote -v",
    summary: "Shows all connected remote repositories and their URLs.",
    realWorldEffect: "Verifies whether 'origin' (your fork) and 'upstream' (maintainer repo) are mapped.",
  },

  // Branching
  {
    category: "Branching",
    name: "Create & Switch Branch",
    cmd: "git checkout -b feature-name",
    summary: "Creates a new feature branch and immediately switches your workspace to it.",
    realWorldEffect: "Isolates your code changes from 'main' so your Pull Request stays focused and clean.",
  },
  {
    category: "Branching",
    name: "Switch to Existing Branch",
    cmd: "git checkout main",
    summary: "Switches your working directory and HEAD pointer to an existing branch.",
    realWorldEffect: "Swaps all files in your folder to match the state of that branch.",
  },
  {
    category: "Branching",
    name: "List Branches",
    cmd: "git branch",
    summary: "Lists all local branches in your repository with an asterisk on current HEAD.",
    realWorldEffect: "Shows your local branches. Use 'git branch -a' to also see remote GitHub branches.",
  },

  // Committing
  {
    category: "Committing",
    name: "Check Workspace Status",
    cmd: "git status",
    summary: "Shows which files are modified, staged for commit, or untracked.",
    realWorldEffect: "Safe inspection command. Always run this before staging or committing.",
  },
  {
    category: "Committing",
    name: "Stage Specific File",
    cmd: "git add filename.txt",
    summary: "Moves a single modified file into the Git Staging Area (Index).",
    realWorldEffect: "Tells Git: 'Include this specific file in the upcoming commit snapshot'.",
  },
  {
    category: "Committing",
    name: "Stage All Files",
    cmd: "git add .",
    summary: "Stages all new, modified, and deleted files in the workspace.",
    realWorldEffect: "Gathers all current changes into the staging area ready to commit.",
  },
  {
    category: "Committing",
    name: "Save Commit Snapshot",
    cmd: 'git commit -m "feat: add greeting message"',
    summary: "Saves a permanent snapshot of staged files to your local repository history.",
    realWorldEffect: "Creates a local commit with a SHA hash. Does NOT publish to GitHub yet until pushed.",
  },
  {
    category: "Committing",
    name: "View Commit History",
    cmd: "git log",
    summary: "Displays the chronological list of commits in your current branch.",
    realWorldEffect: "Shows authors, timestamps, commit hashes, and commit messages.",
  },

  // Publishing
  {
    category: "Publishing",
    name: "Push to GitHub Fork",
    cmd: "git push origin feature-name",
    summary: "Uploads your local commits to your remote fork on GitHub.",
    realWorldEffect: "Creates the branch on github.com and triggers the 'Compare & pull request' banner.",
  },

  // Syncing
  {
    category: "Syncing",
    name: "Fetch Upstream Changes",
    cmd: "git fetch upstream",
    summary: "Downloads new commits from the maintainer's repository without touching working files.",
    realWorldEffect: "Updates your local cached refs for upstream/main safely in the background.",
  },
  {
    category: "Syncing",
    name: "Rebase onto Upstream",
    cmd: "git rebase upstream/main",
    summary: "Replays your branch commits cleanly on top of the latest upstream code.",
    realWorldEffect: "Prevents merge conflicts and keeps the project Git history linear and clean.",
  },
  {
    category: "Syncing",
    name: "Pull Upstream Changes",
    cmd: "git pull upstream main",
    summary: "Fetches and immediately merges maintainer changes into your active branch.",
    realWorldEffect: "Updates your current working files with latest changes from upstream.",
  },

  // Undo
  {
    category: "Undo",
    name: "Discard File Changes",
    cmd: "git restore filename.txt",
    summary: "Reverts uncommitted modifications in a file back to the last commit.",
    realWorldEffect: "Throws away un-staged edits in your working directory.",
  },
  {
    category: "Undo",
    name: "Amend Last Commit",
    cmd: 'git commit --amend -m "Updated commit message"',
    summary: "Modifies the latest commit's message or includes newly staged files.",
    realWorldEffect: "Rewrites the top commit. Only do this before pushing to GitHub.",
  },
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
  const [activeTab, setActiveTab] = useState<string>("inspector");
  const [guideSearch, setGuideSearch] = useState<string>("");
  const [guideCategory, setGuideCategory] = useState<string>("All");

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
  }, [scenario]);

  const handleCommand = (cmd: string) => {
    setOutput((prev) => [...prev, { text: `user@machine:${state.cwd}$ ${cmd}` }]);

    const res = executeCommand(cmd, state, scenario);

    if (res.out[0] === "__CLEAR__") {
      setOutput([]);
    } else {
      const newOutput: OutputLine[] = res.out.map((t) => ({ text: t }));
      if (res.error) newOutput.push({ text: res.error, isError: true });
      setOutput((prev) => [...prev, ...newOutput]);
    }

    setState(res.state);

    if (res.analysis) {
      setLatestAnalysis(res.analysis);
      setActiveTab("inspector");
    }

    const isGoalMet = scenario.checkGoal(res.state);
    if (isGoalMet && !completed) {
      setCompleted(true);
      toast.success(`🎉 Great work! Scenario ${scenario.id} completed!`, {
        description: "You are ready for the next open source challenge.",
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
    toast.info("Lab environment reset.");
  };

  const completedStepsCount = scenario.steps.filter((st) => st.check(state)).length;
  const progressPercent = Math.round((completedStepsCount / scenario.steps.length) * 100);

  const copyToTerminal = (command: string) => {
    setPresetInput(command);
    toast.success("Command copied into terminal prompt!");
  };

  const filteredCommands = allGitCommands.filter((c) => {
    const matchesCat = guideCategory === "All" || c.category === guideCategory;
    const matchesSearch =
      c.cmd.toLowerCase().includes(guideSearch.toLowerCase()) ||
      c.name.toLowerCase().includes(guideSearch.toLowerCase()) ||
      c.summary.toLowerCase().includes(guideSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="container mx-auto p-4 flex flex-col h-[calc(100vh-5.5rem)] max-w-7xl">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
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
              Scenario {scenario.id} of {scenarios.length}: {scenario.title} — Runs in browser memory without modifying your real GitHub account.
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
      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
        {/* Terminal Window (55%) */}
        <div className="lg:w-[55%] h-full flex flex-col min-h-[360px]">
          <Terminal
            onCommand={handleCommand}
            output={output}
            cwd={state.cwd}
            presetInput={presetInput}
          />
        </div>

        {/* Learning, Analysis & State Panel (45%) */}
        <div className="lg:w-[45%] h-full flex flex-col gap-3 overflow-hidden">
          {/* Scenario Overview Card */}
          <Card className="border-border/60 shadow-sm shrink-0">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={completed ? "default" : "secondary"} className="text-xs">
                    {completed ? "Completed ✓" : `Step ${completedStepsCount} of ${scenario.steps.length}`}
                  </Badge>
                  <CardTitle className="text-base font-semibold">{scenario.title}</CardTitle>
                </div>
                {completed && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
              </div>
              <CardDescription className="text-xs mt-1 text-foreground/80">
                {scenario.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2 space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Scenario Progress</span>
                  <span className="font-semibold text-foreground">{progressPercent}%</span>
                </div>
                <Progress value={progressPercent} className="h-1.5" />
              </div>

              {/* Step Checklist */}
              <div className="space-y-1.5">
                {scenario.steps.map((st) => {
                  const isDone = st.check(state);
                  return (
                    <div
                      key={st.id}
                      className={`flex items-center justify-between p-2 rounded-md text-xs border transition-colors ${
                        isDone
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                          : "bg-muted/40 border-border/50 text-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                            isDone ? "bg-emerald-500 text-white" : "border border-muted-foreground/40"
                          }`}
                        >
                          {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={isDone ? "line-through opacity-80" : "font-medium text-foreground"}>
                          {st.label}
                        </span>
                      </div>
                      {!isDone && (
                        <button
                          onClick={() => copyToTerminal(st.exampleCommand)}
                          className="flex items-center gap-1 text-[11px] font-mono text-primary hover:underline ml-2 shrink-0"
                          title="Click to paste into terminal"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Paste</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {completed && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-between">
                  <div className="text-xs">
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                      Scenario Complete!
                    </p>
                    <p className="text-muted-foreground">You mastered this Git open-source step.</p>
                  </div>
                  <Button
                    size="sm"
                    disabled={scenarioId === scenarios.length}
                    onClick={() => setScenarioId((s) => Math.min(scenarios.length, s + 1))}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Next Scenario <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Interactive Tabs for Live Feedback & Repo State */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col min-h-0"
          >
            <TabsList className="grid grid-cols-3 w-full shrink-0">
              <TabsTrigger value="inspector" className="text-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Command Inspector</span>
              </TabsTrigger>
              <TabsTrigger value="state" className="text-xs flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5" />
                <span>Live Repo State</span>
              </TabsTrigger>
              <TabsTrigger value="cheatsheet" className="text-xs flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>All Commands Brief</span>
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: Real-time Command Explainer & Feedback */}
            <TabsContent value="inspector" className="flex-1 overflow-y-auto mt-2 space-y-3 pr-1">
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
                      <CardContent className="p-4 pt-2 space-y-3">
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

                        {/* What the command does */}
                        <div>
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                            What does this command do?
                          </h4>
                          <p className="text-xs md:text-sm font-medium text-foreground leading-relaxed">
                            {latestAnalysis.summary}
                          </p>
                        </div>

                        {/* Breakdown of arguments & flags */}
                        {latestAnalysis.details && latestAnalysis.details.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                              Flag & Argument Breakdown:
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
                        Type any Git command in the terminal on the left. The inspector will tell you if the syntax is valid, what the code does, and what happens on real GitHub!
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

              {/* Hints Box */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" /> Hints ({hintLevel}/{scenario.hints.length})
                  </span>
                  {hintLevel < scenario.hints.length && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setHintLevel((h) => h + 1)}
                      className="h-6 text-xs text-primary"
                    >
                      Reveal Hint +
                    </Button>
                  )}
                </div>
                {scenario.hints.slice(0, hintLevel).map((hint, i) => (
                  <div
                    key={i}
                    className="text-xs text-foreground/90 p-2.5 bg-muted/60 border rounded-md mb-2 font-mono"
                  >
                    💡 {hint}
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* TAB 2: Live Repo Graph & State */}
            <TabsContent value="state" className="flex-1 overflow-y-auto mt-2 pr-1">
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

            {/* TAB 3: All Commands in Brief */}
            <TabsContent value="cheatsheet" className="flex-1 overflow-y-auto mt-2 pr-1 space-y-3">
              {/* Practice Safety Note */}
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Sandbox Practice vs. Real GitHub:</span>
                </div>
                <p className="text-foreground/80 text-[11px] leading-relaxed">
                  Everything you execute here runs inside an isolated in-browser virtual environment. <strong>Nothing will modify your actual personal GitHub repositories, accounts, or computer files.</strong> Use this sandbox freely to practice, make mistakes, and learn!
                </p>
              </div>

              {/* Filter & Search */}
              <div className="space-y-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search all Git commands (e.g. clone, branch, push)..."
                    value={guideSearch}
                    onChange={(e) => setGuideSearch(e.target.value)}
                    className="w-full bg-muted/40 border border-border/80 rounded-md pl-8 pr-3 py-1.5 text-xs outline-none focus:border-primary"
                  />
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-1">
                  {["All", "Setup", "Repository", "Branching", "Committing", "Publishing", "Syncing", "Undo"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setGuideCategory(cat)}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-colors ${
                        guideCategory === cat
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted/40 text-muted-foreground hover:text-foreground border-border/50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Command List Cards */}
              <div className="space-y-2.5">
                {filteredCommands.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-card border border-border/70 hover:border-border transition-colors space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Badge variant="outline" className="text-[10px] py-0 px-1.5 font-normal">
                          {item.category}
                        </Badge>
                        <span className="font-semibold text-foreground">{item.name}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-6 text-[11px] font-mono px-2"
                        onClick={() => copyToTerminal(item.cmd)}
                      >
                        <Copy className="w-3 h-3 mr-1" /> Paste
                      </Button>
                    </div>

                    <div className="p-1.5 rounded bg-muted/60 font-mono text-[11px] text-primary break-all border border-border/40">
                      {item.cmd}
                    </div>

                    <p className="text-foreground/90 text-xs">
                      {item.summary}
                    </p>

                    <div className="text-[10px] text-muted-foreground pt-1 border-t border-border/40 flex items-start gap-1">
                      <span className="font-semibold text-foreground shrink-0">On Real GitHub:</span>
                      <span>{item.realWorldEffect}</span>
                    </div>
                  </div>
                ))}

                {filteredCommands.length === 0 && (
                  <div className="p-6 text-center text-xs text-muted-foreground">
                    No commands matched "{guideSearch}".
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
