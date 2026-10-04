import { useState, useRef, useEffect } from "react";
import type { KeyboardEvent } from "react";

export interface TerminalProps {
  onCommand: (cmd: string) => void;
  output: { text: string; isError?: boolean }[];
  cwd: string;
  presetInput?: string;
}

export function Terminal({ onCommand, output, cwd, presetInput }: TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (presetInput) {
      setInput(presetInput);
      inputRef.current?.focus();
    }
  }, [presetInput]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!input.trim()) return;
      onCommand(input);
      setHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(nextIndex);
          setInput(history[nextIndex]);
        }
      }
    }
  };

  return (
    <div 
      className="flex flex-col h-full bg-zinc-950 text-green-400 font-mono text-sm md:text-base rounded-xl overflow-hidden border border-zinc-800 shadow-2xl relative group"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="bg-zinc-900/90 backdrop-blur px-4 py-2.5 flex items-center justify-between border-b border-zinc-800 select-none">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm shadow-red-500/20"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm shadow-yellow-500/20"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm shadow-green-500/20"></div>
          </div>
          <span className="text-xs text-zinc-400 font-medium ml-2">bash — FirstPR Interactive Shell</span>
        </div>
        <div className="text-xs text-zinc-500 hidden sm:block">Press Enter ↵ to run</div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800"
      >
        {output.map((line, i) => (
          <div 
            key={i} 
            className={`whitespace-pre-wrap break-all ${
              line.isError || line.text.startsWith("❌") || line.text.startsWith("error:") || line.text.startsWith("fatal:")
                ? "text-rose-400 bg-rose-950/25 px-2 py-0.5 rounded border-l-2 border-rose-500 font-medium" 
                : line.text.startsWith("user@machine") 
                  ? "text-cyan-300 font-semibold"
                  : line.text.startsWith("✅") || line.text.startsWith("✨") || line.text.startsWith("🎉")
                    ? "text-emerald-400 font-medium"
                    : line.text.startsWith("👉") || line.text.startsWith("💡") || line.text.startsWith("⚠️")
                      ? "text-amber-300 font-medium"
                      : line.text.startsWith("[") 
                        ? "text-amber-300"
                        : "text-zinc-300"
            }`}
          >
            {line.text}
          </div>
        ))}
        
        <div className="flex items-center pt-1">
          <span className="text-cyan-400 mr-2 select-none font-semibold">user@machine:{cwd}$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none text-emerald-400 min-w-0 font-mono caret-emerald-400"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
