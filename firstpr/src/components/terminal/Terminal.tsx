import { useState, useRef, useEffect } from "react";
import type { KeyboardEvent } from "react";

export interface TerminalProps {
  onCommand: (cmd: string) => void;
  output: { text: string; isError?: boolean }[];
  cwd: string;
}

export function Terminal({ onCommand, output, cwd }: TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      className="flex flex-col h-full bg-black text-green-400 font-mono text-sm md:text-base rounded-xl overflow-hidden border border-border shadow-lg"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="bg-zinc-900 px-4 py-2 flex items-center gap-2 border-b border-zinc-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="mx-auto text-xs text-zinc-500 select-none">Terminal</div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-1"
      >
        {output.map((line, i) => (
          <div key={i} className={line.isError ? "text-red-400" : "text-zinc-300"}>
            {line.text}
          </div>
        ))}
        
        <div className="flex items-center">
          <span className="text-blue-400 mr-2 select-none">user@machine:{cwd}$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none text-green-400 min-w-0"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
