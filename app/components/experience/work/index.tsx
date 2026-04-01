import { ScrollControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { getPortalScrollLayers } from "@/app/lib/portalUi";
import { WORK_TIMELINE } from "@constants";
import { usePortalStore } from "@stores";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import ScrollLayerMarker from "../../common/ScrollLayerMarker";
import { Memory } from "../../models/Memory";
import Timeline from "./Timeline";

const MAGNET_RANGE = 0.1;
const MAGNET_STRENGTH = 0.2;

const Work = () => {
  const { camera } = useThree();
  const isActive = usePortalStore((state) => state.activePortalId === 'work');
  const isSceneRestoring = usePortalStore((state) => state.isSceneRestoring);
  const workScrollProgress = usePortalStore((state) => state.workPortalScrollProgress);
  const setWorkPortalScrollProgress = usePortalStore((state) => state.setWorkPortalScrollProgress);
  const isAdjustingScrollRef = useRef(false);

  const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement;

    if (isAdjustingScrollRef.current) {
      isAdjustingScrollRef.current = false;
      return;
    }

    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight - target.clientHeight;
    const rawProgress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
    const nearestPoint = WORK_TIMELINE.reduce((closest, point) => {
      if (!closest) {
        return point;
      }

      return Math.abs(point.focusProgress - rawProgress) < Math.abs(closest.focusProgress - rawProgress)
        ? point
        : closest;
    }, WORK_TIMELINE[0]);

    const distanceToFocus = Math.abs(nearestPoint.focusProgress - rawProgress);
    const nextProgress = distanceToFocus <= MAGNET_RANGE
      ? THREE.MathUtils.lerp(rawProgress, nearestPoint.focusProgress, MAGNET_STRENGTH)
      : rawProgress;

    if (scrollHeight > 0 && nextProgress !== rawProgress) {
      isAdjustingScrollRef.current = true;
      target.scrollTop = scrollHeight * nextProgress;
    }

    setWorkPortalScrollProgress(nextProgress);
  }

  const handleWheel = (event: WheelEvent) => {
    const target = event.currentTarget as HTMLElement;
    event.preventDefault();
    target.scrollTop -= event.deltaY;
  };

  // Hack: If the portal is active, add the scroll event listener to the scroll
  // wrapper div. If the portal is not active, remove the scroll event listener.
  // ScrollControls doesn't work out of the box, so we have to manually handle
  // the scroll event.
  useEffect(() => {
    const { root: rootScrollWrapper, work: workScrollWrapper } = getPortalScrollLayers();

    if (isActive) {
      if (!isSceneRestoring) {
        gsap.to(camera.rotation, { x: -Math.PI / 2, y: 0, z: 0, duration: 0.8 });
      }

      if (!workScrollWrapper || !rootScrollWrapper) {
        return;
      }

      if (!isSceneRestoring) {
        setWorkPortalScrollProgress(0);
      }
      workScrollWrapper.removeEventListener('scroll', handleScroll);
      workScrollWrapper.removeEventListener('wheel', handleWheel);
      workScrollWrapper.addEventListener('scroll', handleScroll);
      workScrollWrapper.addEventListener('wheel', handleWheel, { passive: false });
      workScrollWrapper.style.zIndex = '1';
      rootScrollWrapper.style.zIndex = '-1';
    } else {
      if (workScrollWrapper) {
        workScrollWrapper.scrollTop = 0;
        setWorkPortalScrollProgress(0);
        workScrollWrapper.removeEventListener('scroll', handleScroll);
        workScrollWrapper.removeEventListener('wheel', handleWheel);
        workScrollWrapper.style.zIndex = '-1';
      }

      if (rootScrollWrapper) {
        rootScrollWrapper.style.zIndex = '1';
      }
    }

    return () => {
      workScrollWrapper?.removeEventListener('scroll', handleScroll);
      workScrollWrapper?.removeEventListener('wheel', handleWheel);
    };
  }, [camera.rotation, isActive, isSceneRestoring, setWorkPortalScrollProgress]);

  return (
    <group>
      <mesh receiveShadow>
        <planeGeometry args={[4, 4, 1]} />
        <shadowMaterial opacity={0.1} />
      </mesh>
      <ScrollControls style={{ zIndex: -1}} pages={2} maxSpeed={0.4}>
        <ScrollLayerMarker layer="work" />
        <Memory scale={new THREE.Vector3(5, 5, 5)} position={new THREE.Vector3(0, -6, 1)}/>
        <Timeline progress={isActive ? workScrollProgress : 0} />
      </ScrollControls>
    </group>
  );
};

export default Work;
