import { Outlet, Link, useLocation, ScrollRestoration } from "react-router-dom";
import { CommandPalette } from "@/components/CommandPalette";
import { usePrefs } from "@/stores/prefs";
import { useCommand } from "@/stores/command";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

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
  const location = useLocation();
  const currentPath = location.pathname;
  const { setOpen } = useCommand();

  const navItems = [
    { name: "Learn", path: "/learn" },
    { name: "Workflow", path: "/workflow" },
    { name: "Lab", path: "/lab" },
    { name: "Rescue", path: "/rescue" },
    { name: "Issues", path: "/issues" },
    { name: "GSoC", path: "/gsoc" },
    { name: "LFX", path: "/lfx" },
    { name: "Plan", path: "/programs" },
    { name: "AI in OSS", path: "/ai-policy" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center px-4 justify-between">
          <div className="flex gap-6 md:gap-10">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold sm:inline-block">FirstPR</span>
            </Link>
            <nav className="hidden md:flex gap-2">
              {navItems.map((item) => {
                const isActive = item.path === "/programs"
                  ? currentPath.startsWith("/programs") || currentPath.startsWith("/plan")
                  : currentPath.startsWith(item.path);
                return (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className={cn(
                      "relative flex items-center px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="hidden md:flex relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64" onClick={() => setOpen(true)}>
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
        {[
          { name: "Learn", path: "/learn" },
          { name: "Lab", path: "/lab" },
          { name: "Me", path: "/progress" },
        ].map((item) => {
          const isActive = currentPath.startsWith(item.path);
          return (
            <Link 
              key={item.path}
              to={item.path} 
              className={cn(
                "relative text-xs flex flex-col items-center p-2 transition-colors hover:text-foreground",
                isActive ? "text-foreground font-semibold" : "text-muted-foreground"
              )}
            >
              {item.name}
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute top-0 left-2 right-2 h-[2px] bg-primary rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
      
      <ScrollRestoration />
      <CommandPalette />
    </div>
  );
}
