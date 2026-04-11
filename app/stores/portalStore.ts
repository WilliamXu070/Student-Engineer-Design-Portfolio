import { create } from 'zustand';

interface PortalStore {
  activePortalId: string | null;
  setActivePortal: (activePortalId: string | null) => void;
  portalReturnRootScrollProgress: number;
  setPortalReturnRootScrollProgress: (progress: number) => void;
  workPortalScrollProgress: number;
  setWorkPortalScrollProgress: (progress: number) => void;
  activeProjectSlug: string | null;
  setActiveProjectSlug: (slug: string | null) => void;
  isSceneMotionPaused: boolean;
  setSceneMotionPaused: (paused: boolean) => void;
  isSceneRestoring: boolean;
  setSceneRestoring: (restoring: boolean) => void;
  restoredPortalId: string | null;
  setRestoredPortalId: (portalId: string | null) => void;
  sceneCameraPosition: [number, number, number];
  sceneCameraRotation: [number, number, number];
  setSceneCameraSnapshot: (position: [number, number, number], rotation: [number, number, number]) => void;
  portalEntryMetrics: Record<string, { attempts: number; firstMs: number | null; lastMs: number | null }>;
  recordPortalEntryMetric: (portalId: string, durationMs: number) => void;
}

export const usePortalStore = create<PortalStore>((set) => ({
  activePortalId: null,
  setActivePortal: (activePortalId) => set(() => ({ activePortalId })),
  portalReturnRootScrollProgress: 0,
  setPortalReturnRootScrollProgress: (portalReturnRootScrollProgress) => set(() => ({ portalReturnRootScrollProgress })),
  workPortalScrollProgress: 0,
  setWorkPortalScrollProgress: (workPortalScrollProgress) => set(() => ({ workPortalScrollProgress })),
  activeProjectSlug: null,
  setActiveProjectSlug: (slug) => set(() => ({ activeProjectSlug: slug })),
  isSceneMotionPaused: false,
  setSceneMotionPaused: (isSceneMotionPaused) => set(() => ({ isSceneMotionPaused })),
  isSceneRestoring: false,
  setSceneRestoring: (isSceneRestoring) => set(() => ({ isSceneRestoring })),
  restoredPortalId: null,
  setRestoredPortalId: (restoredPortalId) => set(() => ({ restoredPortalId })),
  sceneCameraPosition: [0, 0, 5],
  sceneCameraRotation: [0, 0, 0],
  setSceneCameraSnapshot: (sceneCameraPosition, sceneCameraRotation) =>
    set(() => ({ sceneCameraPosition, sceneCameraRotation })),
  portalEntryMetrics: {},
  recordPortalEntryMetric: (portalId, durationMs) =>
    set((state) => {
      const currentMetric = state.portalEntryMetrics[portalId];
      const nextAttempts = (currentMetric?.attempts ?? 0) + 1;

      return {
        portalEntryMetrics: {
          ...state.portalEntryMetrics,
          [portalId]: {
            attempts: nextAttempts,
            firstMs: currentMetric?.firstMs ?? durationMs,
            lastMs: durationMs,
          },
        },
      };
    }),
}));
