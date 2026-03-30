'use client';

import { ensurePortalCloseButton } from "@/app/lib/portalUi";
import { getPortalScrollLayers } from "@/app/lib/portalUi";
import { useSearchParams } from "next/navigation";
import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import { isMobile } from "react-device-detect";

import {
  clearSceneSnapshot,
  getProjectsPortalCameraPosition,
  getProjectsPortalCameraRotation,
  type SceneSnapshot,
  readSceneSnapshot,
} from "@/app/lib/navigationMemory";
import { usePortalStore, useScrollStore } from "@stores";

const SceneSnapshotRestorer = () => {
  const { camera } = useThree();
  const searchParams = useSearchParams();
  const isSceneRestoring = usePortalStore((state) => state.isSceneRestoring);
  const setActivePortal = usePortalStore((state) => state.setActivePortal);
  const setActiveProjectSlug = usePortalStore((state) => state.setActiveProjectSlug);
  const setPortalReturnRootScrollProgress = usePortalStore((state) => state.setPortalReturnRootScrollProgress);
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
    const queryPortal = searchParams.get("portal");
    const fallbackPortalId = queryPortal === "projects" || queryPortal === "work" ? queryPortal : null;

    const fallbackSnapshot: SceneSnapshot | null = fallbackPortalId
      ? {
          activePortalId: fallbackPortalId,
          cameraPosition: fallbackPortalId === "projects"
            ? getProjectsPortalCameraPosition(isMobile)
            : [camera.position.x, camera.position.y, camera.position.z],
          cameraRotation: fallbackPortalId === "projects"
            ? getProjectsPortalCameraRotation()
            : [camera.rotation.x, camera.rotation.y, camera.rotation.z],
          rootScrollProgress: 0,
          workScrollProgress: 0,
        }
      : null;

    const baseSnapshot = storedSnapshot ?? fallbackSnapshot;

    if (!baseSnapshot) {
      return;
    }

    const snapshot = baseSnapshot.activePortalId === "projects"
      ? {
          ...baseSnapshot,
          cameraPosition: getProjectsPortalCameraPosition(isMobile),
          cameraRotation: getProjectsPortalCameraRotation(),
        }
      : baseSnapshot;

    const applyCameraSnapshot = () => {
      camera.position.set(...snapshot.cameraPosition);
      camera.rotation.set(...snapshot.cameraRotation);
      camera.updateProjectionMatrix();
      setSceneCameraSnapshot(snapshot.cameraPosition, snapshot.cameraRotation);
    };

    const applyRootScrollSnapshot = () => {
      const { root: rootScrollWrapper } = getPortalScrollLayers();

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

      const { work: activeScrollWrapper } = getPortalScrollLayers();

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
    setPortalReturnRootScrollProgress(snapshot.rootScrollProgress);
    setActivePortal(snapshot.activePortalId);
    if (snapshot.activePortalId === "projects") {
      const { root: rootScrollWrapper } = getPortalScrollLayers();
      const fixedLayer = rootScrollWrapper?.firstElementChild as HTMLElement | null;
      if (fixedLayer) {
        fixedLayer.style.pointerEvents = "none";
      }
      ensurePortalCloseButton();
    }
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
  }, [camera, isMobile, searchParams, setActivePortal, setActiveProjectSlug, setPortalReturnRootScrollProgress, setSceneCameraSnapshot, setSceneMotionPaused, setSceneRestoring, setScrollProgress]);

  return null;
};

export default SceneSnapshotRestorer;
