import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WorkflowVisualizer } from "@/components/workflow/WorkflowVisualizer";
import { GridBeam } from "@/components/ui/grid-beam";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import { ShinyButton } from "@/components/ui/shiny-button";
import { TerminalSquare, BookOpen, ShieldQuestion, Briefcase, Search } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  // Animation for staggered text reveal
  const textRevealVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const heroHeadline = "Make your first open-source contribution".split(" ");

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Animated Glowing Orbs Background */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/40 mix-blend-multiply dark:mix-blend-screen dark:bg-purple-600/30 blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] right-[-5%] w-[35%] h-[35%] rounded-full bg-cyan-400/50 mix-blend-multiply dark:mix-blend-screen dark:bg-cyan-600/30 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] rounded-full bg-pink-400/40 mix-blend-multiply dark:mix-blend-screen dark:bg-pink-600/20 blur-[100px] animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* 1. Hero */}
      <section className="container mx-auto px-4 pt-20 md:pt-32 pb-16 flex flex-col lg:flex-row items-center gap-12 relative">
        <motion.div 
          className="flex-1 space-y-8 text-center lg:text-left z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-sm flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-2">
            {heroHeadline.map((word, index) => (
              <span key={index} className="overflow-hidden inline-block pb-2">
                <motion.span 
                  variants={textRevealVariants}
                  className="inline-block bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 dark:from-pink-500 dark:via-purple-500 dark:to-cyan-500 bg-clip-text text-transparent"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p 
            variants={textRevealVariants}
            className="text-xl md:text-2xl text-foreground/80 max-w-[600px] mx-auto lg:mx-0 font-medium"
          >
            A guided, animated, hands-on path from "what is a fork?" to your first merged PR.
          </motion.p>
          <motion.div 
            variants={textRevealVariants}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <ShinyButton 
              onClick={() => navigate("/learn")} 
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 transform transition-transform hover:scale-105 active:scale-95"
            >
              Start the journey
            </ShinyButton>
            <Button size="lg" variant="outline" onClick={() => navigate("/lab")} className="rounded-full px-8 h-12 text-lg transform transition-transform hover:scale-105 hover:bg-foreground hover:text-background active:scale-95">
              Try the terminal
            </Button>
          </motion.div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="flex-1 w-full max-w-lg lg:max-w-none relative aspect-square lg:aspect-video bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black rounded-3xl border border-purple-500/30 shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)] overflow-hidden flex items-center justify-center group"
        >
          <GridBeam className="opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
          {/* Decorative mini Git Graph Hero Animation */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
             <motion.svg className="w-full h-full" viewBox="0 0 400 300">
               <motion.path 
                 d="M 50 250 L 50 150 C 50 100, 150 100, 150 50 L 350 50" 
                 fill="transparent" 
                 stroke="url(#gradient)" 
                 strokeWidth="6" 
                 strokeDasharray="10 10"
                 className="opacity-80"
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
                 transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
               />
               <defs>
                 <linearGradient id="gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#ec4899" />
                   <stop offset="50%" stopColor="#a855f7" />
                   <stop offset="100%" stopColor="#06b6d4" />
                 </linearGradient>
               </defs>
               
               <motion.circle cx="50" cy="250" r="12" className="fill-pink-500" 
                 initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }} 
                 whileHover={{ scale: 1.5 }}
               />
               <motion.circle cx="50" cy="150" r="12" className="fill-purple-500" 
                 initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }} 
               />
               <motion.circle cx="150" cy="50" r="12" className="fill-cyan-500" 
                 initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: "spring" }} 
               />
               <motion.circle cx="350" cy="50" r="12" className="fill-green-400" 
                 initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, type: "spring" }} 
               />
             </motion.svg>
          </div>
          
          {/* Floating animated elements */}
          <motion.div 
            className="absolute top-10 left-10 w-16 h-16 bg-pink-500/10 rounded-xl backdrop-blur-xl border border-pink-500/30 flex items-center justify-center text-pink-500"
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <TerminalSquare />
          </motion.div>
          <motion.div 
            className="absolute bottom-10 right-10 w-20 h-20 bg-cyan-500/10 rounded-full backdrop-blur-xl border border-cyan-500/30 flex items-center justify-center text-cyan-500"
            animate={{ y: [0, 30, 0], rotate: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <BookOpen />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. "Where are you?" selector */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Choose your starting point</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="hover:border-pink-500/60 hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.3)] transition-all duration-300 cursor-pointer group relative overflow-hidden bg-white/60 shadow-lg dark:shadow-none dark:bg-background/50 backdrop-blur-sm border-border/50">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 dark:from-pink-500/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="relative z-10">
              <CardTitle className="text-pink-600 dark:text-pink-500 group-hover:text-pink-700 dark:group-hover:text-pink-400 transition-colors">Never used Git?</CardTitle>
              <CardDescription className="text-foreground/80 font-medium">Start from the very beginning</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-sm text-muted-foreground mb-4">Learn what version control is, how to install Git, and the basic commands.</p>
              <Button className="w-full bg-pink-500/10 dark:bg-pink-500/20 text-pink-700 dark:text-pink-400 hover:bg-pink-500 hover:text-white border border-pink-500/30 dark:border-pink-500/50 transition-colors" onClick={() => navigate("/learn/01")}>Start Module 1</Button>
            </CardContent>
          </Card>
          
          <Card className="hover:border-purple-500/60 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] transition-all duration-300 cursor-pointer group relative overflow-hidden bg-white/60 shadow-lg dark:shadow-none dark:bg-background/50 backdrop-blur-sm border-border/50">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 dark:from-purple-500/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="relative z-10">
              <CardTitle className="text-purple-600 dark:text-purple-500 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">Know Git, never contributed?</CardTitle>
              <CardDescription className="text-foreground/80 font-medium">Learn the open source workflow</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-sm text-muted-foreground mb-4">Master forks, upstream remotes, branching, and pull requests.</p>
              <Button className="w-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 hover:bg-purple-500 hover:text-white border border-purple-500/30 dark:border-purple-500/50 transition-colors" onClick={() => navigate("/workflow")}>See the workflow</Button>
            </CardContent>
          </Card>

          <Card className="hover:border-cyan-500/60 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)] transition-all duration-300 cursor-pointer group relative overflow-hidden bg-white/60 shadow-lg dark:shadow-none dark:bg-background/50 backdrop-blur-sm border-border/50">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 dark:from-cyan-500/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="relative z-10">
              <CardTitle className="text-cyan-600 dark:text-cyan-500 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">Ready for programs?</CardTitle>
              <CardDescription className="text-foreground/80 font-medium">Find a mentorship program</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-sm text-muted-foreground mb-4">Explore GSoC, LFX, MLH Fellowship and prepare your application.</p>
              <Button className="w-full bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 hover:bg-cyan-500 hover:text-white border border-cyan-500/30 dark:border-cyan-500/50 transition-colors" onClick={() => navigate("/programs")}>Explore programs</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. Three-copies explainer (Workflow Visualizer) */}
      <section className="container mx-auto px-4 py-16 relative overflow-hidden rounded-3xl border border-primary/20 shadow-[0_0_50px_-15px_rgba(var(--primary),0.15)] bg-gradient-to-b from-primary/5 to-transparent">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">How open source actually works</h2>
            <p className="text-foreground/80 max-w-2xl mx-auto font-medium">
              You don't edit the original project directly. You make your own copy, change it, and politely ask them to include your changes.
            </p>
          </div>
          <WorkflowVisualizer compact={true} />
          <div className="mt-8 flex justify-center">
            <Button onClick={() => navigate("/workflow")} className="bg-indigo-500 hover:bg-indigo-600 text-white border-0 shadow-lg shadow-indigo-500/30">See the full interactive walkthrough</Button>
          </div>
        </div>
      </section>

      {/* 5. Feature grid (Bento Grid) */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Everything you need to succeed</h2>
        </div>
        <BentoGrid className="max-w-4xl mx-auto">
          <BentoGridItem 
            title="Terminal Lab" 
            description="Practice safely in our virtual terminal before touching real code." 
            icon={<TerminalSquare className="w-6 h-6 text-accent" />} 
            className="md:col-span-2 cursor-pointer"
          />
          <BentoGridItem 
            title="Issue Finder" 
            description="Find beginner-friendly good first issues live from GitHub." 
            icon={<Search className="w-6 h-6 text-blue-500" />} 
          />
          <BentoGridItem 
            title="Mentorship Programs" 
            description="Prepare for GSoC, LFX, and MLH Fellowship." 
            icon={<Briefcase className="w-6 h-6 text-green-500" />} 
          />
          <BentoGridItem 
            title="Rescue Guide" 
            description="Messed up your git? Pick a mistake and we'll show you how to fix it." 
            icon={<ShieldQuestion className="w-6 h-6 text-destructive" />} 
            className="md:col-span-2"
          />
        </BentoGrid>
      </section>

      {/* 6. Numbers Stats */}
      <section className="container mx-auto px-4 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-2xl -z-10" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center bg-white/60 dark:bg-background/60 backdrop-blur-xl border border-border/50 dark:border-white/10 p-8 rounded-3xl shadow-xl">
          <div className="space-y-2">
            <h3 className="text-5xl md:text-6xl font-black bg-gradient-to-br from-pink-500 to-pink-700 dark:from-pink-400 dark:to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
              <NumberTicker value={100} />+
            </h3>
            <p className="text-sm font-bold text-foreground/80 uppercase tracking-widest">Open Source Orgs</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-5xl md:text-6xl font-black bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
              <NumberTicker value={36} />
            </h3>
            <p className="text-sm font-bold text-foreground/80 uppercase tracking-widest">Programs Tracked</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-5xl md:text-6xl font-black bg-gradient-to-br from-green-500 to-green-700 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent drop-shadow-sm">
              <NumberTicker value={12} />
            </h3>
            <p className="text-sm font-bold text-foreground/80 uppercase tracking-widest">Interactive Modules</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-5xl md:text-6xl font-black bg-gradient-to-br from-yellow-500 to-orange-600 dark:from-yellow-400 dark:to-orange-500 bg-clip-text text-transparent drop-shadow-sm">
              <NumberTicker value={10} />
            </h3>
            <p className="text-sm font-bold text-foreground/80 uppercase tracking-widest">Lab Scenarios</p>
          </div>
        </div>
      </section>

      {/* 7. Marquee for Orgs */}
      <section className="container mx-auto px-4 overflow-hidden border-b border-border/50 pb-16">
        <div className="text-center mb-8">
          <p className="text-muted-foreground uppercase tracking-wider text-sm font-semibold">
            Contribute to amazing organizations
          </p>
        </div>
        <Marquee className="max-w-5xl mx-auto" pauseOnHover>
          {["React", "Vue", "Mozilla", "Linux Foundation", "Apache", "CNCF", "Python", "Kubernetes", "Node.js"].map((org) => (
            <div key={org} className="mx-8 px-6 py-3 rounded-full bg-muted/50 border border-border/50 text-foreground font-semibold">
              {org}
            </div>
          ))}
        </Marquee>
      </section>

      {/* 9. FAQ Accordion */}
      <section className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Frequently asked questions</h2>
        </div>
        <Accordion className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Do I need to be an expert to contribute?</AccordionTrigger>
            <AccordionContent>
              Not at all! Many open source projects specifically label issues as "good first issue" or "beginner friendly". These tasks are usually well-scoped and meant to help you learn the codebase and workflow. Contributions can also be documentation fixes, design work, or translation!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I use AI to write my PR?</AccordionTrigger>
            <AccordionContent>
              It depends on the project's policy. Some projects welcome AI-assisted code as long as you take responsibility for its correctness. Others strictly forbid AI-generated code due to copyright or quality concerns. We have a dedicated section on AI policies in the Explore tab. Always check the project's `CONTRIBUTING.md`.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What if my PR is rejected?</AccordionTrigger>
            <AccordionContent>
              Don't take it personally! Rejections happen for many reasons: the feature doesn't align with the roadmap, there's a better way to implement it, or it introduces bugs. Reviewers usually leave constructive feedback. Learn from it, adapt your code, or find another issue to tackle. It's a normal part of the process.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* 10. Final CTA */}
      <section className="container mx-auto px-4 text-center">
        <div className="relative rounded-3xl p-12 md:p-24 overflow-hidden shadow-2xl bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600">
          {/* Animated meshes */}
          <div className="absolute inset-0 bg-white/10 blur-[100px] rounded-full animate-pulse pointer-events-none" />
          <div className="absolute inset-0 bg-cyan-400/20 blur-[100px] rounded-full animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
          
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white drop-shadow-md tracking-tight">Ready to make your mark?</h2>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-medium drop-shadow-sm">
            Join thousands of students who made their first open source contribution this year.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/learn/01")} 
            className="rounded-full px-12 h-16 text-xl bg-white text-purple-700 hover:bg-gray-100 shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)] transition-all font-bold"
          >
            Start your first module
          </Button>
        </div>
      </section>
    </div>
  );
}
