import { useEffect } from "react";
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
import { Book, Terminal, Settings, GitPullRequest, Search, Play } from "lucide-react";
import { useCommand } from "@/stores/command";
import { modules } from "@/components/learn/ModuleData";
import { situationsData } from "@/content/rescue";

export function CommandPalette() {
  const { isOpen, setOpen, toggle } = useCommand();
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
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
    <CommandDialog open={isOpen} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search modules..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem value="Home" onSelect={() => runCommand(() => navigate("/"))}>
            <Book className="mr-2 h-4 w-4" />
            <span>Home</span>
          </CommandItem>
          <CommandItem value="Learn" onSelect={() => runCommand(() => navigate("/learn"))}>
            <Book className="mr-2 h-4 w-4" />
            <span>Learn</span>
          </CommandItem>
          <CommandItem value="Terminal Lab" onSelect={() => runCommand(() => navigate("/lab"))}>
            <Terminal className="mr-2 h-4 w-4" />
            <span>Terminal Lab</span>
          </CommandItem>
          <CommandItem value="Workflow Visualizer" onSelect={() => runCommand(() => navigate("/workflow"))}>
            <GitPullRequest className="mr-2 h-4 w-4" />
            <span>Workflow Visualizer</span>
          </CommandItem>
          <CommandItem value="Find an Issue" onSelect={() => runCommand(() => navigate("/issues"))}>
            <Search className="mr-2 h-4 w-4" />
            <span>Find an Issue</span>
          </CommandItem>
          <CommandItem value="Git Rescue" onSelect={() => runCommand(() => navigate("/rescue"))}>
            <Search className="mr-2 h-4 w-4" />
            <span>Git Rescue</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Learning Modules">
          {modules.map((mod) => (
            <CommandItem key={mod.id} value={mod.title} onSelect={() => runCommand(() => navigate(`/learn/${mod.id}`))}>
              <Play className="mr-2 h-4 w-4" />
              <span>{mod.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Git Rescue">
          {situationsData.map((sit) => (
            <CommandItem key={`rescue-${sit.id}`} value={`Rescue: ${sit.title}`} onSelect={() => runCommand(() => navigate(`/rescue?issue=${sit.id}`))}>
              <Search className="mr-2 h-4 w-4 text-red-500" />
              <span>Rescue: {sit.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem value="My Progress" onSelect={() => runCommand(() => navigate("/progress"))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>My Progress</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
