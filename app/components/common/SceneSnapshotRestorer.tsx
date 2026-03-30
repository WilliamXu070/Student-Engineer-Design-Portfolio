'use client';

import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import { isMobile } from "react-device-detect";

import {
  clearSceneSnapshot,
  getProjectsPortalCameraPosition,
  getProjectsPortalCameraRotation,
  readSceneSnapshot,
} from "@/app/lib/navigationMemory";
import { usePortalStore, useScrollStore } from "@stores";

const SceneSnapshotRestorer = () => {
  const { camera } = useThree();
  const isSceneRestoring = usePortalStore((state) => state.isSceneRestoring);
  const setActivePortal = usePortalStore((state) => state.setActivePortal);
  const setActiveProjectSlug = usePortalStore((state) => state.setActiveProjectSlug);
  const setSceneMotionPaused = usePortalStore((state) => state.setSceneMotionPaused);
  const setSceneRestoring = usePortalStore((state) => state.setSceneRestoring);
  const setSceneCameraSnapshot = usePortalStore((state) => state.setSceneCameraSnapshot);
  const setScrollProgress = useScrollStore((state) => state.setScrollProgress);

  useFrame(() => {
    if (isSceneRestoring) {
      return;
    }

    setSceneCameraSnapshot(
      [camera.position.x, camera.position.y, camera.position.z],
      [camera.rotation.x, camera.rotation.y, camera.rotation.z]
    );
  });

  useLayoutEffect(() => {
    const storedSnapshot = readSceneSnapshot();

    if (!storedSnapshot) {
      return;
    }

    const snapshot = storedSnapshot.activePortalId === "projects"
      ? {
          ...storedSnapshot,
          cameraPosition: getProjectsPortalCameraPosition(isMobile),
          cameraRotation: getProjectsPortalCameraRotation(),
        }
      : storedSnapshot;

    const applyCameraSnapshot = () => {
      camera.position.set(...snapshot.cameraPosition);
      camera.rotation.set(...snapshot.cameraRotation);
      camera.updateProjectionMatrix();
      setSceneCameraSnapshot(snapshot.cameraPosition, snapshot.cameraRotation);
    };

    const getScrollWrapper = () => document.querySelector('div[style*="z-index: 1"]') as HTMLElement | null;
    const applyRootScrollSnapshot = () => {
      const rootScrollWrapper = getScrollWrapper();

      if (!rootScrollWrapper) {
        return;
      }

      const rootScrollableHeight = rootScrollWrapper.scrollHeight - rootScrollWrapper.clientHeight;
      rootScrollWrapper.scrollTop = Math.max(0, rootScrollableHeight * snapshot.rootScrollProgress);
      rootScrollWrapper.dispatchEvent(new Event("scroll"));
    };
    const applyWorkScrollSnapshot = () => {
      if (snapshot.activePortalId !== "work") {
        return;
      }

      const activeScrollWrapper = getScrollWrapper();

      if (!activeScrollWrapper) {
        return;
      }

      const scrollableHeight = activeScrollWrapper.scrollHeight - activeScrollWrapper.clientHeight;
      activeScrollWrapper.scrollTop = Math.max(0, scrollableHeight * snapshot.workScrollProgress);
      activeScrollWrapper.dispatchEvent(new Event("scroll"));
    };

    setSceneMotionPaused(true);
    setSceneRestoring(true);
    setActiveProjectSlug(null);
    setActivePortal(snapshot.activePortalId);
    setScrollProgress(snapshot.workScrollProgress);
    applyRootScrollSnapshot();
    applyCameraSnapshot();

    let workScrollTimer: number | null = null;
    let releaseFrame = 0;
    const portalFrame = window.requestAnimationFrame(() => {
      applyRootScrollSnapshot();
      applyCameraSnapshot();

      if (snapshot.activePortalId === "work") {
        workScrollTimer = window.setTimeout(() => {
          applyWorkScrollSnapshot();
          applyCameraSnapshot();
        }, 80);
      }

      releaseFrame = window.requestAnimationFrame(() => {
        applyCameraSnapshot();
        clearSceneSnapshot();
        setSceneRestoring(false);
        setSceneMotionPaused(false);
      });
    });

    return () => {
      window.cancelAnimationFrame(portalFrame);
      window.cancelAnimationFrame(releaseFrame);
      if (workScrollTimer !== null) {
        window.clearTimeout(workScrollTimer);
      }
    };
  }, [camera, setActivePortal, setActiveProjectSlug, setSceneCameraSnapshot, setSceneMotionPaused, setSceneRestoring, setScrollProgress]);

  return null;
};

export default SceneSnapshotRestorer;
