import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TOP_5_GSOC_ORGS 
} from "./gsoc-data";
import { 
  MessageSquare, 
  GitFork, 
  Info, 
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { ShinyButton } from "@/components/ui/shiny-button";

export function GsocOrgDirectory() {
  return (
    <section id="org-intelligence" className="mb-24 scroll-mt-20">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Top GSoC Organizations for First-Timers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mt-2">
            These organizations consistently receive the highest Google slot allocations and have dedicated mentorship programs.
          </p>
        </div>

        <Link 
          to="/gsoc/orgs" 
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
          className="shrink-0"
        >
          <ShinyButton className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm px-5 py-2.5 flex items-center gap-2">
            <span>View All Organizations</span>
            <ArrowRight className="w-4 h-4" />
          </ShinyButton>
        </Link>
      </div>

      {/* Top 5 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {TOP_5_GSOC_ORGS.map((org) => (
          <Card 
            key={org.name}
            className="bg-card border-border/40 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full rounded-2xl"
          >
            <CardContent className="p-8 flex flex-col h-full">
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold mb-4">
                  #{org.rank}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {org.name}
                </h3>
                <p className="text-muted-foreground text-sm font-medium">
                  {org.tagline}
                </p>
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed mb-6 flex-grow">
                {org.description}
              </p>

              <div className="space-y-4 mt-auto pt-6 border-t border-border/40">
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" />
                    <span><strong className="text-foreground">Tip:</strong> {org.guidanceNote}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <a 
                    href={org.chatUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Join Chat</span>
                  </a>
                  <span className="text-border mx-2">•</span>
                  <a 
                    href={org.starterRepoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    <GitFork className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Prominent "MORE ORGS" Redirect Banner */}
      <div className="rounded-2xl border-none bg-muted/30 p-10 flex flex-col items-center text-center gap-6 mt-12 mb-8">
        <div className="space-y-3 max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold text-foreground">
            Explore All GSoC Organizations
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Discover opportunities across top tech stacks, languages, and open source projects for your next big contribution.
          </p>
        </div>

        <Link 
          to="/gsoc/orgs" 
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
        >
          <Button size="lg" className="h-12 px-8 rounded-full text-base font-semibold shadow-none">
            <span>View Complete Directory</span>
          </Button>
        </Link>
      </div>
    </section>
  );
}
