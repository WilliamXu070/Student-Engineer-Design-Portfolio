'use client';

import { readSceneSnapshot } from "@/app/lib/navigationMemory";
import { usePortalStore, useScrollStore } from "@stores";
import { useEffect, useState } from "react";

type SnapshotView = {
  activePortalId: string | null;
  cameraPosition: [number, number, number];
  cameraRotation: [number, number, number];
  rootScrollProgress: number;
  workScrollProgress: number;
} | null;

const formatNumber = (value: number) => value.toFixed(3);

const SceneDebugHud = () => {
  const activePortalId = usePortalStore((state) => state.activePortalId);
  const activeProjectSlug = usePortalStore((state) => state.activeProjectSlug);
  const isSceneMotionPaused = usePortalStore((state) => state.isSceneMotionPaused);
  const isSceneRestoring = usePortalStore((state) => state.isSceneRestoring);
  const sceneCameraPosition = usePortalStore((state) => state.sceneCameraPosition);
  const sceneCameraRotation = usePortalStore((state) => state.sceneCameraRotation);
  const scrollProgress = useScrollStore((state) => state.scrollProgress);
  const [pathname, setPathname] = useState("");
  const [snapshot, setSnapshot] = useState<SnapshotView>(null);

  useEffect(() => {
    const sync = () => {
      setPathname(window.location.pathname);
      setSnapshot(readSceneSnapshot());
    };

    sync();
    const interval = window.setInterval(sync, 200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed left-4 top-4 z-[100] rounded-2xl border border-white/35 bg-black/70 px-4 py-3 text-[11px] leading-5 text-white shadow-[0_12px_32px_rgba(0,0,0,0.28)] backdrop-blur-md">
      <div style={{ fontFamily: "var(--font-soria)" }}>Scene Debug</div>
      <div style={{ fontFamily: "var(--font-vercetti)" }}>
        <div>path: {pathname || "/"}</div>
        <div>portal: {activePortalId ?? "null"}</div>
        <div>project: {activeProjectSlug ?? "null"}</div>
        <div>paused: {String(isSceneMotionPaused)}</div>
        <div>restoring: {String(isSceneRestoring)}</div>
        <div>rootScroll: {formatNumber(scrollProgress)}</div>
        <div>
          cam pos: {formatNumber(sceneCameraPosition[0])}, {formatNumber(sceneCameraPosition[1])}, {formatNumber(sceneCameraPosition[2])}
        </div>
        <div>
          cam rot: {formatNumber(sceneCameraRotation[0])}, {formatNumber(sceneCameraRotation[1])}, {formatNumber(sceneCameraRotation[2])}
        </div>
        <div className="mt-2 border-t border-white/15 pt-2">saved snapshot</div>
        <div>snap portal: {snapshot?.activePortalId ?? "null"}</div>
        <div>snap root: {snapshot ? formatNumber(snapshot.rootScrollProgress) : "null"}</div>
        <div>snap work: {snapshot ? formatNumber(snapshot.workScrollProgress) : "null"}</div>
        <div>
          snap pos: {snapshot ? `${formatNumber(snapshot.cameraPosition[0])}, ${formatNumber(snapshot.cameraPosition[1])}, ${formatNumber(snapshot.cameraPosition[2])}` : "null"}
        </div>
        <div>
          snap rot: {snapshot ? `${formatNumber(snapshot.cameraRotation[0])}, ${formatNumber(snapshot.cameraRotation[1])}, ${formatNumber(snapshot.cameraRotation[2])}` : "null"}
        </div>
      </div>
    </div>
  );
};

export default SceneDebugHud;
