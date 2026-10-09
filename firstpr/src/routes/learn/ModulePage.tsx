import { useParams, useNavigate } from "react-router-dom";
import { modules } from "@/components/learn/ModuleData";
import type { Block } from "@/components/learn/ModuleData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ChevronRight, Info, AlertTriangle } from "lucide-react";
import { useProgress } from "@/stores/progress";
import { WorkflowVisualizer } from "@/components/workflow/WorkflowVisualizer";
import { GitGraphVisualizer } from "@/components/workflow/GitGraphVisualizer";
import { ModuleAnimationShell } from "@/components/animations/ModuleAnimationShell";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export default function ModulePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { completedModules, completeModule } = useProgress();
  
  const moduleIndex = modules.findIndex((m) => m.id === id);
  const mod = modules[moduleIndex];

  const [activeStep, setActiveStep] = useState<number | undefined>(undefined);
  const [activeScenario, setActiveScenario] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!mod) return;
    const diagrams = mod.blocks.filter(b => b.type === "Diagram" && typeof b.stepIndex === 'number');
    const gitGraphs = mod.blocks.filter(b => b.type === "GitGraph" && typeof b.content === 'string');
    
    if (diagrams.length > 0) {
      setActiveStep(diagrams[0].stepIndex);
      setActiveScenario(undefined);
    } else if (gitGraphs.length > 0) {
      setActiveScenario(gitGraphs[0].content as any);
      setActiveStep(undefined);
    } else {
      setActiveStep(undefined);
      setActiveScenario(undefined);
    }
  }, [mod]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const step = entry.target.getAttribute("data-step");
            const scenario = entry.target.getAttribute("data-scenario");
            if (step !== null) {
              setActiveStep(parseInt(step, 10));
              setActiveScenario(undefined);
            }
            if (scenario !== null) {
              setActiveScenario(scenario as any);
              setActiveStep(undefined);
            }
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px" }
    );

    document.querySelectorAll(".diagram-marker").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [mod]);

  if (!mod) {
    return <div className="container mx-auto p-20 text-center">Module not found</div>;
  }

  const isLast = moduleIndex === modules.length - 1;
  const nextMod = !isLast ? modules[moduleIndex + 1] : null;

  const hasDiagram = mod.blocks.some(b => b.type === "Diagram" || b.type === "GitGraph");

  return (
    <div className="container max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col xl:flex-row gap-10 min-h-screen">
      {/* Left sidebar - Progress (Desktop) */}
      <div className="hidden xl:block w-64 shrink-0">
        <div className="sticky top-28 space-y-4">
          <h3 className="font-bold text-lg mb-6">Course progress</h3>
          <div className="space-y-3 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-border before:-z-10">
            {modules.map((m, idx) => {
              const isActive = m.id === id;
              const isPast = completedModules.includes(m.id);
              return (
                <div key={m.id} className="flex items-start gap-4">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300",
                    isActive ? 'bg-primary text-primary-foreground shadow-md shadow-primary/30 ring-4 ring-primary/20 scale-110' : 
                    isPast ? 'bg-primary text-primary-foreground' : 'bg-muted border border-border'
                  )}>
                    {isPast && !isActive ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
                  </div>
                  <div className="flex flex-col pb-4">
                    <button onClick={() => navigate(`/learn/${m.id}`)} className={cn(
                      "text-sm font-medium text-left transition-colors duration-200 hover:text-foreground",
                      isActive ? 'text-foreground font-bold' : 'text-muted-foreground'
                    )}>
                      {m.title}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Split layout wrapper */}
      <div className="flex-1 min-w-0 flex flex-col lg:flex-row gap-16 lg:gap-12">
        {/* Main Content Side */}
        <div className={cn(
          "flex-1 flex flex-col min-w-0",
          hasDiagram ? "max-w-3xl" : "max-w-4xl mx-auto w-full"
        )}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="text-primary font-mono text-xs tracking-widest uppercase font-bold bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                Module {mod.id}
              </div>
              <div className="xl:hidden text-muted-foreground text-xs font-mono font-semibold bg-muted px-3 py-1 rounded-full border border-border">
                {moduleIndex + 1} / {modules.length}
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-[1.15]">{mod.title}</h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">{mod.description}</p>
          </motion.div>

          <div className="space-y-12 pb-16">
            {mod.blocks.map((block, i) => (
              <motion.div 
                key={block.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <BlockRenderer block={block} />
              </motion.div>
            ))}
          </div>

          {/* Footer / Next Button */}
          <div className="mt-auto pt-10 border-t border-border flex justify-end pb-24">
            {nextMod ? (
              <Button 
                size="lg" 
                onClick={() => {
                  completeModule(mod.id);
                  navigate(`/learn/${nextMod.id}`);
                  window.scrollTo(0, 0);
                }} 
                className="gap-3 shadow-xl hover:shadow-2xl shadow-primary/20 hover:-translate-y-1 transition-all h-14 px-8 text-base rounded-2xl"
              >
                Complete & Continue <ChevronRight className="w-5 h-5" />
              </Button>
            ) : (
              <Button 
                size="lg" 
                onClick={() => {
                  completeModule(mod.id);
                  navigate("/learn");
                }} 
                variant="secondary"
                className="shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-14 px-8 text-base rounded-2xl border border-border"
              >
                Finish Course
              </Button>
            )}
          </div>
        </div>

        {/* Diagram Side (Right Panel) */}
        {hasDiagram && (
          <div className="hidden lg:block lg:w-[45%] shrink-0 relative">
            <div className="sticky top-28 h-[calc(100vh-10rem)] flex items-center justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, type: "spring", bounce: 0 }}
                className="w-full h-full max-h-[850px] flex flex-col justify-start overflow-y-auto no-scrollbar py-4"
              >
                <ModuleAnimationShell 
                  key={mod.id}
                  moduleId={mod.id} 
                  className="my-auto"
                />
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "Prose":
      return <p className="leading-relaxed text-lg sm:text-[1.15rem] text-foreground/90">{block.content}</p>;
    
    case "Callout":
      const isWarning = block.variant === 'warning';
      const isSuccess = block.variant === 'success';
      return (
        <div className={cn(
          "p-6 rounded-3xl border-2 flex gap-5 shadow-sm transition-all hover:shadow-md",
          isWarning 
            ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-950 dark:text-yellow-200' 
            : isSuccess
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-950 dark:text-emerald-200'
              : 'bg-blue-500/10 border-blue-500/20 text-blue-950 dark:text-blue-200'
        )}>
          <div className="shrink-0 mt-1">
            {isWarning ? <AlertTriangle className="w-7 h-7 text-yellow-600 dark:text-yellow-400" /> 
              : isSuccess ? <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
              : <Info className="w-7 h-7 text-blue-600 dark:text-blue-400" />}
          </div>
          <div>
            {block.title && <h5 className="font-bold text-xl mb-1.5 tracking-tight">{block.title}</h5>}
            <div className="text-[1.05rem] opacity-90 leading-relaxed">{block.content}</div>
          </div>
        </div>
      );

    case "Code":
      return (
        <div className="rounded-[2rem] overflow-hidden border border-border shadow-xl group bg-[#0d1117] transition-all hover:shadow-2xl hover:border-primary/30">
          {block.title && (
            <div className="bg-[#161b22] px-6 py-3.5 text-[11px] font-mono font-bold text-gray-400 border-b border-gray-800 flex items-center justify-between">
              <span>{block.title}</span>
              <span className="opacity-50 tracking-widest uppercase">{block.language || 'bash'}</span>
            </div>
          )}
          <pre className="p-6 overflow-x-auto text-[15px] font-mono leading-relaxed text-gray-300">
            <code>{block.content}</code>
          </pre>
        </div>
      );

    case "Cards": {
      const leftLabel = block.cardLabels?.left || "Myth";
      const rightLabel = block.cardLabels?.right || "Fact";
      const isNegative = leftLabel === "Myth" || leftLabel === "Bad";
      
      const leftHoverBg = isNegative ? "group-hover:bg-destructive/5" : "group-hover:bg-blue-500/5";
      const leftTextColor = isNegative ? "text-destructive" : "text-blue-500";
      const leftDotColor = isNegative ? "bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]";

      const rightHoverBg = isNegative ? "group-hover:bg-emerald-500/5" : "group-hover:bg-primary/5";
      const rightTextColor = isNegative ? "text-emerald-500" : "text-primary";
      const rightDotColor = isNegative ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-primary shadow-[0_0_8px_rgba(168,85,247,0.5)]";

      return (
        <div className="space-y-6">
          {block.title && <h3 className="text-2xl font-extrabold tracking-tight">{block.title}</h3>}
          <div className="grid sm:grid-cols-2 gap-6">
            {block.items?.map((item, i) => (
              <Card key={i} className="bg-card border-border/60 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 rounded-3xl overflow-hidden group">
                <CardHeader className={cn("pb-4 bg-muted/40 border-b border-border/40 transition-colors", leftHoverBg)}>
                  <div className={cn("text-[11px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2", leftTextColor)}>
                    <span className={cn("w-2 h-2 rounded-full", leftDotColor)}></span>
                    {leftLabel}
                  </div>
                  <CardTitle className="text-[1.1rem] leading-snug">{item.left || item.myth}</CardTitle>
                </CardHeader>
                <CardContent className={cn("pt-5 transition-colors", rightHoverBg)}>
                  <div className={cn("text-[11px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2", rightTextColor)}>
                    <span className={cn("w-2 h-2 rounded-full", rightDotColor)}></span>
                    {rightLabel}
                  </div>
                  <p className="text-[1.05rem] text-muted-foreground leading-relaxed">{item.right || item.fact}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    case "MatchGame":
      return (
        <div className="p-8 border border-border/60 rounded-3xl bg-card shadow-lg hover:shadow-xl transition-all">
          <h3 className="font-extrabold text-2xl mb-6 flex items-center gap-3 tracking-tight">
            <span className="bg-primary/10 text-primary w-10 h-10 flex items-center justify-center rounded-xl text-xl">🧩</span>
            Match the terms
          </h3>
          <div className="grid gap-3">
            {block.items?.map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-4 sm:items-center p-4 rounded-2xl border border-transparent hover:border-border hover:bg-muted/50 transition-all cursor-default">
                <span className="font-mono font-bold text-lg w-40 shrink-0 text-foreground bg-background px-3 py-1.5 rounded-lg border border-border shadow-sm text-center sm:text-left">{item.term}</span>
                <span className="text-muted-foreground text-[1.05rem] leading-relaxed">{item.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "Checklist":
      return (
        <div className="space-y-5 p-8 border border-border/60 rounded-3xl bg-card shadow-lg hover:shadow-xl transition-all">
          {block.items?.map((item, i) => (
            <label key={i} className="flex items-start gap-4 cursor-pointer group">
              <div className="w-7 h-7 rounded-xl border-2 border-primary/40 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/10 group-hover:border-primary transition-all shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity scale-50 group-hover:scale-100 duration-300" />
              </div>
              <span className="text-[1.1rem] text-foreground/90 leading-relaxed group-hover:text-foreground transition-colors pt-0.5">{item}</span>
            </label>
          ))}
        </div>
      );

    case "Diagram":
      if (typeof block.stepIndex === 'number') {
        return (
          <div className="diagram-marker relative py-4" data-step={block.stepIndex}>
            {/* Mobile/Tablet inline diagram */}
            <div className="block lg:hidden my-12">
              <WorkflowVisualizer 
                stepIndex={block.stepIndex} 
                showControls={false} 
                compact={true} 
                orientation="vertical"
              />
            </div>
            {/* Desktop observer target */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 opacity-0 pointer-events-none" />
          </div>
        );
      }
      return null;

    case "GitGraph":
      if (typeof block.content === 'string') {
        return (
          <div className="diagram-marker relative py-4" data-scenario={block.content}>
            {/* Mobile/Tablet inline diagram */}
            <div className="block lg:hidden my-12">
              <GitGraphVisualizer 
                scenario={block.content as any} 
                className="w-full scale-95 origin-center"
              />
            </div>
            {/* Desktop observer target */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 opacity-0 pointer-events-none" />
          </div>
        );
      }
      return null;

    default:
      return <div className="p-4 bg-destructive/10 text-destructive rounded-md">Unsupported block type: {block.type}</div>;
  }
}

