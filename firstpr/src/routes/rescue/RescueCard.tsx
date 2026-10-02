import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle, Copy, TerminalSquare, Info, Check, BookOpen, X, Monitor } from "lucide-react";
import { toast } from "sonner";
import { type RescueSituation } from "@/content/rescue";
import { useRescueVarsStore } from "@/stores/rescue";

export function RescueCard({
  situation,
  onClose,
  initialContext
}: {
  situation: RescueSituation;
  onClose: () => void;
  initialContext?: any;
}) {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const { vars, setVar } = useRescueVarsStore();
  
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  
  const [pushed, setPushed] = useState(initialContext?.pushed ?? false);
  const [prOpen, setPrOpen] = useState(initialContext?.prOpen ?? false);

  const isMac = useMemo(() => typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes("mac"), []);
  const isWindows = useMemo(() => typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes("win"), []);
  const osType = isMac ? 'mac' : isWindows ? 'windows' : 'linux';

  // Extract placeholders from all steps
  const placeholders = useMemo(() => {
    const regex = /<([a-z0-9\-]+)>/g;
    const found = new Set<string>();
    situation.steps.forEach(s => {
      let match;
      if (s.command) {
        while ((match = regex.exec(s.command)) !== null) {
          found.add(match[1]);
        }
      }
    });
    return Array.from(found);
  }, [situation]);

  // Determine active steps based on `when`
  const activeSteps = useMemo(() => {
    return situation.steps.filter(s => {
      if (!s.when) return true;
      if (s.when.pushed !== undefined && s.when.pushed !== pushed) return false;
      if (s.when.prOpen !== undefined && s.when.prOpen !== prOpen) return false;
      return true;
    });
  }, [situation, pushed, prOpen]);

  const hasDestructive = activeSteps.some(s => s.destructive);

  const renderWithHighlights = (text: string) => {
    const parts = text.split(/(<[^>]+>)/g);
    return parts.map((part, i) => {
      if (part.startsWith("<") && part.endsWith(">")) {
        const varName = part.slice(1, -1);
        const val = vars[varName];
        return (
          <span key={i} className={`font-bold px-1 rounded mx-0.5 ${val ? 'text-primary bg-primary/20' : 'text-orange-300 bg-orange-500/10'}`}>
            {val || part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const processCommand = (cmd: string) => {
    let processed = cmd;
    placeholders.forEach(p => {
      const val = vars[p];
      if (val) {
        processed = processed.replace(new RegExp(`<${p}>`, 'g'), val);
      }
    });
    return processed;
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyAllCommands = () => {
    const text = activeSteps
      .filter(s => s.command || s.note)
      .map(s => {
        let line = "";
        if (s.note) line += `# ${s.note}\n`;
        if (s.command) line += `${processCommand(s.command)}\n`;
        return line;
      })
      .filter(Boolean)
      .join("");
      
    navigator.clipboard.writeText(text);
    toast.success("All commands copied!");
  };

  const handleFeedback = (worked: boolean) => {
    setFeedbackGiven(true);
    toast.success(worked ? "Awesome! Glad it helped." : "Thanks for the feedback. We'll improve this!");
  };

  return (
    <motion.div
      id="fix-card"
      key={situation.id}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      className="mt-8"
    >
      <Card className="border-2 border-primary/20 shadow-xl relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-2 h-full ${situation.severity === 'danger' ? 'bg-red-500' : situation.severity === 'warning' ? 'bg-amber-500' : 'bg-primary'}`} />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 rounded-full"
          onClick={onClose}
          aria-label="Close fix card"
        >
          <X className="w-5 h-5" />
        </Button>
        <CardHeader className="pr-12">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant={
              situation.severity === "danger" ? "destructive" :
              situation.severity === "warning" ? "default" : "secondary"
            } className={situation.severity === "warning" ? "bg-amber-500 hover:bg-amber-600 text-white" : ""}>
              {situation.severity.toUpperCase()}
            </Badge>
            <Badge variant="outline">{situation.category}</Badge>
          </div>
          <CardTitle className="text-2xl">{situation.title}</CardTitle>
          <CardDescription className="text-base text-foreground/80">{renderWithHighlights(situation.whyItHappens)}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {(situation.banner || situation.beforeYouStart || situation.severity === 'danger' || situation.severity === 'warning') && (
            <div className={`p-4 rounded-lg flex gap-3 items-start border ${
              situation.severity === 'danger' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
              'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400'
            }`}>
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold mb-1">
                  {situation.severity === 'danger' ? 'Danger' : 'Before you start'}
                </div>
                <div className="text-sm">
                  {renderWithHighlights(situation.banner || situation.beforeYouStart || "Proceed with caution.")}
                </div>
              </div>
            </div>
          )}

          {/* Context Toggles */}
          {(situation.steps.some(s => s.when?.pushed !== undefined) || situation.steps.some(s => s.when?.prOpen !== undefined)) && (
            <div className="bg-secondary/30 p-4 rounded-lg flex flex-wrap gap-6 items-center">
              <span className="text-sm font-medium">Customize solution:</span>
              {situation.steps.some(s => s.when?.pushed !== undefined) && (
                <div className="flex items-center space-x-2">
                  <Switch id="already-pushed" checked={pushed} onCheckedChange={setPushed} />
                  <Label htmlFor="already-pushed">Already pushed?</Label>
                </div>
              )}
              {situation.steps.some(s => s.when?.prOpen !== undefined) && (
                <div className="flex items-center space-x-2">
                  <Switch id="pr-open" checked={prOpen} onCheckedChange={setPrOpen} />
                  <Label htmlFor="pr-open">Is a PR open?</Label>
                </div>
              )}
            </div>
          )}

          {/* Placeholders Form */}
          {placeholders.length > 0 && (
            <div className="bg-secondary/40 p-4 rounded-lg border border-border/50">
              <h4 className="font-semibold text-sm mb-3">Fill in the blanks to personalize commands:</h4>
              <div className="flex flex-wrap gap-4">
                {placeholders.map(p => (
                  <div key={p} className="flex-1 min-w-[150px] max-w-[250px]">
                    <Label htmlFor={`var-${p}`} className="text-xs mb-1 block capitalize">{p.replace(/-/g, ' ')}</Label>
                    <Input 
                      id={`var-${p}`} 
                      className="h-8"
                      value={vars[p] || ""}
                      onChange={(e) => setVar(p, e.target.value)}
                      placeholder={`<${p}>`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">How to fix it:</h3>
                {hasDestructive && (
                  <Badge variant="outline" className="text-amber-500 border-amber-500/30 bg-amber-500/10">Destructive Actions</Badge>
                )}
              </div>
              
              <div className="flex gap-2">
                {hasDestructive && (
                  <Button variant="outline" size="sm" onClick={() => navigate('/rescue?issue=rename-branch')}>
                    <AlertTriangle className="w-4 h-4 mr-2" /> Backup first
                  </Button>
                )}
                {activeSteps.some(s => s.command) && (
                  <Button variant="outline" size="sm" onClick={copyAllCommands}>
                    <Copy className="w-4 h-4 mr-2" /> Copy all
                  </Button>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              {activeSteps.map((step, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-2 md:items-start">
                  <div className="md:w-1/3 text-sm text-muted-foreground pt-1 flex gap-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 shrink-0 rounded-full bg-primary/10 text-primary text-xs font-bold">{i + 1}</span>
                    <span>{renderWithHighlights(step.text)}</span>
                  </div>
                  <div className="flex-1">
                    {step.command && (
                      <div className="flex gap-2">
                        <div className="flex-1 overflow-x-auto relative group">
                          <code className="block bg-zinc-950 text-green-400 p-3 rounded-md font-mono text-sm whitespace-nowrap border border-zinc-800">
                            {renderWithHighlights(step.command)}
                          </code>
                          {step.destructive && (
                            <div className="absolute top-0 right-0 h-full w-1 bg-red-500" />
                          )}
                        </div>
                        <Button 
                          variant={step.destructive ? "destructive" : "secondary"}
                          className={step.destructive ? "hover:bg-red-600" : ""}
                          size="icon" 
                          onClick={() => copyToClipboard(processCommand(step.command!), `${situation.id}-cmd-${i}`)}
                          aria-label={`Copy command ${i + 1}`}
                        >
                          {copiedId === `${situation.id}-cmd-${i}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    )}
                    {step.note && (
                      <div className="text-xs text-muted-foreground mt-2 flex items-start gap-1">
                        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{renderWithHighlights(step.note)}</span>
                      </div>
                    )}
                    {step.osNotes && step.osNotes[osType as keyof typeof step.osNotes] && (
                      <div className="text-xs text-blue-400 mt-2 flex items-start gap-1 bg-blue-500/10 p-2 rounded border border-blue-500/20">
                        <Monitor className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{step.osNotes[osType as keyof typeof step.osNotes]}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {situation.verify && (
            <div className="bg-secondary/40 p-4 rounded-lg border border-border/50">
              <div className="font-semibold flex items-center gap-2 mb-1">
                <Check className="w-4 h-4 text-green-500" /> Check it worked
              </div>
              <div className="text-sm text-muted-foreground">
                {renderWithHighlights(situation.verify)}
              </div>
            </div>
          )}

          <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-border/50">
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {situation.labScenarioId && (
                <Button onClick={() => navigate(`/lab?scenario=${situation.labScenarioId}`)} className="flex-1 sm:flex-none gap-2">
                  <TerminalSquare className="w-4 h-4" /> Try in Lab
                </Button>
              )}
              {situation.relatedModuleSlug && (
                <Button variant="secondary" onClick={() => navigate(`/learn/${situation.relatedModuleSlug}`)} className="flex-1 sm:flex-none gap-2">
                  <BookOpen className="w-4 h-4" /> Full lesson
                </Button>
              )}
              {situation.related && situation.related.map(rel => (
                <Button key={rel} variant="outline" onClick={() => navigate(`/rescue?issue=${rel}`)} className="flex-1 sm:flex-none">
                  See: {rel.replace(/-/g, ' ')}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <span className="text-sm font-medium">Did this fix it?</span>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant={feedbackGiven ? "secondary" : "outline"} 
                  onClick={() => handleFeedback(true)}
                  disabled={feedbackGiven}
                >
                  Yes
                </Button>
                <Button 
                  size="sm" 
                  variant={feedbackGiven ? "secondary" : "outline"} 
                  onClick={() => handleFeedback(false)}
                  disabled={feedbackGiven}
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
