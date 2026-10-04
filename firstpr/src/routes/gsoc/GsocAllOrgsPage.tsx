import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  CURATED_GSOC_ORGS, 
  GSOC_ANALYTICS
} from "./gsoc-data";
import { 
  ArrowLeft, 
  Search, 
  ExternalLink, 
  MessageSquare, 
  GitFork, 
  Star, 
  Info, 
  BarChart3, 
  Building2, 
  TrendingUp, 
  Target, 
  Activity, 
  Compass
} from "lucide-react";

export default function GsocAllOrgsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const maxSlots = 50;

  const filteredOrgs = useMemo(() => {
    return CURATED_GSOC_ORGS.filter(org => {
      const matchesCategory = activeCategory === "all" || org.category === activeCategory;
      const matchesDifficulty = selectedDifficulty === "all" || org.difficulty === selectedDifficulty;
      const matchesSearch = 
        org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [activeCategory, selectedDifficulty, searchQuery]);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-emerald-500/10 via-teal-600/5 to-transparent blur-[140px] -z-10 pointer-events-none" />

      {/* Top Header with Back Navigation */}
      <header className="border-b border-border/70 bg-card/40 backdrop-blur-md sticky top-0 z-30">
        <div className="container mx-auto px-4 max-w-7xl py-3 flex items-center justify-between">
          <Link 
            to="/gsoc" 
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-muted-foreground hover:text-emerald-400 transition-colors py-1.5 px-3 rounded-lg border border-border/60 bg-background/80 hover:bg-card"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to GSoC Guide</span>
          </Link>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-[10px] text-emerald-400 border-emerald-500/30">
              25 Top Organizations Tracked
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-7xl pt-10">
        {/* Hero Title Section */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5" />
            Master Contributor Directory & Intelligence
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight text-foreground mb-4">
            Top 25 Best GSoC Organizations
          </h1>

          <p className="text-muted-foreground text-base md:text-lg max-w-3xl leading-relaxed">
            Historical slot allocations, technology distributions, competition metrics, and maintainer guidance for Google Summer of Code's most dependable perennial organizations.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: ANALYTICS & INTERACTIVE DIAGRAM */}
        {/* ========================================================================= */}
        <section className="mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold mb-4">
            <Activity className="w-4 h-4" /> Global Intelligence & Funnel Analytics
          </div>

          <div className="grid lg:grid-cols-12 gap-6 mb-8">
            {/* KPI Stat 1 */}
            <Card className="lg:col-span-3 bg-card/50 border-border/70 backdrop-blur-sm p-5 flex flex-col justify-between">
              <span className="text-xs font-mono text-muted-foreground">Total Analyzed Orgs</span>
              <div className="text-3xl font-black font-mono text-foreground mt-2">25 Orgs</div>
              <span className="text-[11px] text-emerald-400 font-mono mt-2">Verified 3+ Year Perennials</span>
            </Card>

            {/* KPI Stat 2 */}
            <Card className="lg:col-span-3 bg-card/50 border-border/70 backdrop-blur-sm p-5 flex flex-col justify-between">
              <span className="text-xs font-mono text-muted-foreground">Tracked Yearly Slots</span>
              <div className="text-3xl font-black font-mono text-emerald-400 mt-2">~467 Slots</div>
              <span className="text-[11px] text-muted-foreground font-mono mt-2">~40% of all worldwide slots</span>
            </Card>

            {/* KPI Stat 3 */}
            <Card className="lg:col-span-3 bg-card/50 border-border/70 backdrop-blur-sm p-5 flex flex-col justify-between">
              <span className="text-xs font-mono text-muted-foreground">Average Slots Per Org</span>
              <div className="text-3xl font-black font-mono text-foreground mt-2">18.7 Slots</div>
              <span className="text-[11px] text-muted-foreground font-mono mt-2">High slot confidence</span>
            </Card>

            {/* KPI Stat 4 */}
            <Card className="lg:col-span-3 bg-card/50 border-border/70 backdrop-blur-sm p-5 flex flex-col justify-between">
              <span className="text-xs font-mono text-muted-foreground">Prerequisite Requirement</span>
              <div className="text-3xl font-black font-mono text-amber-400 mt-2">88% Require PR</div>
              <span className="text-[11px] text-muted-foreground font-mono mt-2">At least 1 merged commit required</span>
            </Card>
          </div>

          {/* Interactive Selection Funnel Diagram */}
          <Card className="bg-card/60 border-border/80 backdrop-blur-md p-6 md:p-8 mb-8 overflow-hidden relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border/60">
              <div>
                <h3 className="text-xl font-bold font-mono text-foreground flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" /> The Global GSoC Selection Pipeline Diagram
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  How 50,000+ applicants get filtered down to final stipend recipients every year.
                </p>
              </div>
              <Badge variant="outline" className="font-mono text-xs text-emerald-400 border-emerald-500/40 w-fit">
                Funnel Conversion Model
              </Badge>
            </div>

            {/* Funnel Visual Stack */}
            <div className="space-y-4">
              {GSOC_ANALYTICS.funnelStages.map((stage, idx) => {
                const widthPercent = [100, 72, 48, 32, 26][idx];
                return (
                  <motion.div 
                    key={stage.stage}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 rounded-xl bg-background/60 border border-border/60 relative overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 relative z-10">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-mono text-sm font-bold text-foreground">
                          {stage.stage}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="font-black text-foreground text-sm">{stage.count}</span>
                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">
                          {stage.rate}
                        </Badge>
                      </div>
                    </div>

                    {/* Funnel Progress Width Indicator */}
                    <div className="w-full bg-muted/40 h-2 rounded-full overflow-hidden mb-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${widthPercent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                      />
                    </div>

                    <div className="text-xs text-muted-foreground flex items-center justify-between">
                      <span>{stage.note}</span>
                      <span className="font-mono text-[11px] text-foreground/70 hidden sm:inline">
                        {idx === 0 ? "Entrypoint" : idx === 4 ? "Full Payout" : "Filtering Gate"}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>

          {/* Category Slot Distribution & Competition Matrix */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Category Breakdown */}
            <Card className="bg-card/50 border-border/70 backdrop-blur-sm p-6">
              <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" /> Category Slot Allocation Breakdown
              </h4>
              <div className="space-y-4">
                {GSOC_ANALYTICS.categoryDistribution.map((cat) => (
                  <div key={cat.category} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-semibold text-foreground">{cat.label}</span>
                      <span className="text-muted-foreground">{cat.percentage}% of Slots (~{cat.avgSlots} avg)</span>
                    </div>
                    <div className="w-full bg-muted/50 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${cat.color} rounded-full`}
                        style={{ width: `${cat.percentage * 2.5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Competition Matrix */}
            <Card className="bg-card/50 border-border/70 backdrop-blur-sm p-6">
              <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" /> Competition Tier & Winning Strategy
              </h4>
              <div className="space-y-3">
                {GSOC_ANALYTICS.competitionMatrix.map((tier) => (
                  <div key={tier.level} className="p-3 rounded-lg bg-background/50 border border-border/60 text-xs">
                    <div className="flex items-center justify-between font-mono mb-1">
                      <span className="font-bold text-foreground">{tier.level} Competition ({tier.count} Orgs)</span>
                      <Badge variant="outline" className="text-[10px] text-muted-foreground font-mono">
                        {tier.avgApplicants}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {tier.strategy}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: 25 ORGANIZATIONS FILTERABLE DIRECTORY */}
        {/* ========================================================================= */}
        <section id="directory-list" className="mb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-border/70">
            <div>
              <h2 className="text-2xl md:text-3xl font-black font-mono text-foreground flex items-center gap-2">
                <Compass className="w-6 h-6 text-emerald-400" /> Explore All 25 Organizations
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Filter by technical category, difficulty, or search for libraries you already use.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span>Showing:</span>
              <Badge variant="secondary" className="font-mono text-xs bg-emerald-500/10 text-emerald-400">
                {filteredOrgs.length} of 25 Orgs
              </Badge>
            </div>
          </div>

          {/* Filtering Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mb-8">
            {/* Category tabs */}
            <div className="flex gap-2 p-1 rounded-lg bg-card/60 border border-border/70 backdrop-blur-sm overflow-x-auto hide-scrollbar">
              {[
                { id: "all", label: "All Stacks (25)" },
                { id: "js-ts", label: "Web & TypeScript" },
                { id: "python", label: "Python & Core" },
                { id: "ai-data", label: "AI & Scientific Data" },
                { id: "systems", label: "Systems & Cloud" },
                { id: "tools", label: "Creative & Tools" },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-md font-mono text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    activeCategory === tab.id
                      ? "bg-emerald-500 text-black shadow-sm font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Difficulty selector & search */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex gap-1 p-1 rounded-lg bg-card/40 border border-border/70">
                {["all", "Beginner", "Intermediate", "Advanced"].map(diff => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                      selectedDifficulty === diff
                        ? "bg-muted text-foreground font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {diff === "all" ? "All Levels" : diff}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Filter orgs, tech, keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 font-mono text-xs bg-card/40 border-border/70"
                />
              </div>
            </div>
          </div>

          {/* Org Grid Cards (25 Cards) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrgs.map((org, i) => (
              <motion.div
                key={org.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: (i % 6) * 0.05 }}
              >
                <Card className="h-full bg-card/50 border-border/60 hover:border-emerald-500/50 hover:shadow-[0_0_25px_-10px_rgba(34,197,94,0.2)] transition-all duration-200 backdrop-blur-sm flex flex-col justify-between group overflow-hidden">
                  <CardContent className="p-6 flex flex-col h-full justify-between space-y-4">
                    <div>
                      {/* Top Rank & Badges Header */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-xs text-emerald-400">
                            #{org.rank}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground">
                            {org.categoryLabel}
                          </span>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`font-mono text-[10px] ${
                            org.difficulty === 'Beginner' 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : org.difficulty === 'Intermediate'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                          }`}
                        >
                          {org.difficulty}
                        </Badge>
                      </div>

                      {/* Org Name & Tagline */}
                      <h3 className="text-xl font-bold font-mono text-foreground group-hover:text-emerald-400 transition-colors mb-1">
                        {org.name}
                      </h3>
                      <p className="text-xs text-muted-foreground/80 line-clamp-1 mb-3">
                        {org.tagline}
                      </p>

                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                        {org.description}
                      </p>

                      {/* Tech stack pills */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {org.tech.map(t => (
                          <Badge key={t} variant="outline" className="font-mono text-[10px] bg-background/50 border-border/60 text-foreground/80">
                            {t}
                          </Badge>
                        ))}
                      </div>

                      {/* Insider Maintainer Tip Callout */}
                      <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs text-foreground/90 flex items-start gap-2 mb-4">
                        <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2 text-[11px] leading-relaxed">
                          <strong className="text-emerald-400 font-mono font-semibold">Tip:</strong> {org.guidanceNote}
                        </span>
                      </div>
                    </div>

                    {/* Historical Slot mini sparkline & External links */}
                    <div className="pt-3 border-t border-border/50 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400" /> Historical Slots:
                        </span>
                        <span className="text-foreground font-bold">~{org.avgSlots} slots/yr</span>
                      </div>

                      <div className="flex items-end justify-between gap-1 h-12 bg-background/40 p-2 rounded-lg border border-border/40">
                        {org.history.map((h) => {
                          const heightPct = Math.min(100, Math.max(15, (h.count / maxSlots) * 100));
                          return (
                            <div key={h.year} className="flex-1 flex flex-col items-center group/bar relative">
                              <div 
                                className="w-full bg-emerald-500/40 group-hover/bar:bg-emerald-400 rounded-t transition-all"
                                style={{ height: `${heightPct}%` }}
                              />
                              <span className="text-[9px] font-mono text-muted-foreground mt-1">
                                '{h.year}
                              </span>
                              <div className="absolute -top-6 opacity-0 group-hover/bar:opacity-100 bg-foreground text-background font-mono font-bold text-[9px] px-1 py-0.5 rounded shadow pointer-events-none transition-opacity">
                                {h.count}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1 text-xs font-mono">
                        <a 
                          href={org.chatUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-muted-foreground hover:text-emerald-400 transition-colors"
                        >
                          <MessageSquare className="w-3 h-3 text-emerald-400" />
                          <span>{org.chatPlatform}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                        </a>

                        <a 
                          href={org.starterRepoUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-muted-foreground hover:text-emerald-400 transition-colors"
                        >
                          <GitFork className="w-3 h-3 text-blue-400" />
                          <span>Starter Repo</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredOrgs.length === 0 && (
            <div className="text-center py-20 border border-dashed border-border/60 rounded-xl bg-card/20">
              <Building2 className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
              <div className="font-mono text-base font-bold text-foreground">No Organizations Match Your Filter</div>
              <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                Try resetting your search keyword or switching your difficulty and category filters above.
              </p>
            </div>
          )}
        </section>

        {/* Back to Guide Bottom Exit Banner */}
        <section className="rounded-2xl border border-border/70 bg-gradient-to-r from-card via-card/80 to-emerald-950/20 p-8 md:p-10 text-center relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-4">
            <h3 className="text-2xl font-bold font-mono text-foreground">
              Ready to Craft Your Contribution Plan?
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Now that you've discovered the best organizations, return to the main GSoC guide to master the 4-stage Trust Staircase and download the 10/10 proposal template.
            </p>
            <div className="pt-2">
              <Link to="/gsoc">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-black font-mono font-bold text-xs hover:bg-emerald-400 transition-colors cursor-pointer shadow-lg shadow-emerald-500/20">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to GSoC Contributor Guide</span>
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
