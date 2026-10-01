import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Info } from "lucide-react";
import { motion } from "motion/react";

type GsocOrg = {
  rank: number;
  name: string;
  description: string;
  tech: string[];
  history: { year: string; count: number }[];
  lastCommit: string;
  url: string;
};

const topOrgs: GsocOrg[] = [
  { rank: 1, name: "Python Software Foundation", description: "The non-profit behind the Python programming language.", tech: ["Python", "C"], history: [{year: '22', count: 35}, {year: '23', count: 42}, {year: '24', count: 40}, {year: '25', count: 45}, {year: '26', count: 50}], lastCommit: "2 days ago", url: "#" },
  { rank: 2, name: "NumFOCUS", description: "Promotes open practices in research, data, and scientific computing.", tech: ["Python", "C++", "Julia"], history: [{year: '22', count: 28}, {year: '23', count: 30}, {year: '24', count: 35}, {year: '25', count: 32}, {year: '26', count: 38}], lastCommit: "1 day ago", url: "#" },
  { rank: 3, name: "KDE Community", description: "International team developing free and open-source software.", tech: ["C++", "Qt", "QML"], history: [{year: '22', count: 40}, {year: '23', count: 38}, {year: '24', count: 35}, {year: '25', count: 36}, {year: '26', count: 34}], lastCommit: "4 hours ago", url: "#" },
];

export default function GsocInsightsPage() {
  const maxCount = 50;

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">GSoC Insights</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Data-driven strategies for Google Summer of Code based on historical selection rates and organization activity.</p>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12 flex flex-col md:flex-row gap-6 items-center">
        <div className="bg-primary/10 p-4 rounded-full">
          <TrendingUp className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-1">Key Insight: Merged PRs vs Evaluation Tasks</h3>
          <p className="text-muted-foreground">Most top-tier organizations (like Python and KDE) require at least one merged PR before accepting a proposal. However, some (like LLVM) rely heavily on custom evaluation tasks. Check the org's guidelines early!</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 mb-16">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overall">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Top Organizations</h2>
              <TabsList>
                <TabsTrigger value="overall">Overall</TabsTrigger>
                <TabsTrigger value="js">JS/TS</TabsTrigger>
                <TabsTrigger value="java">Java</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="overall" className="space-y-4 m-0">
              {topOrgs.map((org, i) => (
                <motion.div 
                  key={org.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="hover:border-primary/50 transition-colors">
                    <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center font-bold text-muted-foreground">
                            #{org.rank}
                          </div>
                          <h3 className="text-xl font-bold">{org.name}</h3>
                        </div>
                        <p className="text-muted-foreground mb-4">{org.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {org.tech.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" /> Activity: Last commit {org.lastCommit}
                        </div>
                      </div>
                      
                      <div className="shrink-0 md:w-48 flex flex-col justify-center">
                        <div className="text-xs text-muted-foreground text-center mb-2 font-medium uppercase tracking-wider">Selections '22-'26</div>
                        <div className="flex items-end justify-center gap-2 h-24 border-b border-border/50 pb-1 px-2">
                          {org.history.map((h, hi) => (
                            <div key={h.year} className="group relative flex flex-col items-center flex-1">
                              <motion.div 
                                className="w-full bg-primary/20 hover:bg-primary/80 rounded-t-sm transition-colors cursor-pointer"
                                initial={{ height: 0 }}
                                whileInView={{ height: `${(h.count / maxCount) * 100}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 + (hi * 0.1) }}
                              />
                              <div className="text-[10px] text-muted-foreground mt-1">{h.year}</div>
                              <div className="absolute -top-7 opacity-0 group-hover:opacity-100 bg-foreground text-background text-xs px-2 py-1 rounded transition-opacity">
                                {h.count}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>
            
            <TabsContent value="js" className="m-0">
              <Card><CardContent className="p-8 text-center text-muted-foreground">JS/TS org rankings loading...</CardContent></Card>
            </TabsContent>
            
            <TabsContent value="java" className="m-0">
              <Card><CardContent className="p-8 text-center text-muted-foreground">Java/Kotlin org rankings loading...</CardContent></Card>
            </TabsContent>
          </Tabs>

          <p className="text-xs text-muted-foreground mt-4 italic flex items-center gap-1">
            <Info className="w-3 h-3" /> Note: Umbrella org counts are estimates. Org participation changes yearly.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">How to get selected</h2>
          <div className="relative pl-8 space-y-8 border-l border-muted">
            {[
              { title: "1. Pick one project", desc: "Don't spread yourself thin. Choose one org and focus deeply on their codebase." },
              { title: "2. Join the chat", desc: "Introduce yourself. Read the room before asking questions." },
              { title: "3. Land small PRs", desc: "Fix typos, docs, or 'good first issues' to prove you can use Git and their CI pipeline." },
              { title: "4. Write a proposal", desc: "Share a draft early. Iterate based on mentor feedback." }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-sm">
                  {i + 1}
                </div>
                <h4 className="font-bold text-lg">{step.title.split('. ')[1]}</h4>
                <p className="text-muted-foreground mt-1 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
