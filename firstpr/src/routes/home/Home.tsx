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
import { Badge } from "@/components/ui/badge";
import {
  TerminalSquare,
  BookOpen,
  ShieldQuestion,
  Briefcase,
  Search,
  Award,
  Sparkles,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { WhatsappIcon, WHATSAPP_COMMUNITY_URL } from "@/components/icons/WhatsappIcon";


function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

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
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-lg font-medium rounded-full transform transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
            >
              Start the journey
            </ShinyButton>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate("/lab")} 
              className="rounded-full px-8 h-12 text-lg font-medium transform transition-transform hover:scale-105 hover:bg-foreground hover:text-background active:scale-95"
            >
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

      {/* 5.5 Mentors & Student Success Spotlight */}
      <section className="container mx-auto px-4 relative">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mentorship & Success Spotlight</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Guided by Mentors. Built by Open Source Achievers.
          </h2>
          <p className="text-foreground/80 text-sm md:text-base font-medium leading-relaxed">
            Meet the mentor guiding developers into global open source, and the students who successfully cracked prestigious programs like <strong>Google Summer of Code (GSoC)</strong> and <strong>Linux Foundation Mentorship (LFX)</strong>.
          </p>
        </div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {/* 1. TOP ROW: MENTOR (HARSH TRIPATHI) - CENTERED */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full max-w-lg flex flex-col"
            >
              <Card className="flex-1 flex flex-col justify-between border-2 border-purple-500/40 bg-gradient-to-b from-purple-500/10 via-card to-card hover:border-purple-500/80 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1.5 rounded-2xl overflow-hidden group">
                <CardHeader className="text-center pb-3 pt-6 space-y-3">
                  {/* Avatar with Animated Gradient Ring */}
                  <div className="relative w-28 h-28 mx-auto rounded-full p-1 bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-500 shadow-md shadow-purple-500/30 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src="/avatars/harsh-tripathi.jpg"
                      alt="Harsh Tripathi"
                      className="w-full h-full object-cover rounded-full bg-zinc-900 border-2 border-background"
                    />
                    <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold shadow border border-background">
                      👑
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-center">
                      <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[11px] font-bold tracking-wide uppercase px-2.5 py-0.5 shadow-sm">
                        Lead Mentor & Guide
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">
                      Harsh Tripathi
                    </CardTitle>
                    <CardDescription className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                      Open Source Mentor & Engineering Lead
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 px-6 pb-6 flex-1 flex flex-col justify-between text-xs">
                  <p className="text-foreground/80 leading-relaxed font-medium">
                    Has mentored <strong>10k+ students and developers</strong> into tech and high-growth engineering roles. Delivered across <strong>50+ software products for multiple small and large bussiness</strong>, coaching developers through Git mechanics, software architecture, helping students to excel in there software carrer and cracking competitive programs like GSoC and LFX.
                  </p>

                  {/* Highlight box */}
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-800 dark:text-purple-300 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-[11px]">
                      <GraduationCap className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                      <span>Mentorship Track Record:</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-foreground/80 font-semibold">
                      🏆 10k+ Students Mentored • Delivered Across 50+ Projects • GSoC & LFX Strategy • Git Mastery
                    </p>
                  </div>

                  {/* Social Connect Icons (LinkedIn, Instagram) */}
                  <div className="pt-2 border-t border-border/60 space-y-2">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block text-center">
                      Connect with Mentor
                    </span>
                    <div className="flex items-center justify-center gap-3">
                      <a
                        href="https://www.linkedin.com/in/harsh-tripathi-00017a221/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-muted/60 hover:bg-blue-500/20 hover:text-blue-500 text-muted-foreground transition-all border border-border/50 hover:border-blue-500/40 flex items-center gap-1.5 font-medium"
                        title="LinkedIn Profile"
                      >
                        <LinkedinIcon className="w-4 h-4" />
                        <span className="text-[11px]">LinkedIn</span>
                      </a>
                      <a
                        href="https://www.instagram.com/harsh_tripathi_2210/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-muted/60 hover:bg-pink-500/20 hover:text-pink-500 text-muted-foreground transition-all border border-border/50 hover:border-pink-500/40 flex items-center gap-1.5 font-medium"
                        title="Instagram Profile"
                      >
                        <InstagramIcon className="w-4 h-4" />
                        <span className="text-[11px]">Instagram</span>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* 2. BOTTOM ROW: 2 STUDENTS (SIDE-BY-SIDE) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {/* Student 1: Sapnil Biswas (GSoC @ Drupal) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col"
            >
              <Card className="flex-1 flex flex-col justify-between border-2 border-blue-500/40 bg-gradient-to-b from-blue-500/10 via-card to-card hover:border-blue-500/80 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1.5 rounded-2xl overflow-hidden group">
                <CardHeader className="text-center pb-3 pt-6 space-y-3">
                  {/* Avatar with Animated Gradient Ring */}
                  <div className="relative w-28 h-28 mx-auto rounded-full p-1 bg-gradient-to-tr from-blue-600 via-cyan-400 to-indigo-500 shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src="/avatars/sapnil-biswas.png"
                      alt="Sapnil Biswas"
                      className="w-full h-full object-cover rounded-full bg-zinc-900 border-2 border-background"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://github.com/sapnilbiswas.png";
                      }}
                    />
                    <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow border border-background">
                      ⚡
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-center">
                      <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-[11px] font-bold tracking-wide uppercase px-2.5 py-0.5 shadow-sm">
                        GSoC Contributor • Drupal
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">
                      Sapnil Biswas
                    </CardTitle>
                    <CardDescription className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      Google Summer of Code '26 @ Drupal Org
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 px-6 pb-6 flex-1 flex flex-col justify-between text-xs">
                  <p className="text-foreground/80 leading-relaxed font-medium">
                    My open-source journey began with Sugar Labs' Music Blocks, where I made 55+ commits and now serve as a code reviewer. At Drupal, I hold maintainer status with 55+ credits and completed Google Summer of Code 2026 by building an AI-powered field translation module. I also maintain ExtensionShield.
                  </p>

                  {/* Highlight box */}
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-800 dark:text-blue-300 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-[11px]">
                      <Award className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>Program Achievement:</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-foreground/80 font-semibold">
                      🎉 Selected & Successfully Cleared GSoC '26 with Drupal Org
                    </p>
                  </div>

                  {/* Social Connect Icons (GitHub, LinkedIn) */}
                  <div className="pt-2 border-t border-border/60 space-y-2">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block text-center">
                      Connect with Sapnil
                    </span>
                    <div className="flex items-center justify-center gap-3">
                      <a
                        href="https://github.com/sapnilbiswas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-muted/60 hover:bg-purple-500/20 hover:text-purple-500 text-muted-foreground transition-all border border-border/50 hover:border-purple-500/40 flex items-center gap-1.5 font-medium"
                        title="GitHub Profile"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span className="text-[11px]">GitHub</span>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/sapnil-biswas-992841403/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-muted/60 hover:bg-blue-500/20 hover:text-blue-500 text-muted-foreground transition-all border border-border/50 hover:border-blue-500/40 flex items-center gap-1.5 font-medium"
                        title="LinkedIn Profile"
                      >
                        <LinkedinIcon className="w-4 h-4" />
                        <span className="text-[11px]">LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Student 2: Dhruvesh Mishra (LFX @ Meshery / CNCF) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col"
            >
              <Card className="flex-1 flex flex-col justify-between border-2 border-emerald-500/40 bg-gradient-to-b from-emerald-500/10 via-card to-card hover:border-emerald-500/80 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-1.5 rounded-2xl overflow-hidden group">
                <CardHeader className="text-center pb-3 pt-6 space-y-3">
                  {/* Avatar with Animated Gradient Ring */}
                  <div className="relative w-28 h-28 mx-auto rounded-full p-1 bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 shadow-md shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src="/avatars/dhruvesh-mishra.jpg"
                      alt="Dhruvesh Mishra"
                      className="w-full h-full object-cover rounded-full bg-zinc-900 border-2 border-background"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://github.com/dhruveshmishra.png";
                      }}
                    />
                    <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shadow border border-background">
                      🚀
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-center">
                      <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-bold tracking-wide uppercase px-2.5 py-0.5 shadow-sm">
                        LFX Mentee • Meshery (CNCF)
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">
                      Dhruvesh Mishra
                    </CardTitle>
                    <CardDescription className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      Linux Foundation Mentorship '26 @ Meshery (CNCF)
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 px-6 pb-6 flex-1 flex flex-col justify-between text-xs">
                  <p className="text-foreground/80 leading-relaxed font-medium">
                    My open-source journey began with active contributions across cloud-native ecosystems, authoring core features in Meshery (CNCF) and Layer5. Selected for Linux Foundation Mentorship (LFX 2026) where I engineered visual service mesh kanvas design, MeshModel component integrations, and distributed multi-cluster Kubernetes orchestration.
                  </p>

                  {/* Highlight box */}
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-[11px]">
                      <Award className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Program Achievement:</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-foreground/80 font-semibold">
                      🎉 Selected & Successfully Cleared LFX '26 • Meshery (CNCF)
                    </p>
                  </div>

                  {/* Social Connect Icons (GitHub, LinkedIn) */}
                  <div className="pt-2 border-t border-border/60 space-y-2">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block text-center">
                      Connect with Dhruvesh
                    </span>
                    <div className="flex items-center justify-center gap-3">
                      <a
                        href="https://github.com/dhruveshmishra"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-muted/60 hover:bg-emerald-500/20 hover:text-emerald-500 text-muted-foreground transition-all border border-border/50 hover:border-emerald-500/40 flex items-center gap-1.5 font-medium"
                        title="GitHub Profile"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span className="text-[11px]">GitHub</span>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/dhruvesh-mishra-291845376/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-muted/60 hover:bg-blue-500/20 hover:text-blue-500 text-muted-foreground transition-all border border-border/50 hover:border-blue-500/40 flex items-center gap-1.5 font-medium"
                        title="LinkedIn Profile"
                      >
                        <LinkedinIcon className="w-4 h-4" />
                        <span className="text-[11px]">LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5.6 WhatsApp Community Showcase Section */}
      <section className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-8 md:p-12 overflow-hidden border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-background to-teal-500/10 shadow-[0_0_50px_-15px_rgba(37,211,102,0.25)]"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Content */}
            <div className="space-y-6 text-center lg:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <WhatsappIcon className="w-4 h-4 fill-current" />
                <span>Official FirstPR WhatsApp Community</span>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
                  Learn, Build & Crack Programs <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent">Together</span>
                </h2>
                <p className="text-foreground/80 text-sm md:text-base max-w-2xl font-medium leading-relaxed">
                  Join hundreds of open source enthusiasts, mentors, and successful GSoC & LFX scholars. Get instantaneous answers to your doubts, merge conflict help, and curated issue alerts.
                </p>
              </div>

              {/* Feature Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto lg:mx-0 text-xs text-foreground/90 font-medium">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-card/60 backdrop-blur-sm border border-border/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Direct Q&A with Harsh Tripathi & Mentors</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-card/60 backdrop-blur-sm border border-border/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>GSoC '26 & LFX '26 Application Reviews</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-card/60 backdrop-blur-sm border border-border/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Daily Handpicked Good First Issues</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-card/60 backdrop-blur-sm border border-border/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Live Git & PR Debugging Sessions</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href={WHATSAPP_COMMUNITY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-base font-bold shadow-[0_4px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_35px_rgba(37,211,102,0.6)] transform hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  <WhatsappIcon className="w-6 h-6 fill-white" />
                  <span>Join WhatsApp Community</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <span className="text-xs text-muted-foreground font-semibold">
                  ⚡ 100% Free • Direct Access
                </span>
              </div>
            </div>

            {/* Right Interactive Mockup / Badge Box */}
            <div className="w-full lg:w-80 flex flex-col items-center">
              <div className="w-full p-6 rounded-2xl bg-card/80 dark:bg-card/40 backdrop-blur-xl border border-emerald-500/30 shadow-xl space-y-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
                  <WhatsappIcon className="w-9 h-9 fill-current" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">FirstPR Community</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">WhatsApp Group & Discussion Hub</p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Community Active Now</span>
                </div>

                <a
                  href={WHATSAPP_COMMUNITY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Click to Enter Community
                </a>
              </div>
            </div>
          </div>
        </motion.div>
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
