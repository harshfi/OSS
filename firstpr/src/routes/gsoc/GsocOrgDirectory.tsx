import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TOP_5_GSOC_ORGS 
} from "./gsoc-data";
import { 
  ExternalLink, 
  MessageSquare, 
  GitFork, 
  Star, 
  Info, 
  BarChart3, 
  Building2,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { ShinyButton } from "@/components/ui/shiny-button";

export function GsocOrgDirectory() {
  const maxSlots = 50;

  return (
    <section id="org-intelligence" className="mb-24 scroll-mt-20">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            Top 5 Perennial Organizations
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground font-mono">
            Best 5 Orgs for First-Time Contributors
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mt-2">
            These top 5 organizations consistently receive the highest Google slot allocations and have dedicated mentorship programs.
          </p>
        </div>

        <Link 
          to="/gsoc/orgs" 
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
          className="shrink-0"
        >
          <ShinyButton className="bg-emerald-500 text-black hover:bg-emerald-400 font-mono font-bold text-xs px-5 py-2.5 flex items-center gap-2">
            <span>MORE ORGS (TOP 25 & ANALYTICS)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </ShinyButton>
        </Link>
      </div>

      {/* Top 5 Cards Grid */}
      <div className="space-y-6 mb-10">
        {TOP_5_GSOC_ORGS.map((org) => (
          <Card 
            key={org.name}
            className="bg-card/50 border-border/60 hover:border-emerald-500/40 transition-all duration-200 backdrop-blur-sm group overflow-hidden"
          >
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col lg:flex-row gap-8 justify-between">
                {/* Org Details */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-xs text-emerald-400">
                      #{org.rank}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold font-mono text-foreground flex items-center gap-2">
                      {org.name}
                    </h3>
                    <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground border-border/70">
                      {org.tagline}
                    </Badge>
                    <Badge variant="secondary" className="font-mono text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {org.difficulty}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {org.description}
                  </p>

                  {/* Guidance Note Box */}
                  <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs text-foreground/90 flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-emerald-400 font-mono font-semibold">Maintainer Insider Tip:</strong> {org.guidanceNote}</span>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {org.tech.map(t => (
                      <Badge key={t} variant="secondary" className="font-mono text-xs bg-muted/50 text-foreground/80 border border-border/40">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  {/* Communication & Starter Repo Links */}
                  <div className="flex flex-wrap gap-3 pt-2 text-xs font-mono">
                    <a 
                      href={org.chatUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/80 border border-border/60 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{org.chatPlatform} Chat</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>

                    <a 
                      href={org.starterRepoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/80 border border-border/60 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors"
                    >
                      <GitFork className="w-3.5 h-3.5 text-blue-400" />
                      <span>Repo: {org.starterRepo}</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/30 border border-border/40 text-muted-foreground">
                      <BarChart3 className="w-3.5 h-3.5" />
                      <span>Last commit: {org.lastCommit}</span>
                    </div>
                  </div>
                </div>

                {/* Historical Slots mini chart */}
                <div className="lg:w-64 border-t lg:border-t-0 lg:border-l border-border/50 pt-4 lg:pt-0 lg:pl-8 flex flex-col justify-between shrink-0">
                  <div>
                    <div className="text-xs font-mono text-muted-foreground font-semibold uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400" /> Historical Slots
                    </div>
                    <div className="text-[11px] text-muted-foreground mb-4">
                      Total contributor allocations granted by Google:
                    </div>
                  </div>

                  <div className="flex items-end justify-between gap-1.5 h-24 pb-1">
                    {org.history.map((h) => {
                      const heightPercent = Math.min(100, Math.max(15, (h.count / maxSlots) * 100));
                      return (
                        <div key={h.year} className="flex-1 flex flex-col items-center group/bar relative">
                          <div className="w-full bg-muted/50 group-hover/bar:bg-emerald-500/80 rounded-t transition-colors h-full flex items-end">
                            <div 
                              className="w-full bg-emerald-500/40 group-hover/bar:bg-emerald-400 rounded-t transition-all"
                              style={{ height: `${heightPercent}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-mono text-muted-foreground mt-1.5">
                            '{h.year}
                          </span>
                          {/* Tooltip on hover */}
                          <div className="absolute -top-7 opacity-0 group-hover/bar:opacity-100 bg-foreground text-background font-mono font-bold text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none transition-opacity">
                            {h.count} slots
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Prominent "MORE ORGS" Redirect Banner */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-card via-card/80 to-emerald-950/30 p-8 md:p-10 backdrop-blur-md relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl shadow-emerald-950/20">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
            <Sparkles className="w-4 h-4" /> Comprehensive Directory & Analytics
          </div>
          <h3 className="text-2xl font-bold font-mono text-foreground">
            Looking for More Tech Stacks & Deep Analytics?
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We track the <strong>top 25 perennial GSoC organizations</strong> across JavaScript, TypeScript, Python, Rust, Go, C++, Linux kernel, and creative 3D suites. Includes interactive selection funnel diagrams, competition ratios, and slot allocation breakdowns.
          </p>
        </div>

        <Link 
          to="/gsoc/orgs" 
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
          className="shrink-0"
        >
          <ShinyButton className="bg-emerald-500 text-black hover:bg-emerald-400 font-mono font-bold text-sm px-6 py-3 flex items-center gap-2.5 shadow-lg shadow-emerald-500/25">
            <span>MORE ORGS (TOP 25 DIRECTORY)</span>
            <ArrowRight className="w-4 h-4" />
          </ShinyButton>
        </Link>
      </div>
    </section>
  );
}
