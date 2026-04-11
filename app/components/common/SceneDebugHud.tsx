'use client';

import { readSceneSnapshot } from "@/app/lib/navigationMemory";
import { getPortalScrollLayers } from "@/app/lib/portalUi";
import { usePortalStore, useScrollStore } from "@stores";
import { useEffect, useState } from "react";

type SnapshotView = {
  activePortalId: string | null;
  cameraPosition: [number, number, number];
  cameraRotation: [number, number, number];
  rootScrollProgress: number;
  workScrollProgress: number;
} | null;

type LayerView = {
  root: string;
  work: string;
  fixed: string;
  fill: string;
  close: string;
  center: string;
  topLeft: string;
};

const formatNumber = (value: number) => value.toFixed(3);
const formatInteger = (value: number) => value.toFixed(0);
const formatLayer = (element: Element | null) => {
  if (!(element instanceof HTMLElement)) {
    return "null";
  }

  const style = window.getComputedStyle(element);
  const className = typeof element.className === "string" && element.className.trim().length > 0
    ? `.${element.className.trim().replace(/\s+/g, ".")}`
    : "";

  return `${element.tagName.toLowerCase()}${className} pe:${style.pointerEvents} z:${style.zIndex} pos:${style.position}`;
};
const formatScrollMetrics = (element: HTMLElement | null) => {
  if (!element) {
    return "null";
  }

  const scrollableHeight = element.scrollHeight - element.clientHeight;
  const normalizedProgress = scrollableHeight > 0 ? element.scrollTop / scrollableHeight : 0;

  return `top:${formatInteger(element.scrollTop)} h:${formatInteger(element.clientHeight)} sh:${formatInteger(element.scrollHeight)} prog:${formatNumber(normalizedProgress)}`;
};

const SceneDebugHud = () => {
  const activePortalId = usePortalStore((state) => state.activePortalId);
  const activeProjectSlug = usePortalStore((state) => state.activeProjectSlug);
  const isSceneMotionPaused = usePortalStore((state) => state.isSceneMotionPaused);
  const isSceneRestoring = usePortalStore((state) => state.isSceneRestoring);
  const sceneCameraPosition = usePortalStore((state) => state.sceneCameraPosition);
  const sceneCameraRotation = usePortalStore((state) => state.sceneCameraRotation);
  const portalReturnRootScrollProgress = usePortalStore((state) => state.portalReturnRootScrollProgress);
  const workPortalScrollProgress = usePortalStore((state) => state.workPortalScrollProgress);
  const portalEntryMetrics = usePortalStore((state) => state.portalEntryMetrics);
  const scrollProgress = useScrollStore((state) => state.scrollProgress);
  const [href, setHref] = useState("");
  const [pathname, setPathname] = useState("");
  const [search, setSearch] = useState("");
  const [snapshot, setSnapshot] = useState<SnapshotView>(null);
  const [layers, setLayers] = useState<LayerView | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [rootMetrics, setRootMetrics] = useState("null");
  const [workMetrics, setWorkMetrics] = useState("null");
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const sync = () => {
      const { root, work } = getPortalScrollLayers();
      const fixed = root?.firstElementChild ?? null;
      const fill = root?.lastElementChild ?? null;

      setHref(window.location.href);
      setPathname(window.location.pathname);
      setSearch(window.location.search);
      setViewport({ width: window.innerWidth, height: window.innerHeight });
      setTimestamp(new Date().toLocaleTimeString());
      setSnapshot(readSceneSnapshot());
      setRootMetrics(formatScrollMetrics(root));
      setWorkMetrics(formatScrollMetrics(work));
      setLayers({
        root: formatLayer(root),
        work: formatLayer(work),
        fixed: formatLayer(fixed),
        fill: formatLayer(fill),
        close: formatLayer(document.querySelector(".close")),
        center: formatLayer(document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)),
        topLeft: formatLayer(document.elementFromPoint(56, 56)),
      });
    };

    sync();
    const interval = window.setInterval(sync, 200);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: "30rem",
        overflowY: "auto",
        padding: "14px 16px 18px",
        background: "rgba(245, 255, 56, 0.96)",
        color: "#111111",
        borderRight: "4px solid #111111",
        boxShadow: "18px 0 48px rgba(0, 0, 0, 0.35)",
        zIndex: 2147483647,
        pointerEvents: "none",
        fontFamily: "Consolas, Monaco, monospace",
        fontSize: "12px",
        lineHeight: 1.45,
        whiteSpace: "pre-wrap",
      }}>
      <>
      <div style={{ fontFamily: "var(--font-soria)", fontSize: "20px", lineHeight: 1, marginBottom: "8px" }}>
        DEBUG LIVE
      </div>
      <div className="mt-2">
        <div>time: {timestamp || "null"}</div>
        <div>href: {href || "null"}</div>
        <div>path: {pathname || "/"}</div>
        <div>search: {search || "none"}</div>
        <div>viewport: {viewport.width} x {viewport.height}</div>
        <div>portal: {activePortalId ?? "null"}</div>
        <div>project: {activeProjectSlug ?? "null"}</div>
        <div>paused: {String(isSceneMotionPaused)}</div>
        <div>restoring: {String(isSceneRestoring)}</div>
        <div>rootScroll: {formatNumber(scrollProgress)}</div>
        <div>returnRoot: {formatNumber(portalReturnRootScrollProgress)}</div>
        <div>workScroll: {formatNumber(workPortalScrollProgress)}</div>
        <div>rootMetrics: {rootMetrics}</div>
        <div>workMetrics: {workMetrics}</div>
        <div>cursor: {cursorPosition.x}, {cursorPosition.y}</div>
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
        <div className="mt-2 border-t border-white/15 pt-2">portal entry</div>
        <div>
          projects: {portalEntryMetrics.projects ? `${portalEntryMetrics.projects.lastMs?.toFixed(0)}ms last / ${portalEntryMetrics.projects.firstMs?.toFixed(0)}ms first` : "n/a"}
        </div>
        <div>
          work: {portalEntryMetrics.work ? `${portalEntryMetrics.work.lastMs?.toFixed(0)}ms last / ${portalEntryMetrics.work.firstMs?.toFixed(0)}ms first` : "n/a"}
        </div>
        <div className="mt-2 border-t border-white/15 pt-2">layer order</div>
        <div>root: {layers?.root ?? "null"}</div>
        <div>work: {layers?.work ?? "null"}</div>
        <div>fixed: {layers?.fixed ?? "null"}</div>
        <div>fill: {layers?.fill ?? "null"}</div>
        <div>close: {layers?.close ?? "null"}</div>
        <div>hit center: {layers?.center ?? "null"}</div>
        <div>hit tl: {layers?.topLeft ?? "null"}</div>
      </div>
      </>
    </div>
  );
};

export default SceneDebugHud;
