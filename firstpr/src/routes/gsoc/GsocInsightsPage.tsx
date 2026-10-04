import { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  ExternalLink, 
  CheckCircle2, 
  Calendar, 
  Target, 
  Layers, 
  MessageSquare, 
  FileText, 
  Gauge, 
  Building2, 
  Clock
} from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { GSOC_PERKS, MASTER_TIMELINE } from "./gsoc-data";
import { GsocSelectionRubric } from "./GsocSelectionRubric";
import { GsocTrustLadder } from "./GsocTrustLadder";
import { GsocCommunicationMatrix } from "./GsocCommunicationMatrix";
import { GsocProposalGuide } from "./GsocProposalGuide";
import { GsocReadinessAudit } from "./GsocReadinessAudit";
import { GsocOrgDirectory } from "./GsocOrgDirectory";
import { Link } from "react-router-dom";

export default function GsocInsightsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -40% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: "Selection Truth", href: "#selection-truth", icon: Target },
    { label: "Trust Staircase", href: "#trust-ladder", icon: Layers },
    { label: "Communication", href: "#community-interaction", icon: MessageSquare },
    { label: "Proposal Guide", href: "#proposal-blueprint", icon: FileText },
    { label: "Readiness Audit", href: "#readiness-audit", icon: Gauge },
    { label: "Org Intelligence", href: "#org-intelligence", icon: Building2 },
    { label: "Timeline", href: "#master-timeline", icon: Calendar },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground" ref={containerRef}>
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-emerald-500/10 via-emerald-600/5 to-transparent blur-[140px] -z-10 pointer-events-none" />

      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-12 md:pt-20 pb-12 max-w-6xl text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono uppercase tracking-wider mb-6">
          <Trophy className="w-3.5 h-3.5" />
          The Open Source Contributor Playbook
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight font-mono mb-6 text-foreground max-w-4xl mx-auto leading-tight">
          How to Get Selected for <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-green-500">Google Summer of Code</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
          The unvarnished insider blueprint. Understand how maintainers actually evaluate applicants, build genuine social trust, and write a proposal that stands out from the generic crowd.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#selection-truth">
            <ShinyButton className="bg-emerald-500 text-black hover:bg-emerald-400 font-mono font-bold px-6 py-2.5">
              Explore The Selection Rubric
            </ShinyButton>
          </a>
          <a 
            href="https://summerofcode.withgoogle.com/" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/70 hover:border-emerald-500/50 bg-card/60 text-xs font-mono text-foreground transition-all hover:bg-card/90"
          >
            <span>Official Portal</span>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
          </a>
        </div>

        {/* Quick Highlights Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-left">
          {GSOC_PERKS.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <Card key={i} className="bg-card/40 border-border/60 backdrop-blur-sm relative overflow-hidden flex flex-col justify-between">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <Badge variant="outline" className="text-[10px] font-mono text-muted-foreground border-border/70">
                      {perk.badge}
                    </Badge>
                  </div>
                  <h3 className="font-mono font-bold text-sm text-foreground mb-1.5">{perk.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{perk.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </header>
      {/* Layout with Sidebar */}
      <div className="container mx-auto px-4 max-w-7xl flex flex-col lg:flex-row gap-12 pb-24">
        {/* Sticky Sidebar Navigation */}
        <aside className="lg:w-64 shrink-0 hidden lg:block">
          <div className="sticky top-24 space-y-8">
            <nav className="flex flex-col gap-1.5" aria-label="Page Sections">
              <h3 className="font-semibold text-sm mb-2 text-foreground px-2">Table of Contents</h3>
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? "text-primary bg-primary/10" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-border/50 px-2">
              <Card className="bg-primary/5 border-primary/20 shadow-none overflow-hidden relative">
                <CardContent className="p-4 flex flex-col gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Find Your Org</h4>
                    <p className="text-xs text-muted-foreground mt-1 mb-3">Browse past GSoC organizations and find a good fit.</p>
                  </div>
                  <Link to="/gsoc/orgs">
                    <Button size="sm" className="w-full font-semibold">
                      View All Orgs
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </aside>

        {/* Main Content Sections */}
        <main className="flex-1 min-w-0 max-w-4xl space-y-24">
        {/* 1. Selection Rubric & Reality Check */}
        <GsocSelectionRubric />

        {/* 2. Trust Staircase & Roadmap */}
        <GsocTrustLadder />

        {/* 3. Community Interaction Matrix */}
        <GsocCommunicationMatrix />

        {/* 4. Proposal Blueprint & Template */}
        <GsocProposalGuide />

        {/* 5. Interactive Readiness Audit */}
        <GsocReadinessAudit />

        {/* 6. Perennial Org Directory & History */}
        <GsocOrgDirectory />

        {/* 7. Master 2026 Season Timeline */}
        <section id="master-timeline" className="mb-24 scroll-mt-20">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono uppercase tracking-wider mb-3">
              <Calendar className="w-3.5 h-3.5" />
              Annual Contributor Journey
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground font-mono">
              The Complete 2026 Timeline & Milestone Guide
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mt-2">
              Success in GSoC is 80% preparation and 20% proposal submission. Here is the calendar breakdown from scouting to graduation.
            </p>
          </div>

          <div className="relative border-l-2 border-border/70 ml-4 md:ml-8 space-y-12 pb-4">
            {MASTER_TIMELINE.map((item, idx) => (
              <div key={idx} className="relative pl-6 md:pl-10">
                {/* Timeline Node */}
                <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 bg-background flex items-center justify-center ring-4 ring-background ${
                  item.status === 'active' 
                    ? 'border-emerald-400 bg-emerald-500' 
                    : item.status === 'completed'
                    ? 'border-muted-foreground bg-muted'
                    : 'border-border bg-background'
                }`}>
                  {item.status === 'completed' && <CheckCircle2 className="w-2.5 h-2.5 text-muted-foreground" />}
                </div>

                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                  <Badge 
                    variant={item.status === 'active' ? 'default' : 'secondary'} 
                    className={`font-mono text-xs ${item.status === 'active' ? 'bg-emerald-500 text-black font-bold' : ''}`}
                  >
                    <Clock className="w-3 h-3 mr-1" /> {item.dates}
                  </Badge>
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {item.phase}
                  </span>
                  {item.status === 'active' && (
                    <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 text-[10px] font-mono">
                      Current Window
                    </Badge>
                  )}
                </div>

                <h3 className="text-xl md:text-2xl font-bold font-mono text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-3xl mb-4">
                  {item.summary}
                </p>

                <div className="p-4 rounded-xl bg-card/40 border border-border/60 max-w-3xl space-y-2">
                  <div className="text-xs font-mono font-semibold uppercase text-emerald-400 mb-2">
                    Phase Tactical Checklist:
                  </div>
                  {item.tacticalChecklist.map((task, ti) => (
                    <div key={ti} className="flex items-center gap-2.5 text-xs text-foreground/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Banner: Where to go next */}
        <section className="rounded-2xl border border-border/70 bg-gradient-to-r from-card/80 via-card/50 to-emerald-950/20 p-8 md:p-12 mb-20 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold font-mono text-foreground">
              Ready to Take Your First Step?
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Don't wait until the proposal deadline. Pick an organization, clone their starter repository, and resolve your first good-first-issue today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link to="/orgs">
                <button className="px-5 py-2.5 rounded-lg bg-emerald-500 text-black font-mono font-bold text-xs hover:bg-emerald-400 transition-colors cursor-pointer shadow-lg shadow-emerald-500/20">
                  Explore 100+ Orgs
                </button>
              </Link>
              <Link to="/issues">
                <button className="px-5 py-2.5 rounded-lg border border-border bg-card/60 text-xs font-mono text-foreground hover:bg-card transition-colors cursor-pointer">
                  Find Good First Issues
                </button>
              </Link>
              <Link to="/lab">
                <button className="px-5 py-2.5 rounded-lg border border-border bg-card/60 text-xs font-mono text-foreground hover:bg-card transition-colors cursor-pointer">
                  Practice Git in the Lab
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      </div>
    </div>
  );
}
