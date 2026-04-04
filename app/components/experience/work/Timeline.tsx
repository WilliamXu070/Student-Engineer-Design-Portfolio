import { Box, Edges, Line, Text, TextProps } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { usePortalStore, useTimelineOverlayStore } from "@stores";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";

import { WORK_TIMELINE } from "@constants";
import { WorkTimelinePoint } from "@types";

const reusableLeft = new THREE.Vector3(-0.3, 0, -0.1);
const reusableRight = new THREE.Vector3(0.3, 0, -0.1);
const getFocusFramePosition = (position: WorkTimelinePoint["position"]) =>
  new THREE.Vector3(position === "left" ? -1.28 : 1.28, -0.56, -0.16);

const TimelinePoint = ({ point, diff, progress }: { point: WorkTimelinePoint; diff: number; progress: number }) => {
  const pointRef = useRef<THREE.Group>(null);
  const isActive = usePortalStore((state) => state.activePortalId === "work");
  const setItem = useTimelineOverlayStore((state) => state.setItem);
  const removeItem = useTimelineOverlayStore((state) => state.removeItem);
  const hoveredSlug = useTimelineOverlayStore((state) => state.hoveredSlug);
  const selectedSlug = useTimelineOverlayStore((state) => state.selectedSlug);
  const isFocused = Math.abs(progress - point.focusProgress) <= point.focusWidth;
  const hovered = hoveredSlug === point.slug;
  const selected = selectedSlug === point.slug;
  const showFocusFrame = isFocused || hovered || selected;

  const getPoint = useMemo(() => {
    switch (point.position) {
      case "left":
        return reusableLeft;
      case "right":
        return reusableRight;
      default:
        return new THREE.Vector3();
    }
  }, [point.position]);

  const focusFramePosition = useMemo(() => getFocusFramePosition(point.position), [point.position]);
  const textAlign = point.position === "left" ? "right" : "left";
  const focusFrameWidth = isMobile ? 3.2 : 3.7;
  const focusFrameHeight = isMobile ? 1.75 : 1.95;

  const textProps: Partial<TextProps> = useMemo(
    () => ({
      font: "/Vercetti-Regular.woff",
      color: "white",
      anchorX: textAlign,
      fillOpacity: 2 - 2 * diff,
    }),
    [diff, textAlign]
  );

  const titleProps = useMemo(
    () => ({
      ...textProps,
      font: "/soria-font.ttf",
      fontSize: 0.6,
      maxWidth: 3,
    }),
    [textProps]
  );
  const { camera, gl } = useThree();

  useFrame(() => {
    if (!isActive || !showFocusFrame || !pointRef.current) {
      return;
    }

    const projected = pointRef.current.localToWorld(focusFramePosition.clone()).project(camera);
    const rect = gl.domElement.getBoundingClientRect();

    setItem({
      slug: point.slug,
      title: point.title,
      subtitle: point.subtitle,
      year: point.year,
      x: rect.left + ((projected.x + 1) / 2) * rect.width,
      y: rect.top + ((1 - projected.y) / 2) * rect.height,
      align: point.position,
    });
  });

  useEffect(() => {
    if (!showFocusFrame) {
      removeItem(point.slug);
    }

    return () => {
      removeItem(point.slug);
    };
  }, [point.slug, removeItem, showFocusFrame]);

  return (
    <group ref={pointRef} position={point.point} scale={isMobile ? 0.35 : 0.6}>
      {showFocusFrame && (
        <group position={focusFramePosition}>
          <Box args={[focusFrameWidth, focusFrameHeight, 0.04]}>
            <meshBasicMaterial transparent opacity={0.02} color={hovered || selected ? "#e2e8f0" : "#ffffff"} />
            <Edges color={selected ? "#f8fafc" : hovered ? "#cbd5e1" : "#94a3b8"} lineWidth={hovered || selected ? 2.8 : 1.6} />
          </Box>
        </group>
      )}

      <group>
        <Box args={[0.2, 0.2, 0.2]} position={[0, 0, -0.1]} scale={[1 - diff, 1 - diff, 1 - diff]}>
          <meshBasicMaterial color={hovered || selected ? "#cbd5e1" : "white"} wireframe />
          <Edges color={hovered || selected ? "#cbd5e1" : "white"} lineWidth={hovered || selected ? 2.5 : 1.5} />
        </Box>
        <group>
          <group position={getPoint}>
            <Text {...textProps} fontSize={0.3} position={[-diff / 2, 0, 0]}>
              {point.year}
            </Text>
            <group position={[0, -0.5, 0]}>
              <Text {...titleProps} fontSize={0.6} maxWidth={3} position={[0, -diff / 2, 0]}>
                {point.title}
              </Text>
              <Text {...textProps} fontSize={0.2} position={[0, -0.4 - diff, 0]}>
                {point.subtitle}
              </Text>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

const Timeline = ({ progress }: { progress: number }) => {
  const { camera } = useThree();
  const isActive = usePortalStore((state) => state.activePortalId === "work");
  const isSceneMotionPaused = usePortalStore((state) => state.isSceneMotionPaused);
  const isSceneRestoring = usePortalStore((state) => state.isSceneRestoring);
  const activeProjectSlug = usePortalStore((state) => state.activeProjectSlug);
  const clearItems = useTimelineOverlayStore((state) => state.clearItems);
  const setHoveredSlug = useTimelineOverlayStore((state) => state.setHoveredSlug);
  const setSelectedSlug = useTimelineOverlayStore((state) => state.setSelectedSlug);
  const timeline = useMemo(() => WORK_TIMELINE, []);
  const selectableTimeline = useMemo(
    () => timeline.filter((point) => point.selectable !== false),
    [timeline]
  );

  const curve = useMemo(() => new THREE.CatmullRomCurve3(timeline.map((p) => p.point), false), [timeline]);
  const curvePoints = useMemo(() => curve.getPoints(500), [curve]);
  const visibleCurvePoints = useMemo(
    () => curvePoints.slice(0, Math.max(1, Math.ceil(progress * curvePoints.length))),
    [curvePoints, progress]
  );
  const visibleTimelinePoints = useMemo(
    () => timeline
      .slice(0, Math.max(1, Math.round(progress * (timeline.length - 1) + 1)))
      .filter((point) => point.selectable !== false),
    [timeline, progress]
  );

  const [visibleDashedCurvePoints, setVisibleDashedCurvePoints] = useState<THREE.Vector3[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (isActive && !activeProjectSlug && !isSceneMotionPaused) {
      const position = curve.getPoint(progress);
      camera.position.x = THREE.MathUtils.damp(camera.position.x, (isMobile ? -1 : -2) + position.x, 4, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, -39 + position.z, 4, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, 13 - position.y, 4, delta);
    }
  });

  useEffect(() => {
    const tl = gsap.timeline();
    if (groupRef.current) {
      tl.to(groupRef.current.scale, {
        x: isActive ? 1 : 0,
        y: isActive ? 1 : 0,
        z: isActive ? 1 : 0,
        duration: 1,
        delay: isActive ? 0.4 : 0,
      });
      tl.to(
        groupRef.current.position,
        {
          y: isActive ? 0 : -2,
          duration: 1,
          delay: isActive ? 0.4 : 0,
        },
        0
      );
    }

    if (isActive) {
      let i = 0;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      const startDelay = isSceneRestoring ? 0 : 1000;
      timeoutRef.current = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          const p = i++ / 100;
          setVisibleDashedCurvePoints(curvePoints.slice(0, Math.max(1, Math.ceil(p * curvePoints.length))));
          if (i > 100 && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }, 10);
      }, startDelay);
    } else {
      setVisibleDashedCurvePoints([]);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      clearItems();
      setHoveredSlug(null);
      setSelectedSlug(null);
    }

    return () => {
      tl.kill();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [clearItems, curvePoints, isActive, isSceneRestoring, setHoveredSlug, setSelectedSlug]);

  useEffect(() => {
    return () => {
      clearItems();
      setHoveredSlug(null);
      setSelectedSlug(null);
      document.body.style.cursor = "auto";
    };
  }, [clearItems, setHoveredSlug, setSelectedSlug]);

  return (
    <group position={[0, -0.1, -0.1]}>
      <Text font="/soria-font.ttf" fontSize={isMobile ? 0.18 : 0.24} color="#dbe7f3" anchorX="center" position={[0, 2.35, 0.1]}>
        Click each project to open its page
      </Text>
      <Line points={visibleCurvePoints} color="white" lineWidth={3} />
      {visibleDashedCurvePoints.length > 0 && (
        <Line
          points={visibleDashedCurvePoints}
          color="white"
          lineWidth={0.5}
          dashed
          dashSize={0.25}
          gapSize={0.25}
        />
      )}
      <group ref={groupRef}>
        {visibleTimelinePoints.map((point, i) => {
          const diff = Math.min(2 * Math.max(i - progress * (selectableTimeline.length - 1), 0), 1);
          return <TimelinePoint point={point} key={point.slug} diff={diff} progress={progress} />;
        })}
      </group>
    </group>
  );
};

export default Timeline;
