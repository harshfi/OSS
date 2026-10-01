import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Info, Calendar, DollarSign, Code2, Award, Trophy, Users, ChevronRight, Star, ExternalLink, Target } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ShinyButton } from "@/components/ui/shiny-button";

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

const perks = [
  { icon: DollarSign, title: "Earn a Stipend", desc: "Receive between $1,500 and $3,300+ (depending on your region and project size) while writing code.", color: "from-green-500 to-emerald-700" },
  { icon: Users, title: "1-on-1 Mentorship", desc: "Get paired with experienced open-source maintainers who guide you through the entire summer.", color: "from-blue-500 to-indigo-700" },
  { icon: Award, title: "Career Boost", desc: "A successful GSoC project is a massive signal to top tech companies that you can ship real code.", color: "from-amber-500 to-orange-700" },
  { icon: Code2, title: "Real-world Impact", desc: "Your code will be used by thousands or millions of users worldwide in production systems.", color: "from-pink-500 to-purple-700" },
];

const timeline = [
  { phase: "Phase 1: Discovery", date: "Jan - Feb", title: "Organizations Announced", desc: "Google publishes the list of accepted mentoring organizations. Start researching projects, join their communication channels (Discord/Slack/Mailing list), and introduce yourself." },
  { phase: "Phase 2: Contribution", date: "Feb - March", title: "Make First Contributions", desc: "Clone their repo, build it locally, and solve a 'good first issue'. Organizations rarely accept proposals from contributors who haven't merged any code." },
  { phase: "Phase 3: Proposal", date: "Late March - April", title: "Submit Application", desc: "Draft a detailed project proposal. Discuss it with mentors early to get feedback before the final deadline." },
  { phase: "Phase 4: Bonding", date: "May", title: "Community Bonding Period", desc: "If accepted, you spend a month getting to know the community, refining your project timeline, and setting up your development environment." },
  { phase: "Phase 5: Coding", date: "June - August", title: "The Coding Period", desc: "Work full-time or part-time on your project. You'll have midterm and final evaluations to pass to receive your stipend payouts." },
];

