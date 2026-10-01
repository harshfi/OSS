import { Outlet, Link } from "react-router-dom";
import { CommandPalette } from "@/components/CommandPalette";
import { usePrefs } from "@/stores/prefs";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

function ThemeToggle() {
  const { theme, setTheme } = usePrefs();

  return (
    <div className="flex gap-2">
      <Button variant={theme === 'light' ? 'default' : 'ghost'} size="icon" onClick={() => setTheme('light')}>
        <Sun className="h-4 w-4" />
      </Button>
      <Button variant={theme === 'dark' ? 'default' : 'ghost'} size="icon" onClick={() => setTheme('dark')}>
        <Moon className="h-4 w-4" />
      </Button>
      <Button variant={theme === 'system' ? 'default' : 'ghost'} size="icon" onClick={() => setTheme('system')}>
        <Monitor className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function AppShell() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center px-4 justify-between">
          <div className="flex gap-6 md:gap-10">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold sm:inline-block">FirstPR</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link to="/learn" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">Learn</Link>
              <Link to="/lab" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">Lab</Link>
              <Link to="/rescue" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">Rescue</Link>
              <Link to="/orgs" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">Explore</Link>
              <Link to="/gsoc" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">GSoC</Link>
              <Link to="/programs" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">Plan</Link>
              <Link to="/ai-policy" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">AI Policy</Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="hidden md:flex relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64" onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}>
              <span className="hidden lg:inline-flex">Search documentation...</span>
              <span className="inline-flex lg:hidden">Search...</span>
              <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden sticky bottom-0 z-50 w-full border-t bg-background flex justify-around p-2">
        <Link to="/learn" className="text-xs flex flex-col items-center p-2 text-muted-foreground hover:text-foreground">Learn</Link>
        <Link to="/lab" className="text-xs flex flex-col items-center p-2 text-muted-foreground hover:text-foreground">Lab</Link>
        <Link to="/orgs" className="text-xs flex flex-col items-center p-2 text-muted-foreground hover:text-foreground">Explore</Link>
        <Link to="/progress" className="text-xs flex flex-col items-center p-2 text-muted-foreground hover:text-foreground">Me</Link>
      </nav>
      
      <CommandPalette />
    </div>
  );
}
