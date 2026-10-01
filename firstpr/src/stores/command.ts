import { create } from 'zustand';

interface CommandState {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  toggle: () => void;
}

export const useCommand = create<CommandState>((set) => ({
  isOpen: false,
  setOpen: (isOpen) => set({ isOpen }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
