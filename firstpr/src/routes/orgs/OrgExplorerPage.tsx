import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, Star, Code, Users } from "lucide-react";
import Fuse from "fuse.js";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Mock Data representing the 100 Orgs CSV
export type Org = {
  id: string;
  name: string;
  description: string;
  tier: "Beginner" | "Intermediate" | "Advanced";
  stack: string[];
  gsoc2026: boolean;
  lfx2026: boolean;
  activityLevel: "High" | "Medium" | "Low";
  starterRepo: string;
  url: string;
};

const orgsData: Org[] = [
  { id: "1", name: "FreeCodeCamp", description: "Open source community that helps you learn to code.", tier: "Beginner", stack: ["JavaScript", "React", "Node.js"], gsoc2026: true, lfx2026: false, activityLevel: "High", starterRepo: "freeCodeCamp/freeCodeCamp", url: "https://freecodecamp.org" },
  { id: "2", name: "Mozilla", description: "Building a better Internet.", tier: "Intermediate", stack: ["Python", "Rust", "C++", "JavaScript"], gsoc2026: true, lfx2026: true, activityLevel: "High", starterRepo: "mozilla/gecko-dev", url: "https://mozilla.org" },
  { id: "3", name: "Kubernetes", description: "Production-Grade Container Scheduling and Management.", tier: "Advanced", stack: ["Go"], gsoc2026: true, lfx2026: true, activityLevel: "High", starterRepo: "kubernetes/kubernetes", url: "https://kubernetes.io" },
  { id: "4", name: "Zulip", description: "Open-source team chat with topic-based threading.", tier: "Beginner", stack: ["Python", "Django", "JavaScript"], gsoc2026: true, lfx2026: false, activityLevel: "High", starterRepo: "zulip/zulip", url: "https://zulip.com" },
  { id: "5", name: "Home Assistant", description: "Open source home automation that puts local control and privacy first.", tier: "Intermediate", stack: ["Python"], gsoc2026: false, lfx2026: false, activityLevel: "High", starterRepo: "home-assistant/core", url: "https://home-assistant.io" },
];

export default function OrgExplorerPage() {
  const [search, setSearch] = useState("");
  const [filterTier, setFilterTier] = useState<string | null>(null);
  const [filterGsoc, setFilterGsoc] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Org | null>(null);

  const fuse = useMemo(() => new Fuse(orgsData, { keys: ["name", "description", "stack"], threshold: 0.3 }), []);

  const filteredOrgs = useMemo(() => {
    let result = orgsData;
    
    if (search.trim()) {
      result = fuse.search(search).map(r => r.item);
    }
    
    if (filterTier) {
      result = result.filter(o => o.tier === filterTier);
    }
    
    if (filterGsoc) {
      result = result.filter(o => o.gsoc2026);
    }
    
    return result;
  }, [search, filterTier, filterGsoc, fuse]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Org Explorer</h1>
        <p className="text-muted-foreground text-lg mb-6">Discover the perfect open source organization for your skills and experience level.</p>
        
        {/* Statistics */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Badge variant="secondary" className="px-3 py-1">34 Beginner</Badge>
          <Badge variant="secondary" className="px-3 py-1">38 Intermediate</Badge>
          <Badge variant="secondary" className="px-3 py-1">28 Advanced</Badge>
          <Badge variant="default" className="px-3 py-1 bg-amber-500 hover:bg-amber-600">76 in GSoC 2026</Badge>
          <Badge variant="default" className="px-3 py-1 bg-blue-500 hover:bg-blue-600">31 in LFX 2026</Badge>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 sticky top-14 z-10 bg-background/95 backdrop-blur py-4 border-b">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search by name, tech stack, or description..." 
              className="pl-9"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {["Beginner", "Intermediate", "Advanced"].map(tier => (
              <Button 
                key={tier} 
                variant={filterTier === tier ? "default" : "outline"}
                onClick={() => setFilterTier(filterTier === tier ? null : tier)}
                className="whitespace-nowrap"
              >
                {tier}
              </Button>
            ))}
            <Button 
              variant={filterGsoc ? "default" : "outline"}
              onClick={() => setFilterGsoc(!filterGsoc)}
              className="whitespace-nowrap border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
            >
              GSoC 2026
            </Button>
          </div>
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredOrgs.map(org => (
            <motion.div
              key={org.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full flex flex-col hover:border-primary/50 transition-colors cursor-pointer shadow-sm hover:shadow-md" onClick={() => setSelectedOrg(org)}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{org.name}</CardTitle>
                    <Badge variant={org.tier === 'Beginner' ? 'default' : org.tier === 'Intermediate' ? 'secondary' : 'destructive'}>
                      {org.tier}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">{org.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex flex-col gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {org.stack.map(tech => (
                      <Badge key={tech} variant="outline" className="text-xs bg-muted/50">{tech}</Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-border/50 text-sm">
                    <div className="flex gap-2">
                      {org.gsoc2026 && <Badge variant="outline" className="border-amber-500 text-amber-500 bg-amber-500/10 text-[10px] px-1">GSoC</Badge>}
                      {org.lfx2026 && <Badge variant="outline" className="border-blue-500 text-blue-500 bg-blue-500/10 text-[10px] px-1">LFX</Badge>}
                    </div>
                    <div className="text-muted-foreground flex items-center gap-1 text-xs">
                      <Code className="w-3 h-3" /> {org.activityLevel} Activity
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredOrgs.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No organizations found matching your criteria.
        </div>
      )}

      {/* Org Detail Drawer/Modal */}
      <Dialog open={!!selectedOrg} onOpenChange={() => setSelectedOrg(null)}>
        <DialogContent className="max-w-2xl">
          {selectedOrg && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <DialogTitle className="text-3xl font-bold mb-2">{selectedOrg.name}</DialogTitle>
                    <DialogDescription className="text-base text-foreground/80">{selectedOrg.description}</DialogDescription>
                  </div>
                  <Button size="icon" variant="outline" className="shrink-0" onClick={() => window.open(selectedOrg.url, '_blank')}>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </DialogHeader>
              
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Tier</div>
                    <div className="font-semibold">{selectedOrg.tier}</div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Starter Repo</div>
                    <div className="font-semibold truncate" title={selectedOrg.starterRepo}>{selectedOrg.starterRepo}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2"><Code className="w-4 h-4 text-primary" /> Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedOrg.stack.map(tech => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> Programs</h4>
                  <div className="flex gap-2">
                    {selectedOrg.gsoc2026 ? <Badge className="bg-amber-500">Participating in GSoC 2026</Badge> : <Badge variant="outline">Not in GSoC</Badge>}
                    {selectedOrg.lfx2026 ? <Badge className="bg-blue-500">Participating in LFX 2026</Badge> : <Badge variant="outline">Not in LFX</Badge>}
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center border-t">
                  <Button variant="outline" onClick={() => setSelectedOrg(null)}>Close</Button>
                  <Button className="gap-2">
                    <Star className="w-4 h-4" /> Save to Planner
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
