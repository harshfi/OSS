import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, HelpCircle, Bug } from "lucide-react";
import { situationsData, categorySchema } from "@/content/rescue";
import { RescueCard } from "./RescueCard";
import { RescueWizard } from "./RescueWizard";

const stopwords = new Set(["i", "my", "the", "a", "to", "accidentally", "pushed", "committed", "in", "on", "with"]);

const tokenize = (query: string) => {
  return query.toLowerCase().replace(/[^a-z0-9\s-]/g, '').split(/\s+/).filter(w => !stopwords.has(w) && w.length > 1);
};

export default function RescuePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryIssue = searchParams.get("issue");
  
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(queryIssue || null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const [isPastingError, setIsPastingError] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardContext, setWizardContext] = useState<any>(undefined);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 150);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    if (selectedId) {
      setSearchParams({ issue: selectedId }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [selectedId, setSearchParams]);

  useEffect(() => {
    if (queryIssue !== selectedId) {
      setSelectedId(queryIssue);
    }
  }, [queryIssue]);
  
  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedId) setSelectedId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId]);

  const searchResults = useMemo(() => {
    let results = situationsData;
    
    if (selectedCategory !== "All") {
      results = results.filter(s => s.category === selectedCategory);
    }

    if (!debouncedSearch.trim()) return results;

    const tokens = tokenize(debouncedSearch);
    if (tokens.length === 0) return results;

    // Error pasting analysis
    if (isPastingError) {
      const scored = situationsData.map(s => {
        let score = 0;
        if (s.errorPatterns) {
          for (const pattern of s.errorPatterns) {
            const regex = new RegExp(pattern, 'i');
            if (regex.test(debouncedSearch)) score += 10;
          }
        }
        return { item: s, score };
      }).filter(x => x.score > 0).sort((a, b) => b.score - a.score);
      
      return scored.map(x => x.item);
    }

    // Normal token search
    const scored = results.map(s => {
      let score = 0;
      const fullText = (s.title + " " + s.chipLabel + " " + s.keywords.join(" ") + " " + s.whyItHappens).toLowerCase();
      
      for (const t of tokens) {
        if (fullText.includes(t)) {
          score++;
          if (s.title.toLowerCase().includes(t)) score += 2;
          if (s.chipLabel.toLowerCase().includes(t)) score += 2;
        }
      }
      return { item: s, score };
    }).filter(x => x.score > 0).sort((a, b) => b.score - a.score);

    return scored.map(x => x.item);
  }, [debouncedSearch, selectedCategory, isPastingError]);

  const selectedSituation = situationsData.find(s => s.id === selectedId);
  const isNoMatch = debouncedSearch && searchResults.length === 0;

  const categories = ["All", ...categorySchema.options];

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Git Rescue <span className="text-red-500">🚑</span>
        </h1>
        <p className="text-xl text-muted-foreground">Don't panic. Tell us what went wrong, and we'll help you fix it.</p>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <Button 
          variant={!isPastingError ? "default" : "outline"} 
          onClick={() => { setIsPastingError(false); setSearch(""); searchInputRef.current?.focus(); }}
        >
          <Search className="w-4 h-4 mr-2" /> Search
        </Button>
        <Button 
          variant={isPastingError ? "default" : "outline"} 
          onClick={() => { setIsPastingError(true); setSearch(""); }}
        >
          <Bug className="w-4 h-4 mr-2" /> Paste Error
        </Button>
        <Button variant="secondary" onClick={() => setWizardOpen(true)}>
          <HelpCircle className="w-4 h-4 mr-2" /> Not sure?
        </Button>
      </div>

      <div className="relative mb-8 max-w-2xl mx-auto">
        {isPastingError ? (
          <div>
            <Label htmlFor="error-paste" className="sr-only">Paste your error output</Label>
            <Textarea 
              id="error-paste"
              className="min-h-[120px] text-sm bg-secondary/30 font-mono"
              placeholder="Paste your terminal error output here (e.g., 'fatal: refusing to merge unrelated histories'). It stays on your device."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        ) : (
          <div>
            <label htmlFor="rescue-search" className="sr-only">Search for a git problem</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              ref={searchInputRef}
              id="rescue-search"
              className="pl-10 h-14 text-lg bg-secondary/30"
              placeholder="I accidentally..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Categories */}
      {!isPastingError && !search && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedCategory === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div aria-live="polite" className="sr-only">
        {debouncedSearch ? `Found ${searchResults.length} situations` : "Showing all situations"}
      </div>

      {!selectedId && isNoMatch ? (
        <div className="text-center mb-12 animate-in fade-in">
          <p className="text-muted-foreground mb-4">Can't find it? Try one of these:</p>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {situationsData.slice(0, 10).map(s => (
              <Badge 
                key={s.id} 
                variant="secondary"
                className="cursor-pointer text-sm py-1.5 px-3 hover:bg-primary/80 transition-colors"
                onClick={() => setSelectedId(s.id)}
              >
                {s.chipLabel}
              </Badge>
            ))}
          </div>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={() => navigate('/lab')}>
              Go to Lab
            </Button>
            <Button variant="outline" onClick={() => navigate('/learn')}>
              Go to Cheatsheet
            </Button>
          </div>
        </div>
      ) : !selectedId ? (
        <div className="flex flex-wrap gap-2 justify-center mb-12" role="group" aria-label="Rescue situations">
          {searchResults.map(s => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedId(s.id);
                // "Selecting a chip clears the search text" - Wait, the user said "Selecting a chip clears the search text"? Actually they said "Selecting a chip clears the search text (wait, selecting a chip shouldn't clear...)" I will clear search to focus on card.
                setSearch("");
                setWizardContext(undefined);
              }}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full ring-offset-background"
            >
              <Badge 
                variant="secondary"
                className={`cursor-pointer text-sm py-1.5 px-3 transition-colors ${
                  s.severity === 'danger' ? 'hover:bg-red-500/20 hover:text-red-500' :
                  s.severity === 'warning' ? 'hover:bg-amber-500/20 hover:text-amber-500' :
                  'hover:bg-primary/80'
                }`}
              >
                {s.chipLabel}
              </Badge>
            </button>
          ))}
        </div>
      ) : null}

      <AnimatePresence mode="popLayout">
        {selectedSituation && (
          <RescueCard 
            key={selectedId} 
            situation={selectedSituation} 
            onClose={() => { setSelectedId(null); setWizardContext(undefined); }} 
            initialContext={wizardContext}
          />
        )}
      </AnimatePresence>

      <RescueWizard 
        open={wizardOpen} 
        onOpenChange={setWizardOpen} 
        onSelectScenario={(id, context) => {
          setSelectedId(id);
          setWizardContext(context);
          setSearch("");
        }} 
      />
    </div>
  );
}
