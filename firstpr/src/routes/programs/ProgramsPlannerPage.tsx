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
  Globe, 
  Cpu, 
  BookOpen, 
  Target, 
  X,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { 
  ALL_OSS_PROGRAMS, 
  EUROPEAN_SUMMER_OF_CODE_SPOTLIGHT, 
  MASTER_TIMELINE_2026, 
  ACCEPTANCE_PLAYBOOK_STEPS,
  type Program 
} from "./programsData";
import { generateAndDownloadIcs } from "./calendarExport";
import { cn } from "@/lib/utils";

type FilterTab = "all" | "european" | "paid" | "students" | "anyone" | "ai" | "systems";

export default function ProgramsPlannerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

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
      if (activeTab === "european") return program.isEuropean;
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
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container max-w-6xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium mb-4">
            <Trophy className="w-3.5 h-3.5" />
            <span>GLOBAL & EUROPEAN OPEN SOURCE PROGRAMS • 2026 ROADMAP</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-sans mb-4">
            Open Source Programs <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              & 2026 Season Planner
            </span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Complete intelligence, stipends, eligibility rules, and deadlines for <strong>European Summer of Code (ESoC)</strong>, <strong>Google Summer of Code (GSoC)</strong>, <strong>LFX Mentorship</strong>, <strong>Outreachy</strong>, and 14+ premier open-source initiatives.
          </p>

          {/* Quick Stats Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-8 text-left">
            <div className="p-3.5 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm">
              <div className="text-2xl font-mono font-extrabold text-emerald-400">18</div>
              <div className="text-xs text-muted-foreground mt-0.5">Curated Programs</div>
            </div>
            <div className="p-3.5 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm">
              <div className="text-2xl font-mono font-extrabold text-blue-400">Up to $15k</div>
              <div className="text-xs text-muted-foreground mt-0.5">Paid Stipends & Grants</div>
            </div>
            <div className="p-3.5 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm">
              <div className="text-2xl font-mono font-extrabold text-purple-400">🇪🇺 ESoC & EU</div>
              <div className="text-xs text-muted-foreground mt-0.5">Applied AI Flagship</div>
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
              className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold h-11 px-6 shadow-lg shadow-emerald-500/20 gap-2 text-sm transition-all hover:scale-[1.02]"
            >
              <Download className="w-4 h-4" />
              Download 2026 Deadlines (.ics Calendar)
            </Button>
            <a href="#esoc-spotlight">
              <Button
                variant="outline"
                className="h-11 px-5 border-blue-500/40 text-blue-400 bg-blue-500/5 hover:bg-blue-500/15 gap-2 text-sm"
              >
                <span>🇪🇺 Explore European Summer of Code</span>
              </Button>
            </a>
            <a href="#master-timeline">
              <Button
                variant="outline"
                className="h-11 px-5 border-border hover:bg-muted/60 gap-2 text-sm"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>2026 Season Timeline</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 2. VERIFIED 2026 INTELLIGENCE ALERT */}
      <section className="container max-w-6xl mx-auto px-4 -mt-4 relative z-20">
        <Alert className="border-emerald-500/40 bg-card/90 backdrop-blur-md shadow-xl">
          <AlertCircle className="h-5 w-5 text-emerald-400" />
          <AlertTitle className="text-sm font-bold text-foreground flex items-center gap-2">
            <span>Verified 2026 Program Changes & Policy Updates</span>
            <Badge variant="outline" className="text-[10px] font-mono border-emerald-500/30 text-emerald-400">
              Live Verified
            </Badge>
          </AlertTitle>
          <AlertDescription className="mt-2 text-xs text-muted-foreground grid grid-cols-1 md:grid-cols-2 gap-2.5">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>European Summer of Code (ESoC):</strong> Dedicated applied AI tracks with pan-European regional hubs (France, Germany, Italy) providing paid developer stipends.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>LFX Mentorship (Linux Foundation):</strong> 2026 mentee stipend is standardized at $1,300 for India/APAC; up to $3,000 for North America/Western Europe.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Google Summer of Code (GSoC):</strong> Standard 12-week schedule with optional extended timeline up to 22 weeks; Purchasing Power Parity stipends ($750 – $6,000).</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Outreachy:</strong> $7,000 USD stipend + $500 travel grant across 2 cohorts (May–Aug & Dec–Mar) for underrepresented contributors.</span>
            </div>
          </AlertDescription>
        </Alert>
      </section>

      {/* 3. EUROPEAN SUMMER OF CODE (ESoC) SPOTLIGHT SECTION */}
      <section id="esoc-spotlight" className="container max-w-6xl mx-auto px-4 pt-12">
        <div className="rounded-2xl border-2 border-blue-500/40 bg-gradient-to-br from-blue-500/10 via-card to-card p-6 md:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <Globe className="w-40 h-40 text-blue-400" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-mono font-bold mb-3">
                  <span>{EUROPEAN_SUMMER_OF_CODE_SPOTLIGHT.badge}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                  {EUROPEAN_SUMMER_OF_CODE_SPOTLIGHT.name}
                </h2>
                <p className="text-sm md:text-base text-blue-200/90 mt-1">
                  {EUROPEAN_SUMMER_OF_CODE_SPOTLIGHT.heroTagline}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <Button
                  onClick={() => {
                    const esocProg = ALL_OSS_PROGRAMS.find((p) => p.id === "esoc");
                    if (esocProg) setSelectedProgram(esocProg);
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs h-10 px-4 shadow-md shadow-blue-500/20 gap-1.5"
                >
                  <span>ESoC Deep-Dive Strategy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
                <a
                  href={EUROPEAN_SUMMER_OF_CODE_SPOTLIGHT.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="border-blue-500/40 text-blue-300 hover:bg-blue-500/10 text-xs h-10 px-3.5 gap-1.5"
                  >
                    <span>Visit esoc.dev</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </a>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-4xl">
              {EUROPEAN_SUMMER_OF_CODE_SPOTLIGHT.description}
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
              {EUROPEAN_SUMMER_OF_CODE_SPOTLIGHT.keyDifferentiators.map((diff, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 space-y-1.5">
                  <div className="text-blue-400 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    <span>{diff.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {diff.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Application Walkthrough Banner */}
            <div className="p-4 rounded-xl border border-border bg-card/60 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>5-Step ESoC Application Protocol:</span>
                </span>
                <div className="flex flex-wrap items-center gap-2 text-muted-foreground pt-1">
                  {EUROPEAN_SUMMER_OF_CODE_SPOTLIGHT.applicationSteps.map((step, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 bg-muted/60 px-2.5 py-1 rounded-md text-[11px] font-mono">
                      <span className="text-blue-400 font-bold">{i + 1}.</span>
                      <span>{step}</span>
                      {i < EUROPEAN_SUMMER_OF_CODE_SPOTLIGHT.applicationSteps.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-muted-foreground/40 ml-1 hidden sm:inline" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MASTER INTERACTIVE PROGRAMS EXPLORER */}
      <section className="container max-w-6xl mx-auto px-4 pt-12 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Explore All Open Source Programs
              </h2>
              <Badge variant="outline" className="font-mono text-xs border-emerald-500/30 text-emerald-400">
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
            { id: "european", label: "🇪🇺 European Programs", count: ALL_OSS_PROGRAMS.filter((p) => p.isEuropean).length },
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
                  ? "bg-emerald-500 text-black border-emerald-400 font-bold shadow-sm shadow-emerald-500/20"
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
                program.id === "esoc"
                  ? "border-blue-500/50 bg-gradient-to-b from-blue-500/10 via-card to-card"
                  : program.featured
                  ? "border-emerald-500/40 bg-gradient-to-b from-emerald-500/5 via-card to-card"
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
                      program.status === "Active" && "bg-emerald-500 text-black hover:bg-emerald-600",
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
                      <DollarSign className="w-3 h-3 text-emerald-400" />
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
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
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

      {/* 5. 2026 MASTER TIMELINE ROADMAP */}
      <section id="master-timeline" className="container max-w-6xl mx-auto px-4 pt-16 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/50 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>CHRONOLOGICAL ROADMAP</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              2026 Open Source Calendar & Critical Milestones
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Month-by-month roadmap of organization announcements, proposal deadlines, and coding phases.
            </p>
          </div>

          <Button
            size="sm"
            onClick={handleDownloadCalendar}
            className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold h-9 px-4 gap-2 text-xs font-mono shrink-0 shadow-md shadow-emerald-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export .ics Calendar</span>
          </Button>
        </div>

        {/* Timeline Grid: 4 Quarters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(["Q1 2026", "Q2 2026", "Q3 2026", "Q4 2026"] as const).map((quarter) => {
            const quarterMilestones = MASTER_TIMELINE_2026.filter((m) => m.quarter === quarter);

            return (
              <div key={quarter} className="space-y-3">
                <div className="p-2.5 rounded-lg bg-muted/60 border border-border/60 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-foreground">{quarter}</span>
                  <Badge variant="outline" className="text-[10px] font-mono border-emerald-500/30 text-emerald-400">
                    {quarterMilestones.length} Milestones
                  </Badge>
                </div>

                <div className="space-y-3">
                  {quarterMilestones.map((milestone, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "p-4 rounded-xl border bg-card/80 space-y-2 relative transition-all duration-200 hover:border-emerald-500/40",
                        milestone.badgeVariant === "urgent" && "border-amber-500/40 bg-amber-500/5 shadow-sm shadow-amber-500/10",
                        milestone.badgeVariant === "active" && "border-emerald-500/40 bg-emerald-500/5"
                      )}
                    >
                      <div className="flex items-center justify-between gap-1 text-[11px]">
                        <span className="font-mono font-bold text-foreground">{milestone.month}</span>
                        <Badge
                          variant={milestone.badgeVariant === "urgent" ? "destructive" : "outline"}
                          className={cn(
                            "text-[9px] font-mono py-0",
                            milestone.badgeVariant === "active" && "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
                            milestone.badgeVariant === "urgent" && "animate-pulse"
                          )}
                        >
                          {milestone.badge}
                        </Badge>
                      </div>

                      <h4 className="font-bold text-xs text-foreground leading-snug">
                        {milestone.title}
                      </h4>

                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {milestone.description}
                      </p>

                      {milestone.actionUrl && (
                        <div className="pt-1">
                          {milestone.actionUrl.startsWith("http") ? (
                            <a
                              href={milestone.actionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] font-mono text-emerald-400 hover:underline flex items-center gap-1"
                            >
                              <span>{milestone.actionText}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <Link
                              to={milestone.actionUrl}
                              className="text-[11px] font-mono text-emerald-400 hover:underline flex items-center gap-1"
                            >
                              <span>{milestone.actionText}</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
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
              className="p-4 rounded-xl border border-border/70 bg-card/60 flex flex-col justify-between space-y-3 hover:border-emerald-500/40 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-emerald-400/80">
                    {step.step}
                  </span>
                  <Badge variant="outline" className="text-[9px] font-mono border-border/60">
                    Phase {idx + 1}
                  </Badge>
                </div>
                <h4 className="font-bold text-sm text-foreground leading-snug">
                  {step.title}
                </h4>
                <p className="text-[11px] text-emerald-500 dark:text-emerald-400 font-medium">
                  {step.subtitle}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                  {step.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-border/40">
                <Link
                  to={step.firstPrLink}
                  className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
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
                  <Badge variant="outline" className="font-mono text-xs border-emerald-500/40 text-emerald-400">
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
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Insider Selection Tips (How to Get Selected)</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-foreground/90">
                  {selectedProgram.selectionTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/15">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
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
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-muted font-mono text-emerald-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* FirstPR Prep Guide Recommendation */}
              <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-medium">
                  <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>
                    <strong>Prepare on FirstPR: </strong>
                    Complete the guided learn curriculum and practice terminal workflow before submitting proposals.
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link to="/learn" onClick={() => setSelectedProgram(null)}>
                    <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-black text-xs h-8 px-3">
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
