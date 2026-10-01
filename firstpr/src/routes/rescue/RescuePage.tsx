import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Copy, TerminalSquare, Search, Info } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type RescueSituation = {
  id: string;
  title: string;
  description: string;
  why: string;
  commands: { desc: string; cmd: string }[];
  danger?: string;
  labScenario?: number;
};

const situations: RescueSituation[] = [
  {
    id: "commit-main",
    title: "Committed to main",
    description: "I accidentally committed my changes directly to the main branch instead of a feature branch.",
    why: "You forgot to run `git checkout -b branch-name` before committing. Git just added the commit to whatever branch you were currently on (main).",
    commands: [
      { desc: "Create a new branch from your current state (keeps your commit)", cmd: "git branch new-feature-branch" },
      { desc: "Reset main back one commit (removes the commit from main but leaves changes staged if you want, but hard resets it entirely here)", cmd: "git reset --hard HEAD~1" },
      { desc: "Switch to your new branch", cmd: "git checkout new-feature-branch" }
    ],
    labScenario: 7
  },
  {
    id: "wrong-msg",
    title: "Wrong commit message",
    description: "I made a typo in my last commit message.",
    why: "It happens! If you haven't pushed yet, you can simply amend the most recent commit.",
    commands: [
      { desc: "Amend the last commit message", cmd: 'git commit --amend -m "New correct message"' }
    ]
  },
  {
    id: "forgot-file",
    title: "Forgot a file",
    description: "I made a commit but forgot to include one of the files.",
    why: "You probably forgot to `git add` the file before committing. You can add it now and merge it into the previous commit.",
    commands: [
      { desc: "Stage the forgotten file", cmd: "git add forgotten-file.js" },
      { desc: "Amend the last commit without changing the message", cmd: "git commit --amend --no-edit" }
    ]
  },
  {
    id: "pushed-secret",
    title: "Pushed a secret",
    description: "I accidentally pushed an API key or password to a public repository.",
    why: "You committed a file that should have been in .gitignore.",
    danger: "Deleting the file and making a new commit is NOT enough. The secret is in your Git history forever. You MUST revoke/rotate the compromised key immediately.",
    commands: [
      { desc: "Remove the file from Git cache but keep it locally", cmd: "git rm --cached secret.env" },
      { desc: "Commit the removal", cmd: 'git commit -m "Remove secret file"' },
      { desc: "Add it to .gitignore", cmd: 'echo "secret.env" >> .gitignore' }
    ]
  },
  {
    id: "undo-local",
    title: "Undo local changes",
    description: "I messed up some files and just want to go back to how they were in the last commit.",
    why: "You've been experimenting and want to throw away all uncommitted modifications.",
    danger: "This will permanently delete all uncommitted work. Make sure you don't need any of these changes.",
    commands: [
      { desc: "Discard all changes in tracked files", cmd: "git restore ." },
      { desc: "Alternative: Hard reset to last commit", cmd: "git reset --hard HEAD" }
    ]
  }
];

export default function RescuePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = situations.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Command copied to clipboard!");
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Git Rescue <span className="text-red-500">🚑</span></h1>
        <p className="text-xl text-muted-foreground">Don't panic. Tell us what went wrong, and we'll help you fix it.</p>
      </div>

      <div className="relative mb-8 max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input 
          className="pl-10 h-14 text-lg bg-secondary/30"
          placeholder="I accidentally..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {situations.map(s => (
          <Badge 
            key={s.id} 
            variant={selectedId === s.id ? "default" : "secondary"}
            className="cursor-pointer text-sm py-1.5 px-3 hover:bg-primary/80 transition-colors"
            onClick={() => setSelectedId(s.id === selectedId ? null : s.id)}
          >
            {s.title}
          </Badge>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        {selectedId && (
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          >
            {situations.filter(s => s.id === selectedId).map(situation => (
              <Card key={situation.id} className="border-2 border-primary/20 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                <CardHeader>
                  <CardTitle className="text-2xl">{situation.title}</CardTitle>
                  <CardDescription className="text-base text-foreground/80">{situation.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {situation.danger && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg flex gap-3 items-start">
                      <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold mb-1">Danger</div>
                        <div className="text-sm">{situation.danger}</div>
                      </div>
                    </div>
                  )}

                  <div className="bg-secondary/40 p-4 rounded-lg flex gap-3 items-start border border-border/50">
                    <Info className="w-5 h-5 shrink-0 mt-0.5 text-blue-400" />
                    <div>
                      <div className="font-semibold mb-1">Why this happened</div>
                      <div className="text-sm text-muted-foreground">{situation.why}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">How to fix it:</h3>
                    <div className="space-y-4">
                      {situation.commands.map((cmd, i) => (
                        <div key={i} className="flex flex-col md:flex-row gap-2 md:items-center">
                          <div className="md:w-1/3 text-sm text-muted-foreground">
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs mr-2 font-bold">{i + 1}</span>
                            {cmd.desc}
                          </div>
                          <div className="flex-1 flex gap-2">
                            <code className="flex-1 bg-black text-green-400 p-3 rounded-md font-mono text-sm overflow-x-auto whitespace-nowrap border border-zinc-800">
                              {cmd.cmd}
                            </code>
                            <Button variant="secondary" size="icon" onClick={() => copyToClipboard(cmd.cmd)}>
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {situation.labScenario && (
                    <div className="pt-4 flex justify-end">
                      <Button onClick={() => navigate(`/lab?scenario=${situation.labScenario}`)} className="gap-2">
                        <TerminalSquare className="w-4 h-4" /> Try it in the Lab
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedId && search && filtered.length > 0 && (
        <div className="text-center text-muted-foreground mt-12 animate-in fade-in">
          Found {filtered.length} matching situations. Click a badge above to see the fix.
        </div>
      )}
      
      {!selectedId && search && filtered.length === 0 && (
        <div className="text-center text-muted-foreground mt-12 animate-in fade-in">
          No situations found matching "{search}". Try searching for something else, or check the Learn Hub.
        </div>
      )}
    </div>
  );
}
