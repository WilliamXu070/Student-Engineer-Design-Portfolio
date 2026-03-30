import { create } from 'zustand';

interface PortalStore {
  activePortalId: string | null;
  setActivePortal: (activePortalId: string | null) => void;
  activeProjectSlug: string | null;
  setActiveProjectSlug: (slug: string | null) => void;
  isSceneMotionPaused: boolean;
  setSceneMotionPaused: (paused: boolean) => void;
  isSceneRestoring: boolean;
  setSceneRestoring: (restoring: boolean) => void;
  sceneCameraPosition: [number, number, number];
  sceneCameraRotation: [number, number, number];
  setSceneCameraSnapshot: (position: [number, number, number], rotation: [number, number, number]) => void;
}

export const usePortalStore = create<PortalStore>((set) => ({
  activePortalId: null,
  setActivePortal: (activePortalId) => set(() => ({ activePortalId })),
  activeProjectSlug: null,
  setActiveProjectSlug: (slug) => set(() => ({ activeProjectSlug: slug })),
  isSceneMotionPaused: false,
  setSceneMotionPaused: (isSceneMotionPaused) => set(() => ({ isSceneMotionPaused })),
  isSceneRestoring: false,
  setSceneRestoring: (isSceneRestoring) => set(() => ({ isSceneRestoring })),
  sceneCameraPosition: [0, 0, 5],
  sceneCameraRotation: [0, 0, 0],
  setSceneCameraSnapshot: (sceneCameraPosition, sceneCameraRotation) =>
    set(() => ({ sceneCameraPosition, sceneCameraRotation })),
}));
