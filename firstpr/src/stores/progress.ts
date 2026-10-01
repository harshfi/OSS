import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressState {
  completedModules: string[];
  completeModule: (id: string) => void;
  resetProgress: () => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      completedModules: [],
      completeModule: (id) =>
        set((state) => ({
          completedModules: state.completedModules.includes(id)
            ? state.completedModules
            : [...state.completedModules, id],
        })),
      resetProgress: () => set({ completedModules: [] }),
    }),
    {
      name: "firstpr-progress",
    }
  )
);
