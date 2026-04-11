import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  getProjectsPortalCameraPosition,
  getProjectsPortalCameraRotation,
  hasPendingSceneSnapshotForPortal,
} from "@/app/lib/navigationMemory";
import gsap from "gsap";
import { useLayoutEffect } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";
import { usePointerStore, usePortalStore } from "@stores";
import { Wanderer } from "../../models/Wanderer";
import ProjectsCarousel from "./ProjectsCarousel";
import { TouchPanControls } from "./TouchPanControls";

const Projects = () => {
  const { camera } = useThree();
  const isActive = usePortalStore((state) => state.activePortalId === "projects");
  const isSceneMotionPaused = usePortalStore((state) => state.isSceneMotionPaused);
  const isSceneRestoring = usePortalStore((state) => state.isSceneRestoring);
  const pointer = usePointerStore((state) => state.pointer);
  const data = useScroll();

  useLayoutEffect(() => {
    const isRestoringFromSnapshot = isSceneRestoring || hasPendingSceneSnapshotForPortal("projects");

    data.el.style.overflow = isActive ? 'hidden' : 'auto';
    data.fixed.style.pointerEvents = isActive ? 'none' : 'auto';

    if (isActive) {
      if (!isRestoringFromSnapshot) {
        const [x, y, z] = getProjectsPortalCameraPosition(isMobile);
        const [rotX, rotY, rotZ] = getProjectsPortalCameraRotation();
        gsap.to(camera.rotation, { x: rotX, y: rotY, z: rotZ, duration: 0.8 });
        gsap.to(camera.position, { x, y, z, duration: 1 });
      }
    }

    return () => {
      data.fixed.style.pointerEvents = 'auto';
    };
  }, [camera.position, camera.rotation, data, isActive, isSceneRestoring]);

  useFrame((_, delta) => {
    if (isActive && !isSceneMotionPaused) {
      if (!isMobile) {
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -(pointer.x * Math.PI) / 4, 0.03);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, 11.5 - pointer.y, 7, delta);
      }
    }
  });

  return (
    <group>
      <Wanderer rotation={new THREE.Euler(0, Math.PI / 6, 0)} scale={new THREE.Vector3(1.5, 1.5, 1.5)} position={new THREE.Vector3(0, -1, -1)}/>
      <ProjectsCarousel />
      { isActive && isMobile && <TouchPanControls /> }
    </group>
  );
};

export default Projects;
