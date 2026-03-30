import { create } from "zustand";

export interface TimelineOverlayItem {
  slug: string;
  title: string;
  subtitle?: string;
  year: string;
  x: number;
  y: number;
  align: "left" | "right";
}

interface TimelineOverlayStore {
  items: Record<string, TimelineOverlayItem>;
  hoveredSlug: string | null;
  selectedSlug: string | null;
  setItem: (item: TimelineOverlayItem) => void;
  removeItem: (slug: string) => void;
  clearItems: () => void;
  setHoveredSlug: (slug: string | null) => void;
  setSelectedSlug: (slug: string | null) => void;
}

export const useTimelineOverlayStore = create<TimelineOverlayStore>((set) => ({
  items: {},
  hoveredSlug: null,
  selectedSlug: null,
  setItem: (item) =>
    set((state) => {
      const current = state.items[item.slug];
      if (
        current &&
        current.title === item.title &&
        current.subtitle === item.subtitle &&
        current.year === item.year &&
        current.align === item.align &&
        Math.abs(current.x - item.x) < 0.5 &&
        Math.abs(current.y - item.y) < 0.5
      ) {
        return state;
      }

      return {
        items: {
          ...state.items,
          [item.slug]: item,
        },
      };
    }),
  removeItem: (slug) =>
    set((state) => {
      if (!state.items[slug]) {
        return state;
      }
      const nextItems = { ...state.items };
      delete nextItems[slug];
      return { items: nextItems };
    }),
  clearItems: () =>
    set((state) => {
      if (Object.keys(state.items).length === 0) {
        return state;
      }
      return { items: {} };
    }),
  setHoveredSlug: (slug) =>
    set((state) => (state.hoveredSlug === slug ? state : { hoveredSlug: slug })),
  setSelectedSlug: (slug) =>
    set((state) => (state.selectedSlug === slug ? state : { selectedSlug: slug })),
}));
