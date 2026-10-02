import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RescueVarsState {
  vars: Record<string, string>;
  setVar: (key: string, value: string) => void;
  getVar: (key: string) => string;
}

export const useRescueVarsStore = create<RescueVarsState>()(
  persist(
    (set, get) => ({
      vars: {},
      setVar: (key, value) => set((state) => ({ vars: { ...state.vars, [key]: value } })),
      getVar: (key) => get().vars[key] || "",
    }),
    {
      name: "rescue-vars",
    }
  )
);
