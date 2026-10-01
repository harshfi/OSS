import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WorkflowVisualizer } from "@/components/workflow/WorkflowVisualizer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* 1. Hero */}
      <section className="container mx-auto px-4 pt-20 md:pt-32 pb-16 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            Make your first open-source contribution
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-[600px] mx-auto lg:mx-0">
            A guided, animated, hands-on path from "what is a fork?" to your first merged PR.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Button size="lg" onClick={() => navigate("/learn/01")} className="rounded-full px-8 h-12 text-lg">
              Start the journey
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/lab")} className="rounded-full px-8 h-12 text-lg">
              Try the terminal
            </Button>
          </div>
        </div>
        <div className="flex-1 w-full max-w-lg lg:max-w-none relative aspect-square lg:aspect-video bg-muted/30 rounded-3xl border border-border/50 overflow-hidden flex items-center justify-center">
          {/* Decorative mini Git Graph Hero Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
             <motion.svg className="w-full h-full" viewBox="0 0 400 300">
               <motion.path 
                 d="M 50 250 L 50 150 C 50 100, 150 100, 150 50 L 350 50" 
                 fill="transparent" 
                 stroke="currentColor" 
                 strokeWidth="4" 
                 strokeDasharray="10 10"
                 className="text-primary/30"
               />
               <motion.circle cx="50" cy="250" r="10" className="fill-primary" />
               <motion.circle cx="50" cy="150" r="10" className="fill-primary" />
               <motion.circle cx="150" cy="50" r="10" className="fill-blue-500" />
               <motion.circle cx="350" cy="50" r="10" className="fill-green-500" />
             </motion.svg>
          </div>
        </div>
      </section>

      {/* 2. "Where are you?" selector */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Choose your starting point</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader>
              <CardTitle>Never used Git?</CardTitle>
              <CardDescription>Start from the very beginning</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Learn what version control is, how to install Git, and the basic commands.</p>
              <Button variant="secondary" className="w-full" onClick={() => navigate("/learn/01")}>Start Module 1</Button>
            </CardContent>
          </Card>
          <Card className="hover:border-primary/50 transition-colors cursor-pointer group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader>
              <CardTitle>Know Git, never contributed?</CardTitle>
              <CardDescription>Learn the open source workflow</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Master forks, upstream remotes, branching, and pull requests.</p>
              <Button variant="secondary" className="w-full" onClick={() => navigate("/workflow")}>See the workflow</Button>
            </CardContent>
          </Card>
          <Card className="hover:border-primary/50 transition-colors cursor-pointer group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader>
              <CardTitle>Ready for programs?</CardTitle>
              <CardDescription>Find a mentorship program</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Explore GSoC, LFX, MLH Fellowship and prepare your application.</p>
              <Button variant="secondary" className="w-full" onClick={() => navigate("/programs")}>Explore programs</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. Three-copies explainer (Workflow Visualizer) */}
      <section className="container mx-auto px-4 py-12 bg-muted/20 rounded-3xl border border-border/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How open source actually works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            You don't edit the original project directly. You make your own copy, change it, and politely ask them to include your changes.
          </p>
        </div>
        <WorkflowVisualizer compact={true} />
        <div className="mt-8 flex justify-center">
          <Button onClick={() => navigate("/workflow")}>See the full interactive walkthrough</Button>
        </div>
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
        <div className="bg-primary/10 border border-primary/20 rounded-3xl p-12 md:p-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to make your mark?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who made their first open source contribution this year.
          </p>
          <Button size="lg" onClick={() => navigate("/learn/01")} className="rounded-full px-12 h-14 text-xl">
            Start your first module
          </Button>
        </div>
      </section>
    </div>
  );
}
