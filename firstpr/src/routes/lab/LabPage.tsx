import { useState, useEffect } from "react";
import { Terminal } from "@/components/terminal/Terminal";
import { executeCommand, scenarios } from "./LabEngine";
import type { RepoState } from "./LabEngine";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronRight, RefreshCcw, CheckCircle2, ChevronLeft, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type OutputLine = { text: string; isError?: boolean };

export default function LabPage() {
  const navigate = useNavigate();
  const [scenarioId, setScenarioId] = useState(1);
  const scenario = scenarios.find(s => s.id === scenarioId) || scenarios[0];

  const [state, setState] = useState<RepoState>(scenario.initialState);
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [hintLevel, setHintLevel] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Initialize when scenario changes
  useEffect(() => {
    setState(scenario.initialState);
    setOutput([
      { text: "Welcome to the FirstPR Terminal Lab." },
      { text: "Type your commands below. Run 'clear' to clear the screen." },
    ]);
    setHintLevel(0);
    setCompleted(false);
  }, [scenario]);

  const handleCommand = (cmd: string) => {
    if (completed) return;

    setOutput(prev => [...prev, { text: `user@machine:${state.cwd}$ ${cmd}` }]);

    const res = executeCommand(cmd, state);
    
    if (res.out[0] === "__CLEAR__") {
      setOutput([]);
    } else {
      const newOutput: OutputLine[] = res.out.map(t => ({ text: t }));
      if (res.error) newOutput.push({ text: res.error, isError: true });
      setOutput(prev => [...prev, ...newOutput]);
    }

    setState(res.state);

    if (scenario.checkGoal(res.state)) {
      setCompleted(true);
      toast.success("Scenario completed!");
    }
  };

  const handleReset = () => {
    setState(scenario.initialState);
    setOutput([{ text: "Environment reset." }]);
    setHintLevel(0);
    setCompleted(false);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col h-[calc(100vh-6rem)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Terminal Lab <span className="text-muted-foreground font-normal text-lg">/ Scenario {scenario.id}</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate("/rescue")}>
            <HelpCircle className="w-4 h-4 mr-2" /> Rescue
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RefreshCcw className="w-4 h-4 mr-2" /> Reset
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Terminal (60%) */}
        <div className="lg:w-3/5 h-full">
          <Terminal onCommand={handleCommand} output={output} cwd={state.cwd} />
        </div>

        {/* Panel (40%) */}
        <div className="lg:w-2/5 h-full flex flex-col gap-4 overflow-y-auto">
          <Card className={completed ? 'border-green-500 bg-green-500/5' : ''}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{scenario.title}</span>
                {completed && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              </CardTitle>
              <CardDescription>{scenario.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {completed ? (
                <div className="flex flex-col gap-4">
                  <p className="font-semibold text-green-600 dark:text-green-400">Great job! You completed this scenario.</p>
                  <div className="flex gap-2">
                    <Button 
                      disabled={scenarioId === 1} 
                      onClick={() => setScenarioId(s => Math.max(1, s - 1))}
                      variant="outline"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button 
                      disabled={scenarioId === scenarios.length} 
                      onClick={() => setScenarioId(s => Math.min(scenarios.length, s + 1))}
                      className="flex-1"
                    >
                      Next Scenario <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-semibold mb-2">Hints</div>
                    {scenario.hints.slice(0, hintLevel).map((hint, i) => (
                      <div key={i} className="text-sm text-muted-foreground p-2 bg-muted rounded-md mb-2">
                        {hint}
                      </div>
                    ))}
                    {hintLevel < scenario.hints.length && (
                      <Button variant="secondary" size="sm" onClick={() => setHintLevel(h => h + 1)} className="w-full">
                        Show hint ({hintLevel}/{scenario.hints.length})
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Repo State Mini Graph */}
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase text-muted-foreground">Live Repo State</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <span className="font-bold text-foreground">HEAD:</span> {state.head}
                </div>
                
                <div>
                  <span className="font-bold text-foreground">Branches:</span>
                  <ul className="ml-4 mt-1 text-muted-foreground">
                    {Object.keys(state.branches).map(b => (
                      <li key={b} className={b === state.head ? "text-primary font-bold" : ""}>
                        {b === state.head ? "* " : "  "}{b} ({state.branches[b].length} commits)
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-foreground">Remotes:</span>
                  <ul className="ml-4 mt-1 text-muted-foreground">
                    {Object.keys(state.remotes).length === 0 && <li>(none)</li>}
                    {Object.entries(state.remotes).map(([name, url]) => (
                      <li key={name}>{name}: {url}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-foreground">Status:</span>
                  <ul className="ml-4 mt-1 text-muted-foreground">
                    <li>Staged: {state.staged.length}</li>
                    <li>Modified: {state.modified.length}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
