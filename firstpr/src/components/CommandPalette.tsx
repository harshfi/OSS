import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useNavigate } from "react-router-dom";
import { Book, Terminal, Settings, GitPullRequest, Search } from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => navigate("/"))}>
            <Book className="mr-2 h-4 w-4" />
            <span>Home</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/learn"))}>
            <Book className="mr-2 h-4 w-4" />
            <span>Learn</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/lab"))}>
            <Terminal className="mr-2 h-4 w-4" />
            <span>Terminal Lab</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/workflow"))}>
            <GitPullRequest className="mr-2 h-4 w-4" />
            <span>Workflow Visualizer</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/issues"))}>
            <Search className="mr-2 h-4 w-4" />
            <span>Find an Issue</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem onSelect={() => runCommand(() => navigate("/progress"))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>My Progress</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
