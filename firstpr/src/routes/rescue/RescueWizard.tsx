import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { wizardNodes, type WizardNode } from "@/content/rescue";
import { ArrowRight, ArrowLeft } from "lucide-react";

export function RescueWizard({ open, onOpenChange, onSelectScenario }: { open: boolean, onOpenChange: (open: boolean) => void, onSelectScenario: (id: string, context?: any) => void }) {
  const [history, setHistory] = useState<WizardNode[]>([]);
  const [currentNodeId, setCurrentNodeId] = useState<string>("start");

  const currentNode = wizardNodes.find(n => n.id === currentNodeId);

  useEffect(() => {
    if (open) {
      setHistory([]);
      setCurrentNodeId("start");
    }
  }, [open]);

  if (!currentNode) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Not sure what's wrong?</DialogTitle>
          <DialogDescription>
            Answer a few questions and we'll point you to the right fix.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <h3 className="font-medium text-lg">{currentNode.question}</h3>
          
          <div className="flex flex-col gap-2">
            {currentNode.options.map((opt, i) => (
              <Button
                key={i}
                variant="outline"
                className="justify-between h-auto py-3 px-4 text-left font-normal"
                onClick={() => {
                  if (opt.scenarioId) {
                    onSelectScenario(opt.scenarioId, opt.setContext);
                    onOpenChange(false);
                  } else if (opt.next) {
                    setHistory([...history, currentNode]);
                    setCurrentNodeId(opt.next);
                  }
                }}
              >
                <span>{opt.label}</span>
                <ArrowRight className="w-4 h-4 ml-2 opacity-50 shrink-0" />
              </Button>
            ))}
          </div>
        </div>
        
        {history.length > 0 && (
          <div className="pt-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                const prev = history[history.length - 1];
                setHistory(history.slice(0, -1));
                setCurrentNodeId(prev.id);
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
