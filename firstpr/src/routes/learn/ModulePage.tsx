import { useParams, useNavigate } from "react-router-dom";
import { modules } from "@/components/learn/ModuleData";
import type { Block } from "@/components/learn/ModuleData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ChevronRight, Info, AlertTriangle } from "lucide-react";

export default function ModulePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const moduleIndex = modules.findIndex((m) => m.id === id);
  const mod = modules[moduleIndex];

  if (!mod) {
    return <div className="container mx-auto p-20 text-center">Module not found</div>;
  }

  const isLast = moduleIndex === modules.length - 1;
  const nextMod = !isLast ? modules[moduleIndex + 1] : null;

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-12">
      {/* Left sidebar - Progress (Desktop) */}
      <div className="hidden md:block w-64 shrink-0">
        <div className="sticky top-24 space-y-4">
          <h3 className="font-semibold text-lg mb-6">Course progress</h3>
          <div className="space-y-2 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-border before:-z-10">
            {modules.map((m, idx) => {
              const isActive = m.id === id;
              const isPast = idx < moduleIndex;
              return (
                <div key={m.id} className="flex items-start gap-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isActive ? 'bg-primary text-primary-foreground' : isPast ? 'bg-primary text-primary-foreground' : 'bg-muted border border-border'}`}>
                    {isPast ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs">{idx + 1}</span>}
                  </div>
                  <div className="flex flex-col pb-6">
                    <button onClick={() => navigate(`/learn/${m.id}`)} className={`text-sm font-medium text-left ${isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                      {m.title}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 max-w-2xl">
        <div className="mb-8">
          <div className="text-primary font-mono text-sm mb-2">Module {mod.id}</div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">{mod.title}</h1>
          <p className="text-xl text-muted-foreground">{mod.description}</p>
        </div>

        <div className="space-y-10">
          {mod.blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>

        {/* Footer / Next Button */}
        <div className="mt-16 pt-8 border-t border-border flex justify-end">
          {nextMod ? (
            <Button size="lg" onClick={() => navigate(`/learn/${nextMod.id}`)} className="gap-2">
              Next: {nextMod.title} <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button size="lg" onClick={() => navigate("/")} variant="secondary">
              Finish Course
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "Prose":
      return <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">{block.content}</p>;
    
    case "Callout":
      return (
        <div className={`p-4 rounded-xl border flex gap-4 ${block.variant === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-900 dark:text-yellow-200' : 'bg-blue-500/10 border-blue-500/20 text-blue-900 dark:text-blue-200'}`}>
          <div className="shrink-0 mt-1">
            {block.variant === 'warning' ? <AlertTriangle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
          </div>
          <div>
            {block.title && <h5 className="font-semibold mb-1">{block.title}</h5>}
            <div className="text-sm opacity-90">{block.content}</div>
          </div>
        </div>
      );

    case "Code":
      return (
        <div className="rounded-xl overflow-hidden border border-border">
          {block.title && <div className="bg-muted px-4 py-2 text-xs font-mono text-muted-foreground border-b">{block.title}</div>}
          <pre className="p-4 bg-zinc-950 text-zinc-50 overflow-x-auto text-sm font-mono">
            <code>{block.content}</code>
          </pre>
        </div>
      );

    case "Cards":
      return (
        <div className="space-y-4">
          {block.title && <h3 className="text-xl font-bold">{block.title}</h3>}
          <div className="grid sm:grid-cols-2 gap-4">
            {block.items?.map((item, i) => (
              <Card key={i} className="bg-card">
                <CardHeader className="pb-2">
                  <div className="text-xs font-bold text-destructive uppercase tracking-wider mb-1">Myth</div>
                  <CardTitle className="text-base">{item.myth}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs font-bold text-green-500 uppercase tracking-wider mb-1 mt-2">Fact</div>
                  <p className="text-sm text-muted-foreground">{item.fact}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );

    case "MatchGame":
      return (
        <div className="p-6 border rounded-xl bg-card">
          <h3 className="font-semibold mb-4">Match the terms (Interactive Demo)</h3>
          <div className="grid gap-2">
            {block.items?.map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 sm:items-center p-2 rounded hover:bg-muted">
                <span className="font-mono font-bold w-32 shrink-0">{item.term}</span>
                <span className="text-muted-foreground text-sm">{item.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "Checklist":
      return (
        <div className="space-y-3 p-6 border rounded-xl bg-card">
          {block.items?.map((item, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer group">
              <div className="w-5 h-5 rounded border border-primary flex items-center justify-center group-hover:bg-primary/10"></div>
              <span className="text-base">{item}</span>
            </label>
          ))}
        </div>
      );

    default:
      return <div className="p-4 bg-destructive/10 text-destructive rounded-md">Unsupported block type: {block.type}</div>;
  }
}
