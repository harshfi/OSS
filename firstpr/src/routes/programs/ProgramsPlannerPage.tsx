import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Trophy, 
  Calendar, 
  Search, 
  Sparkles, 
  ExternalLink, 
  DollarSign, 
  Users, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  Cpu, 
  BookOpen, 
  Target, 
  X,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Square,
  Lightbulb,
  LayoutGrid,
  CalendarDays
} from "lucide-react";
import { toast } from "sonner";
import { 
  ALL_OSS_PROGRAMS, 
  ACCEPTANCE_PLAYBOOK_STEPS,
  MONTH_PLANS_2026,
  type Program
} from "./programsData";
import { generateAndDownloadIcs } from "./calendarExport";
import { cn } from "@/lib/utils";

type FilterTab = "all" | "paid" | "students" | "anyone" | "ai" | "systems";

const CURRENT_SYSTEM_MONTH = new Date().getMonth();

export default function ProgramsPlannerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  // Month-wise Organized Timeline State
  const currentSystemMonth = CURRENT_SYSTEM_MONTH;
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(2); // Default to March (high-stakes proposals) or current
  const [timelineMode, setTimelineMode] = useState<"deep-dive" | "matrix">("deep-dive");
  const [timelineProgramFilter, setTimelineProgramFilter] = useState<string>("all");
  const [completedChecklist, setCompletedChecklist] = useState<Record<string, boolean>>({});

  const toggleChecklistItem = (key: string) => {
    setCompletedChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const selectedMonthPlan = useMemo(() => {
    return MONTH_PLANS_2026[selectedMonthIndex] || MONTH_PLANS_2026[0];
  }, [selectedMonthIndex]);

  const handlePrevMonth = () => {
    setSelectedMonthIndex(prev => (prev > 0 ? prev - 1 : 11));
  };

  const handleNextMonth = () => {
    setSelectedMonthIndex(prev => (prev < 11 ? prev + 1 : 0));
  };

  const handleJumpToCurrent = () => {
    setSelectedMonthIndex(currentSystemMonth);
    toast.info(`Jumped to ${MONTH_PLANS_2026[currentSystemMonth]?.monthName} (Current Month)`);
  };

  const handleDownloadCalendar = () => {
    generateAndDownloadIcs();
    toast.success("Calendar downloaded! Open 'firstpr-open-source-deadlines-2026.ics' to import into Apple Calendar, Google Calendar, or Outlook.");
  };

  const filteredPrograms = useMemo(() => {
    return ALL_OSS_PROGRAMS.filter((program) => {
      // 1. Text search
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        program.name.toLowerCase().includes(query) ||
        program.shortName.toLowerCase().includes(query) ||
        program.organizer.toLowerCase().includes(query) ||
        program.focusArea.toLowerCase().includes(query) ||
        program.techStack.some((t) => t.toLowerCase().includes(query)) ||
        program.notableOrgs.some((o) => o.toLowerCase().includes(query));

      if (!matchesSearch) return false;

      // 2. Tab filter
      if (activeTab === "paid") return program.stipend.isPaid;
      if (activeTab === "students") return program.eligibility.requiresStudent;
      if (activeTab === "anyone") return !program.eligibility.requiresStudent;
      if (activeTab === "ai") {
        return (
          program.focusArea.toLowerCase().includes("ai") ||
          program.techStack.some((t) => ["pytorch", "transformers", "python"].includes(t.toLowerCase()))
        );
      }
      if (activeTab === "systems") {
        return (
          program.focusArea.toLowerCase().includes("cloud") ||
          program.focusArea.toLowerCase().includes("systems") ||
          program.focusArea.toLowerCase().includes("kernel") ||
          program.techStack.some((t) => ["go", "rust", "c", "c++", "kubernetes"].includes(t.toLowerCase()))
        );
      }
      return true;
    });
  }, [searchQuery, activeTab]);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-card/80 via-background to-background py-12 md:py-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container max-w-6xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-medium mb-4">
            <Trophy className="w-3.5 h-3.5" />
            <span>GLOBAL OPEN SOURCE PROGRAMS • 2026 ROADMAP</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-sans mb-4">
            Open Source Programs <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-cyan-400 bg-clip-text text-transparent">
              & 2026 Season Planner
            </span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Complete intelligence, stipends, eligibility rules, and deadlines for <strong>Google Summer of Code (GSoC)</strong>, <strong>LFX Mentorship</strong>, <strong>Outreachy</strong>, and 15+ premier open-source initiatives worldwide.
          </p>

          {/* Quick Stats Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-8 text-left">
            <div className="p-3.5 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm">
              <div className="text-2xl font-mono font-extrabold text-primary">18</div>
              <div className="text-xs text-muted-foreground mt-0.5">Curated Programs</div>
            </div>
            <div className="p-3.5 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm">
              <div className="text-2xl font-mono font-extrabold text-blue-400">Up to $15k</div>
              <div className="text-xs text-muted-foreground mt-0.5">Paid Stipends & Grants</div>
            </div>
            <div className="p-3.5 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm">
              <div className="text-2xl font-mono font-extrabold text-purple-400">12 Months</div>
              <div className="text-xs text-muted-foreground mt-0.5">Annual Target Roadmap</div>
            </div>
            <div className="p-3.5 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm">
              <div className="text-2xl font-mono font-extrabold text-amber-400">100% Free</div>
              <div className="text-xs text-muted-foreground mt-0.5">Zero Paywalls</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={handleDownloadCalendar}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 px-6 shadow-lg shadow-primary/20 gap-2 text-sm transition-all hover:scale-[1.02]"
            >
              <Download className="w-4 h-4" />
              Download 2026 Deadlines (.ics Calendar)
            </Button>
            <a href="#master-timeline">
              <Button
                variant="outline"
                className="h-11 px-5 border-primary/40 text-primary bg-primary/5 hover:bg-primary/15 gap-2 text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>12-Month Target Timeline</span>
              </Button>
            </a>
            <a href="#all-programs">
              <Button
                variant="outline"
                className="h-11 px-5 border-border hover:bg-muted/60 gap-2 text-sm"
              >
                <Trophy className="w-4 h-4 text-primary" />
                <span>Explore All Programs</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 2. VERIFIED 2026 INTELLIGENCE ALERT */}
      <section className="container max-w-6xl mx-auto px-4 -mt-4 relative z-20">
        <Alert className="border-primary/40 bg-card/90 backdrop-blur-md shadow-xl">
          <AlertCircle className="h-5 w-5 text-primary" />
          <AlertTitle className="text-sm font-bold text-foreground flex items-center gap-2">
            <span>Verified 2026 Program Changes & Policy Updates</span>
            <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary">
              Live Verified
            </Badge>
          </AlertTitle>
          <AlertDescription className="mt-2 text-xs text-muted-foreground grid grid-cols-1 md:grid-cols-3 gap-2.5">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span><strong>Google Summer of Code (GSoC):</strong> Standard 12-week schedule with optional extended timeline up to 22 weeks; Purchasing Power Parity stipends ($750 – $6,000).</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span><strong>LFX Mentorship (Linux Foundation):</strong> 2026 mentee stipend is standardized at $1,300 for India/APAC; up to $3,000 for North America/Western Europe.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span><strong>Outreachy:</strong> $7,000 USD stipend + $500 travel grant across 2 cohorts (May–Aug & Dec–Mar) for underrepresented contributors.</span>
            </div>
          </AlertDescription>
        </Alert>
      </section>

      {/* 5. 2026 ORGANIZED 12-MONTH TARGET TIMELINE */}
      <section id="master-timeline" className="container max-w-6xl mx-auto px-4 pt-16 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/50 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono">
              <Calendar className="w-3.5 h-3.5" />
              <span>ORGANIZED 12-MONTH TARGET TIMELINE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              What to Target Each Month of the Year
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
              Step-by-step roadmap from early January reconnaissance to October Hacktoberfest and December holiday sprints. Plan your year with precision.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Mode Switcher */}
            <div className="inline-flex items-center p-1 rounded-lg bg-muted/80 border border-border/70 text-xs font-mono">
              <button
                onClick={() => setTimelineMode("deep-dive")}
                className={cn(
                  "px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5",
                  timelineMode === "deep-dive"
                    ? "bg-background text-foreground shadow-sm border border-border/60"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <CalendarDays className="w-3.5 h-3.5 text-primary" />
                <span>Month Deep Dive</span>
              </button>
              <button
                onClick={() => setTimelineMode("matrix")}
                className={cn(
                  "px-3 py-1.5 rounded-md font-semibold transition-all flex items-center gap-1.5",
                  timelineMode === "matrix"
                    ? "bg-background text-foreground shadow-sm border border-border/60"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-primary" />
                <span>Full Year Matrix</span>
              </button>
            </div>

            <Button
              size="sm"
              onClick={handleDownloadCalendar}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-9 px-3.5 gap-1.5 text-xs font-mono shadow-md shadow-primary/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export .ics</span>
            </Button>
          </div>
        </div>

        {/* Quick Program Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-mono text-muted-foreground mr-1 flex items-center gap-1 shrink-0">
            <Target className="w-3 h-3 text-primary" />
            <span>Filter Timeline:</span>
          </span>
          {[
            { id: "all", label: "All Programs (12 Months)" },
            { id: "gsoc", label: "Google Summer of Code (GSoC)" },
            { id: "lfx", label: "LFX Mentorship (Linux Foundation)" },
            { id: "outreachy", label: "Outreachy" },
            { id: "beginner", label: "Beginner & Sprints (Hacktoberfest / 24 PRs)" }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setTimelineProgramFilter(filter.id)}
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-mono transition-all whitespace-nowrap shrink-0 border",
                timelineProgramFilter === filter.id
                  ? "bg-primary/20 text-primary border-primary/60 font-bold"
                  : "bg-card/60 border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* 12-Month Interactive Navigation Scrubber Ribbon */}
        <div className="bg-card/70 border border-border/70 rounded-2xl p-2.5 shadow-sm space-y-2">
          <div className="flex items-center justify-between px-2 text-[11px] font-mono text-muted-foreground">
            <span>QUARTERLY TIMELINE TRACK • SELECT ANY MONTH TO INSPECT TARGETS</span>
            <button
              onClick={handleJumpToCurrent}
              className="text-primary hover:text-primary flex items-center gap-1 font-bold transition-colors"
            >
              <span>Current Month ({MONTH_PLANS_2026[currentSystemMonth]?.monthName})</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
            {MONTH_PLANS_2026.map((m) => {
              const isSelected = selectedMonthIndex === m.monthIndex;
              const isCurrent = currentSystemMonth === m.monthIndex;
              
              const matchesFilter = timelineProgramFilter === "all" || (
                timelineProgramFilter === "gsoc" && m.programs.some(p => p.programId === "gsoc") ||
                timelineProgramFilter === "lfx" && m.programs.some(p => p.programId === "lfx") ||
                timelineProgramFilter === "outreachy" && m.programs.some(p => p.programId === "outreachy") ||
                timelineProgramFilter === "beginner" && m.programs.some(p => ["hacktoberfest", "twenty-four-pull-requests", "fossasia-codeheat", "osoc-be"].includes(p.programId))
              );

              return (
                <button
                  key={m.monthIndex}
                  onClick={() => {
                    setSelectedMonthIndex(m.monthIndex);
                    if (timelineMode === "matrix") {
                      setTimelineMode("deep-dive");
                    }
                  }}
                  className={cn(
                    "relative flex flex-col items-center justify-between p-2 rounded-xl border text-center transition-all duration-200 group",
                    isSelected
                      ? "bg-primary/15 border-primary text-foreground ring-2 ring-primary/30 shadow-md shadow-primary/10 scale-[1.03] z-10"
                      : matchesFilter
                      ? "bg-card/80 border-border/80 hover:border-primary/40 hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                      : "bg-card/40 border-border/40 opacity-40 hover:opacity-80 text-muted-foreground"
                  )}
                >
                  {/* Top indicator: Month Number and Quarter */}
                  <div className="w-full flex items-center justify-between text-[10px] font-mono leading-none mb-1">
                    <span className={cn(
                      "font-bold",
                      isSelected ? "text-primary" : "text-muted-foreground"
                    )}>
                      {String(m.monthIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] text-muted-foreground/80">{m.quarter}</span>
                  </div>

                  {/* Month Short Name */}
                  <div className={cn(
                    "text-xs sm:text-sm font-extrabold font-sans tracking-tight",
                    isSelected ? "text-primary" : "text-foreground"
                  )}>
                    {m.shortName}
                  </div>

                  {/* Mini Focus Tag */}
                  <div className="mt-1 w-full truncate text-[9px] font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                    {m.focusTag.split("&")[0].trim().slice(0, 11)}
                  </div>

                  {/* Status Indicator Dot */}
                  {isCurrent && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" title="Current Month" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* View 1: Month-by-Month Deep Dive Command Center */}
        {timelineMode === "deep-dive" && (
          <div className="space-y-4">
            {/* Quick Navigation Controls */}
            <div className="flex items-center justify-between bg-card/40 border border-border/60 rounded-xl p-2.5 px-4 text-xs font-mono">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevMonth}
                className="h-8 gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev Month:</span>
                <span>{MONTH_PLANS_2026[(selectedMonthIndex + 11) % 12]?.shortName}</span>
              </Button>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs font-mono border-primary/40 text-primary bg-primary/10">
                  Month {String(selectedMonthPlan.monthIndex + 1).padStart(2, "0")} of 12 • {selectedMonthPlan.monthName} 2026
                </Badge>
                {selectedMonthPlan.monthIndex === currentSystemMonth && (
                  <Badge className="bg-primary text-black text-[10px] font-mono font-bold">
                    Now
                  </Badge>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleNextMonth}
                className="h-8 gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <span className="hidden sm:inline">Next Month:</span>
                <span>{MONTH_PLANS_2026[(selectedMonthIndex + 1) % 12]?.shortName}</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Main Command Card for Selected Month */}
            <Card className="border-2 border-primary/40 bg-gradient-to-b from-primary/5 via-card to-card shadow-xl overflow-hidden">
              <CardHeader className="border-b border-border/60 pb-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-xs border-primary/30 text-primary bg-primary/10">
                      {selectedMonthPlan.quarter} Phase
                    </Badge>
                    <Badge
                      className={cn(
                        "text-xs font-mono",
                        selectedMonthPlan.phaseType === "proposals" && "bg-amber-500/20 text-amber-300 border-amber-500/40",
                        selectedMonthPlan.phaseType === "recon" && "bg-blue-500/20 text-blue-300 border-blue-500/40",
                        selectedMonthPlan.phaseType === "coding" && "bg-primary text-black font-bold",
                        selectedMonthPlan.phaseType === "midterms" && "bg-purple-500/20 text-purple-300 border-purple-500/40",
                        selectedMonthPlan.phaseType === "celebration" && "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                      )}
                    >
                      {selectedMonthPlan.focusTag}
                    </Badge>
                  </div>

                  <span className="text-xs font-mono text-muted-foreground">
                    Season Timeline: {selectedMonthPlan.monthName} 2026
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                    {selectedMonthPlan.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1.5 max-w-3xl">
                    {selectedMonthPlan.summary}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left 2 Columns: Deadlines, Targets & Checklist */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Active Programs & Deadlines */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          <span>Active Program Windows & Deadlines in {selectedMonthPlan.monthName}</span>
                        </h4>
                        <span className="text-[11px] font-mono text-muted-foreground">
                          {selectedMonthPlan.programs.length} Events Mapped
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedMonthPlan.programs.map((prog, idx) => (
                          <div
                            key={idx}
                            className={cn(
                              "p-3.5 rounded-xl border bg-background/80 flex flex-col justify-between space-y-2.5 transition-all hover:border-primary/40",
                              prog.isUrgent && "border-amber-500/40 bg-amber-500/5",
                              prog.isEuropean && "border-blue-500/40 bg-blue-500/5"
                            )}
                          >
                            <div className="flex items-start justify-between gap-1.5">
                              <div>
                                <div className="flex items-center gap-1">
                                  <span className="font-bold text-xs text-foreground">
                                    {prog.name}
                                  </span>
                                  {prog.isEuropean && (
                                    <span className="text-xs" title="European Flagship">🇪🇺</span>
                                  )}
                                </div>
                                <span className="text-[11px] font-mono text-muted-foreground">
                                  {prog.dateRange}
                                </span>
                              </div>

                              <Badge
                                variant={prog.isUrgent ? "destructive" : "outline"}
                                className={cn(
                                  "text-[9px] font-mono shrink-0 py-0.5",
                                  prog.isUrgent && "animate-pulse"
                                )}
                              >
                                {prog.badge}
                              </Badge>
                            </div>

                            {prog.actionUrl && (
                              <div className="pt-1 border-t border-border/40">
                                {prog.actionUrl.startsWith("http") ? (
                                  <a
                                    href={prog.actionUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[11px] font-mono text-primary hover:text-primary flex items-center gap-1 font-semibold"
                                  >
                                    <span>{prog.actionText || "Learn More"}</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                ) : (
                                  <Link
                                    to={prog.actionUrl}
                                    className="text-[11px] font-mono text-primary hover:text-primary flex items-center gap-1 font-semibold"
                                  >
                                    <span>{prog.actionText || "View Details"}</span>
                                    <ArrowRight className="w-3 h-3" />
                                  </Link>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contributor Action Targets */}
                    <div className="space-y-3 p-4 rounded-xl bg-muted/40 border border-border/60">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-primary" />
                        <span>Core Contributor Targets for {selectedMonthPlan.monthName}</span>
                      </h4>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        {selectedMonthPlan.targets.map((target, idx) => (
                          <li key={idx} className="flex items-start gap-2 leading-relaxed">
                            <span className="text-primary font-mono font-bold shrink-0 mt-0.5">
                              0{idx + 1}.
                            </span>
                            <span>{target}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Interactive Execution Checklist */}
                    <div className="space-y-3 p-4 rounded-xl border border-primary/30 bg-card/80">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                          <span>Actionable Checklist ({selectedMonthPlan.monthName})</span>
                        </h4>
                        <span className="text-[11px] font-mono text-primary font-bold">
                          {selectedMonthPlan.checklist.filter((_, i) => completedChecklist[`${selectedMonthPlan.monthIndex}-${i}`]).length} / {selectedMonthPlan.checklist.length} Completed
                        </span>
                      </div>

                      <div className="space-y-2">
                        {selectedMonthPlan.checklist.map((item, idx) => {
                          const itemKey = `${selectedMonthPlan.monthIndex}-${idx}`;
                          const isDone = !!completedChecklist[itemKey];

                          return (
                            <button
                              key={idx}
                              onClick={() => toggleChecklistItem(itemKey)}
                              className={cn(
                                "w-full text-left p-2.5 rounded-lg border text-xs flex items-start gap-2.5 transition-all",
                                isDone
                                  ? "bg-primary/10 border-primary/40 text-foreground"
                                  : "bg-background/80 border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
                              )}
                            >
                              {isDone ? (
                                <CheckSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              ) : (
                                <Square className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                              )}
                              <span className={cn(isDone && "line-through text-muted-foreground")}>
                                {item}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Right Sidebar Column: Pro-Tip, Course Link & Calendar Sync */}
                  <div className="space-y-4">
                    {/* Senior Maintainer Pro-Tip */}
                    <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/5 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold">
                        <Lightbulb className="w-4 h-4" />
                        <span>SENIOR MAINTAINER PRO-TIP</span>
                      </div>
                      <p className="text-xs text-foreground leading-relaxed italic">
                        "{selectedMonthPlan.proTip.advice}"
                      </p>
                      <div className="pt-2 border-t border-amber-500/20 text-[11px] font-mono">
                        <div className="font-bold text-foreground">{selectedMonthPlan.proTip.author}</div>
                        <div className="text-muted-foreground">{selectedMonthPlan.proTip.role}</div>
                      </div>
                    </div>

                    {/* Recommended FirstPR Course Action */}
                    <div className="p-4 rounded-xl border border-primary/40 bg-primary/5 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono text-primary font-bold">
                        <Sparkles className="w-4 h-4" />
                        <span>FIRSTPR RECOMMENDED MODULE</span>
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-foreground">
                          {selectedMonthPlan.firstPrAction.title}
                        </h5>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                          {selectedMonthPlan.firstPrAction.description}
                        </p>
                      </div>
                      <Link to={selectedMonthPlan.firstPrAction.link}>
                        <Button
                          size="sm"
                          className="w-full text-xs font-mono bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-8 mt-1 gap-1"
                        >
                          <span>{selectedMonthPlan.firstPrAction.linkText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>

                    {/* Quick Calendar Sync Box */}
                    <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-2.5 text-xs">
                      <div className="flex items-center gap-2 font-mono font-bold text-foreground">
                        <Download className="w-3.5 h-3.5 text-blue-400" />
                        <span>Export 2026 Deadlines</span>
                      </div>
                      <p className="text-muted-foreground text-[11px] leading-relaxed">
                        Never miss cutoffs for GSoC, ESoC, LFX, or Outreachy. Synchronize all dates directly with Apple or Google Calendar.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownloadCalendar}
                        className="w-full text-xs font-mono h-8 border-border gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>Download .ics Calendar</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* View 2: Full Year 12-Month Matrix View */}
        {timelineMode === "matrix" && (
          <div className="space-y-6">
            {(["Q1", "Q2", "Q3", "Q4"] as const).map((quarterName) => {
              const quarterMonths = MONTH_PLANS_2026.filter((m) => m.quarter === quarterName);

              return (
                <div key={quarterName} className="space-y-3">
                  <div className="p-3 rounded-xl bg-muted/60 border border-border/70 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-extrabold text-foreground">
                        {quarterName} 2026
                      </span>
                      <span className="text-xs text-muted-foreground hidden sm:inline">
                        {quarterName === "Q1" && "• Early Reconnaissance & Proposal Submissions"}
                        {quarterName === "Q2" && "• Selection Results, Community Bonding & Summer Kickoff"}
                        {quarterName === "Q3" && "• Midterm Evaluations & Final Code Delivery"}
                        {quarterName === "Q4" && "• Hacktoberfest Worldwide, KDE & Year-End Sprints"}
                      </span>
                    </div>

                    <Badge variant="outline" className="text-xs font-mono border-primary/30 text-primary">
                      3 Months (3 Phases)
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quarterMonths.map((m) => (
                      <Card
                        key={m.monthIndex}
                        className={cn(
                          "flex flex-col justify-between border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5",
                          m.monthIndex === selectedMonthIndex
                            ? "border-primary bg-primary/5 ring-1 ring-primary/80"
                            : "border-border/70 bg-card/60"
                        )}
                      >
                        <CardHeader className="pb-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-primary">
                              Month {String(m.monthIndex + 1).padStart(2, "0")} • {m.monthName}
                            </span>
                            <Badge variant="outline" className="text-[10px] font-mono py-0">
                              {m.focusTag.split("&")[0].trim()}
                            </Badge>
                          </div>
                          <CardTitle className="text-sm font-bold leading-snug">
                            {m.headline}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="pt-0 space-y-3 flex-1 flex flex-col justify-between">
                          <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                            {m.summary}
                          </p>

                          <div className="space-y-1.5 p-2.5 rounded-lg bg-muted/40 border border-border/40 text-[11px] font-mono">
                            <div className="text-muted-foreground font-semibold">Active Programs:</div>
                            <div className="flex flex-wrap gap-1">
                              {m.programs.map((prog, pi) => (
                                <span
                                  key={pi}
                                  className={cn(
                                    "px-1.5 py-0.5 rounded text-[10px]",
                                    prog.isUrgent ? "bg-amber-500/20 text-amber-300" : "bg-card border border-border/60 text-muted-foreground"
                                  )}
                                >
                                  {prog.name}
                                </span>
                              ))}
                            </div>
                          </div>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedMonthIndex(m.monthIndex);
                              setTimelineMode("deep-dive");
                            }}
                            className="w-full text-xs font-mono h-8 border-border hover:bg-muted/70 gap-1.5"
                          >
                            <CalendarDays className="w-3.5 h-3.5 text-primary" />
                            <span>Open Month Plan & Checklist</span>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 3. MASTER INTERACTIVE PROGRAMS EXPLORER */}
      <section id="all-programs" className="container max-w-6xl mx-auto px-4 pt-12 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Explore All Open Source Programs
              </h2>
              <Badge variant="outline" className="font-mono text-xs border-primary/30 text-primary">
                {filteredPrograms.length} of {ALL_OSS_PROGRAMS.length}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Filter by stipend, eligibility, European scope, or specific technical domain.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search programs, tech (e.g. AI, Rust)..."
              className="pl-9 h-10 text-xs bg-card/80 border-border/80"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: "all", label: "All Programs", count: ALL_OSS_PROGRAMS.length },
            { id: "paid", label: "💰 Paid Stipends", count: ALL_OSS_PROGRAMS.filter((p) => p.stipend.isPaid).length },
            { id: "students", label: "🎓 Students Only", count: ALL_OSS_PROGRAMS.filter((p) => p.eligibility.requiresStudent).length },
            { id: "anyone", label: "🌍 Open to Anyone (No Degree)", count: ALL_OSS_PROGRAMS.filter((p) => !p.eligibility.requiresStudent).length },
            { id: "ai", label: "🤖 AI & Machine Learning", count: 4 },
            { id: "systems", label: "☁️ Cloud Native & Systems", count: 5 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as FilterTab)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 border",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground border-primary font-bold shadow-sm shadow-primary/20"
                  : "bg-card border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              <span>{tab.label}</span>
              <span className={cn(
                "text-[10px] px-1.5 py-0.2 rounded-full",
                activeTab === tab.id ? "bg-black/20 text-black" : "bg-muted text-muted-foreground"
              )}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {filteredPrograms.map((program) => (
            <Card
              key={program.id}
              className={cn(
                "relative flex flex-col justify-between border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5",
                program.featured
                  ? "border-primary/40 bg-gradient-to-b from-primary/5 via-card to-card"
                  : "border-border/70 bg-card/60"
              )}
            >
              <CardHeader className="pb-3 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-bold text-foreground">
                        {program.shortName}
                      </span>
                      {program.isEuropean && (
                        <span className="text-xs" title="European Initiative">🇪🇺</span>
                      )}
                    </div>
                    <CardTitle className="text-base font-bold leading-tight mt-0.5">
                      {program.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">{program.organizer}</p>
                  </div>

                  <Badge
                    variant={program.status === "Active" ? "default" : program.status === "Upcoming" ? "secondary" : "outline"}
                    className={cn(
                      "text-[10px] font-mono shrink-0",
                      program.status === "Active" && "bg-primary text-black hover:bg-primary/90",
                      program.status === "Upcoming" && "bg-blue-500/15 border-blue-500/30 text-blue-300"
                    )}
                  >
                    {program.status}
                  </Badge>
                </div>

                <Badge variant="outline" className="text-[10px] font-mono py-0 self-start border-border/60">
                  {program.category} • {program.focusArea.split(",")[0]}
                </Badge>
              </CardHeader>

              <CardContent className="pt-0 space-y-3 flex-1 flex flex-col justify-between">
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {program.description}
                </p>

                {/* Key Metrics Chips */}
                <div className="space-y-1.5 p-3 rounded-lg bg-muted/40 border border-border/40 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                      <DollarSign className="w-3 h-3 text-primary" />
                      Stipend:
                    </span>
                    <span className="font-mono font-bold text-foreground text-[11px]">
                      {program.stipend.amount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                      <Users className="w-3 h-3 text-blue-400" />
                      Eligibility:
                    </span>
                    <span className="text-[11px] truncate max-w-[170px] text-right font-medium">
                      {program.eligibility.requiresStudent ? "Students Only" : "Anyone / Open"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3 text-purple-400" />
                      Window:
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {program.timeline.window}
                    </span>
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1">
                  {program.techStack.slice(0, 4).map((tech, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-background border border-border/60 text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                  {program.techStack.length > 4 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-muted-foreground">
                      +{program.techStack.length - 4}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2 border-t border-border/40">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedProgram(program)}
                    className="w-full text-xs font-mono h-8 border-border hover:bg-muted/70 gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-primary" />
                    <span>Deep Dive & Tips</span>
                  </Button>
                  <a
                    href={program.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0"
                    title={`Visit ${program.shortName} official website`}
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-12 border border-dashed rounded-xl space-y-3">
            <Search className="w-8 h-8 text-muted-foreground mx-auto opacity-50" />
            <h3 className="text-base font-bold text-foreground">No programs match your search</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Try adjusting your search keywords or resetting the filter pill to "All Programs".
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
              }}
              className="text-xs font-mono"
            >
              Reset All Filters
            </Button>
          </div>
        )}
      </section>



      {/* 6. 5-STEP OPEN SOURCE ACCEPTANCE PLAYBOOK */}
      <section className="container max-w-6xl mx-auto px-4 pt-16 space-y-6">
        <div className="border-b border-border/50 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-2">
            <Target className="w-3.5 h-3.5" />
            <span>SENIOR CONTRIBUTOR METHODOLOGY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            The 5-Step Acceptance Strategy Playbook
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            How competitive applicants stand out, win maintainer trust, and secure acceptance across ESoC, GSoC, and LFX.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {ACCEPTANCE_PLAYBOOK_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-border/70 bg-card/60 flex flex-col justify-between space-y-3 hover:border-primary/40 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-primary/80">
                    {step.step}
                  </span>
                  <Badge variant="outline" className="text-[9px] font-mono border-border/60">
                    Phase {idx + 1}
                  </Badge>
                </div>
                <h4 className="font-bold text-sm text-foreground leading-snug">
                  {step.title}
                </h4>
                <p className="text-[11px] text-primary/90 dark:text-primary font-medium">
                  {step.subtitle}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                  {step.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-border/40">
                <Link
                  to={step.firstPrLink}
                  className="text-xs font-mono text-primary hover:text-primary flex items-center gap-1 font-semibold"
                >
                  <span>{step.firstPrLinkText}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. PROGRAM DETAIL MODAL */}
      <AnimatePresence>
        {selectedProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card text-card-foreground border-2 border-border/80 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-2xl space-y-6 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProgram(null)}
                className="absolute top-5 right-5 text-muted-foreground hover:text-foreground h-8 w-8 rounded-full bg-muted flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="space-y-1.5 pr-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="font-mono text-xs border-primary/40 text-primary">
                    {selectedProgram.category}
                  </Badge>
                  {selectedProgram.isEuropean && (
                    <Badge variant="outline" className="font-mono text-xs border-blue-500/40 text-blue-400">
                      🇪🇺 European Focus
                    </Badge>
                  )}
                  <Badge variant="secondary" className="font-mono text-xs">
                    {selectedProgram.status}
                  </Badge>
                </div>
                <h3 className="text-2xl font-extrabold text-foreground">
                  {selectedProgram.name} ({selectedProgram.shortName})
                </h3>
                <p className="text-xs text-muted-foreground">
                  Organized by <strong>{selectedProgram.organizer}</strong> • Focus: {selectedProgram.focusArea}
                </p>
              </div>

              {/* Key Specs Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-muted/40 border border-border text-xs">
                <div>
                  <span className="text-muted-foreground block text-[11px]">Stipend & Payout</span>
                  <strong className="text-foreground text-sm font-mono">{selectedProgram.stipend.amount}</strong>
                  <span className="text-[10px] text-muted-foreground block">{selectedProgram.stipend.details}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Eligibility Target</span>
                  <strong className="text-foreground text-xs block mt-0.5">{selectedProgram.eligibility.target}</strong>
                  <span className="text-[10px] text-muted-foreground block">
                    {selectedProgram.eligibility.requiresStudent ? "Student proof required" : "No student status required"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Timeline & Window</span>
                  <strong className="text-foreground text-xs block mt-0.5">{selectedProgram.timeline.window}</strong>
                  <span className="text-[10px] text-muted-foreground block">{selectedProgram.timeline.codingPeriod}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                  Program Overview
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {selectedProgram.description}
                </p>
              </div>

              {/* Selection Tips */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Insider Selection Tips (How to Get Selected)</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-foreground/90">
                  {selectedProgram.selectionTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-primary/5 p-2 rounded-lg border border-primary/15">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Notable Orgs & Tech Stack */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg border border-border/60 bg-card/40 space-y-1.5">
                  <span className="font-mono text-[11px] text-muted-foreground font-bold uppercase">
                    Notable Repositories & Host Orgs:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedProgram.notableOrgs.map((org, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-muted text-foreground">
                        {org}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-border/60 bg-card/40 space-y-1.5">
                  <span className="font-mono text-[11px] text-muted-foreground font-bold uppercase">
                    Dominant Tech Stack:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedProgram.techStack.map((tech, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-muted font-mono text-primary">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* FirstPR Prep Guide Recommendation */}
              <div className="p-3 rounded-xl border border-primary/30 bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-primary dark:text-primary font-medium">
                  <Cpu className="w-4 h-4 text-primary dark:text-primary shrink-0" />
                  <span>
                    <strong>Prepare on FirstPR: </strong>
                    Complete the guided learn curriculum and practice terminal workflow before submitting proposals.
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link to="/learn" onClick={() => setSelectedProgram(null)}>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-8 px-3">
                      Learn Course
                    </Button>
                  </Link>
                  <Link to="/workflow" onClick={() => setSelectedProgram(null)}>
                    <Button size="sm" variant="outline" className="text-xs h-8 px-3">
                      Workflow
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Footer Links */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border/60">
                <a
                  href={selectedProgram.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button className="w-full sm:w-auto bg-primary text-primary-foreground font-semibold text-xs h-9 px-4 gap-1.5">
                    <span>Visit {selectedProgram.shortName} Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedProgram(null)}
                  className="w-full sm:w-auto text-xs h-9"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
