import { ScrollControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { usePortalStore, useScrollStore } from "@stores";
import gsap from "gsap";
import { useEffect } from "react";
import * as THREE from "three";
import { Memory } from "../../models/Memory";
import Timeline from "./Timeline";

const Work = () => {
  const { camera } = useThree();
  const isActive = usePortalStore((state) => state.activePortalId === 'work');
  const isSceneRestoring = usePortalStore((state) => state.isSceneRestoring);
  const { scrollProgress, setScrollProgress } = useScrollStore();

  const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight - target.clientHeight;
    const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
    setScrollProgress(progress);
  }

  // Hack: If the portal is active, add the scroll event listener to the scroll
  // wrapper div. If the portal is not active, remove the scroll event listener.
  // ScrollControls doesn't work out of the box, so we have to manually handle
  // the scroll event.
  useEffect(() => {
    if (isActive) {
      if (!isSceneRestoring) {
        gsap.to(camera.rotation, { x: -Math.PI / 2, y: 0, z: 0, duration: 0.8 });
      }
      const scrollWrapper = document.querySelector('div[style*="z-index: -1"]') as HTMLElement;
      const originalScrollWrapper = document.querySelector('div[style*="z-index: 1"]') as HTMLElement;
      if (!isSceneRestoring) {
        setScrollProgress(0);
      }
      scrollWrapper.addEventListener('scroll', handleScroll)
      scrollWrapper.style.zIndex = '1';
      originalScrollWrapper.style.zIndex = '-1';
    } else {
      const scrollWrapper = document.querySelector('div[style*="z-index: 1"]') as HTMLElement;
      const originalScrollWrapper = document.querySelector('div[style*="z-index: -1"]') as HTMLElement;

      if (scrollWrapper) {
        scrollWrapper.scrollTo({ top: 0, behavior: 'smooth' });
        setScrollProgress(0);
        scrollWrapper.removeEventListener('scroll', handleScroll);
        scrollWrapper.style.zIndex = '-1';
        originalScrollWrapper.style.zIndex = '1';
      }
    }
  }, [camera.rotation, isActive, isSceneRestoring, setScrollProgress]);

  return (
    <group>
      <mesh receiveShadow>
        <planeGeometry args={[4, 4, 1]} />
        <shadowMaterial opacity={0.1} />
      </mesh>
      <ScrollControls style={{ zIndex: -1}} pages={2} maxSpeed={0.4}>
        <Memory scale={new THREE.Vector3(5, 5, 5)} position={new THREE.Vector3(0, -6, 1)}/>
        <Timeline progress={isActive ? scrollProgress : 0} />
      </ScrollControls>
    </group>
  );
};

export default Work;
