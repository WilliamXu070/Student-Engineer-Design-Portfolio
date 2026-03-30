import { create } from "zustand";

interface PointerStore {
  pointer: { x: number; y: number };
  setPointer: (x: number, y: number) => void;
}

export const usePointerStore = create<PointerStore>((set) => ({
  pointer: { x: 0, y: 0 },
  setPointer: (x, y) => set(() => ({ pointer: { x, y } })),
}));