export default function GsocInsightsPage() {
  const maxCount = 50;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden" ref={containerRef}>
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-yellow-400/10 via-orange-500/10 to-red-500/5 blur-[120px] -z-10 dark:from-yellow-500/20 dark:via-orange-600/20 dark:to-red-700/10 pointer-events-none" />
      <motion.div style={{ y: y1 }} className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full -z-10 pointer-events-none" />
      <motion.div style={{ y: y2 }} className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full -z-10 pointer-events-none" />

      <div className="container mx-auto p-4 md:p-8 max-w-6xl">
        {/* Hero Section */}
        <div className="mb-20 pt-10 md:pt-20 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6"
          >
            <Trophy className="w-4 h-4" />
            <span className="font-semibold text-sm">The Ultimate Open Source Program</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500"
          >
            Google Summer of Code
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto font-medium"
          >
            Spend your summer writing code for open source organizations, mentored by industry experts, and get paid for it.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <a href="https://summerofcode.withgoogle.com/" target="_blank" rel="noreferrer">
              <ShinyButton className="bg-orange-500 text-white hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700">
                Official Website
              </ShinyButton>
            </a>
          </motion.div>
        </div>

        {/* Perks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {perks.map((perk, i) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-colors group">
                <CardContent className="p-6 relative">
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${perk.color} opacity-10 rounded-bl-[100px] group-hover:opacity-20 transition-opacity`} />
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${perk.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                    <perk.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{perk.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{perk.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Timeline Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Contributor Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A successful GSoC application starts months before the deadline. Here is the blueprint.</p>
          </div>
          
          <div className="relative border-l-2 border-primary/20 ml-4 md:ml-12 space-y-12 pb-8">
            {timeline.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-8 md:pl-12"
              >
                <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center ring-4 ring-background">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                  <Badge variant="secondary" className="w-fit text-primary bg-primary/10 hover:bg-primary/20">
                    <Calendar className="w-3 h-3 mr-1" /> {item.date}
                  </Badge>
                  <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">{item.phase}</span>
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground md:text-lg leading-relaxed max-w-3xl">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Insights Alert */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-orange-500/10 via-red-500/10 to-purple-500/10 border border-orange-500/20 rounded-2xl p-8 mb-24 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-500/20 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="bg-background/80 backdrop-blur-md p-5 rounded-2xl border border-border/50 shadow-xl shrink-0">
            <Target className="w-12 h-12 text-orange-500" />
          </div>
          <div>
            <h3 className="font-bold text-2xl mb-2 flex items-center gap-2">
              The Golden Rule: PRs {">"} Proposals
            </h3>
            <p className="text-muted-foreground text-lg">
              Most top-tier organizations (like Python and KDE) require at least one merged PR before accepting a proposal. Some orgs (like LLVM) rely heavily on custom evaluation tasks. 
              <strong className="text-foreground ml-1">Do not submit a proposal to an org if you haven't written any code for them yet.</strong>
            </p>
          </div>
        </motion.div>

        {/* Top Organizations Data */}
        <div className="grid lg:grid-cols-3 gap-12 mb-24">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overall" className="w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Top Organizations</h2>
                  <p className="text-muted-foreground">Based on historical slot allocations.</p>
                </div>
                <TabsList className="bg-background/50 border border-border/50 backdrop-blur-md">
                  <TabsTrigger value="overall">Overall</TabsTrigger>
                  <TabsTrigger value="js">JS/TS</TabsTrigger>
                  <TabsTrigger value="java">Java</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="overall" className="space-y-6 m-0">
                {topOrgs.map((org, i) => (
                  <motion.div 
                    key={org.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-[0_0_30px_-10px_rgba(var(--primary),0.3)] bg-background/50 backdrop-blur-sm group">
                      <CardContent className="p-0">
                        <div className="p-6 flex flex-col md:flex-row gap-8">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center font-bold text-primary shadow-inner">
                                #{org.rank}
                              </div>
                              <h3 className="text-2xl font-bold group-hover:text-primary transition-colors flex items-center gap-2">
                                {org.name}
                                <a href={org.url} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
                                </a>
                              </h3>
                            </div>
                            <p className="text-muted-foreground mb-6 text-lg">{org.description}</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                              {org.tech.map(t => (
                                <Badge key={t} variant="secondary" className="bg-primary/5 hover:bg-primary/10 text-primary border-primary/20 font-medium">{t}</Badge>
                              ))}
                            </div>
                            <div className="text-sm font-medium text-muted-foreground flex items-center gap-2 bg-muted/50 w-fit px-3 py-1.5 rounded-lg border border-border/50">
                              <BarChart3 className="w-4 h-4 text-primary" /> Activity: Last commit {org.lastCommit}
                            </div>
                          </div>
                          
                          <div className="shrink-0 md:w-56 flex flex-col justify-end pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-border/50 pl-0 md:pl-8">
                            <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-4 flex items-center gap-1">
                              <Star className="w-3 h-3 text-orange-400" /> Historical Slots
                            </div>
                            <div className="flex items-end justify-between gap-1 h-28 pb-1">
                              {org.history.map((h, hi) => (
                                <div key={h.year} className="group/bar relative flex flex-col items-center flex-1">
                                  <motion.div 
                                    className="w-full bg-primary/20 hover:bg-primary/80 rounded-t-md transition-colors cursor-pointer relative overflow-hidden"
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${(h.count / maxCount) * 100}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.2 + (hi * 0.1) }}
                                  >
                                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
                                  </motion.div>
                                  <div className="text-xs font-medium text-muted-foreground mt-2">{h.year}</div>
                                  <div className="absolute -top-8 opacity-0 group-hover/bar:opacity-100 bg-foreground text-background font-bold text-xs px-2 py-1 rounded shadow-lg transition-all transform translate-y-1 group-hover/bar:translate-y-0 z-10">
                                    {h.count}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>
              
              <TabsContent value="js" className="m-0">
                <Card className="bg-background/50 backdrop-blur-sm border-border/50"><CardContent className="p-12 text-center text-muted-foreground text-lg">JS/TS org rankings loading...</CardContent></Card>
              </TabsContent>
              
              <TabsContent value="java" className="m-0">
                <Card className="bg-background/50 backdrop-blur-sm border-border/50"><CardContent className="p-12 text-center text-muted-foreground text-lg">Java/Kotlin org rankings loading...</CardContent></Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Quick Tips</h2>
              <div className="space-y-4">
                {[
                  { title: "Pick one project", desc: "Don't spread yourself thin across 5 orgs. Choose one org and focus deeply." },
                  { title: "Read the room", desc: "Before asking questions in Discord/Slack, read past discussions and docs." },
                  { title: "Draft early", desc: "Share your proposal draft with mentors weeks before the deadline." },
                  { title: "No ghosting", desc: "Consistency is key. A contributor who sends 1 PR a week for 2 months is better than someone who sends 10 PRs in 2 days and vanishes." }
                ].map((tip, i) => (
                  <Card key={i} className="bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors">
                    <CardContent className="p-4 flex gap-4">
                      <div className="shrink-0 mt-1">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{tip.title}</h4>
                        <p className="text-sm text-muted-foreground">{tip.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-6 italic flex items-center gap-1 opacity-70">
                <Info className="w-3 h-3" /> Data based on GSoC archives (estimated).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
