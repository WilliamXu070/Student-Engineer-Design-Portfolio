import { Edges, Text, TextProps } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";

import { getFdcrStageLabel, getFdcrStageTheme } from "@constants";
import {
	rememberReturnTarget,
	rememberSceneSnapshot,
} from "@/app/lib/navigationMemory";
import { getPortalScrollLayers } from "@/app/lib/portalUi";
import { usePortalStore, useScrollStore } from "@stores";
import { Ctmf } from "@types";

interface ProjectTileProps {
  project: Ctmf;
  itemKey: string;
  entranceIndex: number;
  position: [number, number, number];
  rotation: [number, number, number];
  activeSlug: string | null;
  onClick: () => void;
}

const ProjectTile = ({ project, itemKey, entranceIndex, position, rotation, activeSlug, onClick }: ProjectTileProps) => {
  const projectRef = useRef<THREE.Group>(null);
  const hoverAnimRef = useRef<gsap.core.Timeline | null>(null);
  const [hovered, setHovered] = useState(false);
  const isProjectSectionActive = usePortalStore((state) => state.activePortalId === "projects");
  const sceneCameraPosition = usePortalStore((state) => state.sceneCameraPosition);
  const sceneCameraRotation = usePortalStore((state) => state.sceneCameraRotation);
  const router = useRouter();
  const rootScrollProgress = useScrollStore((state) => state.scrollProgress);

  const titleProps = useMemo(() => ({
    font: "/soria-font.ttf",
    color: "black",
  }), []);

  const subtitleProps: Partial<TextProps> = useMemo(() => ({
    font: "./Vercetti-Regular.woff",
    color: "black",
    anchorX: "left",
    anchorY: "top",
  }), []);

  const stageTheme = useMemo(
    () => getFdcrStageTheme(project.stageCode, project.stage),
    [project.stageCode, project.stage],
  );
  const stageCode = useMemo(
    () => project.stageCode ?? project.stage.charAt(0),
    [project.stageCode, project.stage],
  );
  const isCombinedStage = useMemo(() => stageCode.includes("/"), [stageCode]);
  const stageLabel = useMemo(
    () => getFdcrStageLabel(stageCode, project.stage).toUpperCase(),
    [stageCode, project.stage],
  );
  const stageBadgeWidth = isCombinedStage ? 2.35 : 2.55;
  const stageBadgeCenterX = -2.52 + stageBadgeWidth / 2;
  const stageTextX = -stageBadgeWidth / 2 + 0.16;
  const stageFontSize = isCombinedStage ? 0.145 : 0.2;
  const stageTextMaxWidth = isCombinedStage ? 3.18 : 2.12;

  useEffect(() => {
    if (!projectRef.current) return;
    hoverAnimRef.current?.kill();

    const [mesh, title, dateGroup, textBox, button] = projectRef.current.children;

    hoverAnimRef.current = gsap.timeline();
    hoverAnimRef.current
      .to(projectRef.current.position, { z: hovered ? 1 : 0, duration: 0.2 }, 0)
      .to(projectRef.current.position, { y: hovered ? 0.4 : 0 }, 0)
      .to(projectRef.current.scale, {
        x: hovered ? 1.3 : 1,
        y: hovered ? 1.3 : 1,
        z: hovered ? 1.3 : 1,
      }, 0)
      .to(title.position, { y: hovered ? 0.7 : -0.8 }, 0)
      .to(textBox.position, { y: hovered ? 0.7 : 0 }, 0)
      // .to(textBox.scale, { y: hovered ? 1 : 0, x: hovered ? 1 : 0 }, 0)
      .to(textBox, { fillOpacity: hovered ? 1 : 0, duration: 0.4 }, 0)
      .to(dateGroup.position, { y: hovered ? 2.6 : 1.4 }, 0)
      .to(mesh.scale, { y: hovered ? 2 : 1 }, 0)
      .to((mesh as THREE.Mesh).material, { opacity: hovered ? 0.95 : 0.3 }, 0)
      .to(mesh.position, { y: hovered ? 1 : 0 }, 0);

    hoverAnimRef.current
      .to(button.scale, { y: hovered ? 1 : 0, x: hovered ? 1 : 0 }, 0)
      .to(button.position, { z: hovered ? 0.3 : -1 }, 0);
  }, [hovered]);

  useEffect(() => {
    if (isMobile) {
      setHovered(activeSlug === itemKey);
    }
  }, [activeSlug, isMobile, itemKey]);

  useEffect(() => {
    if (projectRef.current) {
      gsap.to(projectRef.current.position, {
        y: isProjectSectionActive ? 0 : -10,
        duration: 1,
        delay: isProjectSectionActive ? entranceIndex * 0.1 : 0,
      });
    }
  }, [entranceIndex, isProjectSectionActive]);

	const handleClick = (e: ThreeEvent<MouseEvent>) => {
		e.stopPropagation();
		const button = e.eventObject;
		const { root: rootScrollWrapper } = getPortalScrollLayers();
		const scrollableHeight = rootScrollWrapper ? rootScrollWrapper.scrollHeight - rootScrollWrapper.clientHeight : 0;
		const liveRootScrollProgress = rootScrollWrapper && scrollableHeight > 0
			? rootScrollWrapper.scrollTop / scrollableHeight
      : rootScrollProgress;

    gsap.to(button.position, { z: 0, duration: 0.1 })
      .then(() => gsap.to(button.position, { z: 0.3, duration: 0.3 }));
    rememberSceneSnapshot({
      activePortalId: "projects",
      cameraPosition: sceneCameraPosition,
      cameraRotation: sceneCameraRotation,
      rootScrollProgress: liveRootScrollProgress,
      workScrollProgress: 0,
    });
    rememberReturnTarget({ href: "/?portal=projects", label: "Back to CTMFs" });
    setTimeout(() => router.push(`/ctmfs/${project.slug}`), 50);
  };

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={onClick}
      onPointerOver={() => !isMobile && isProjectSectionActive && setHovered(true)}
      onPointerOut={() => !isMobile && isProjectSectionActive && setHovered(false)}>
      <group ref={projectRef}>
        <mesh>
          <planeGeometry args={[4.2, 2, 1]} />
          <meshBasicMaterial color="#FFF" transparent opacity={0.3}/>
          {/* <meshPhysicalMaterial transmission={1} roughness={0.3} /> */}
          <Edges color="black" lineWidth={1.5} />
        </mesh>
        <Text
          {...titleProps}
          position={[-1.9, -0.8, 0.101]}
          anchorX="left"
          anchorY="bottom"
          maxWidth={4}
          fontSize={0.8}>
          {project.title}
        </Text>
        <group position={[stageBadgeCenterX, 1.4, 0.01]}>
          <mesh>
            <planeGeometry args={[stageBadgeWidth, 0.46, 1]} />
            <meshBasicMaterial color={stageTheme.tileFill} />
            <Edges color="black" lineWidth={1} />
          </mesh>
          <Text
            {...subtitleProps}
            color={stageTheme.tileText}
            position={[stageTextX, 0.16, 0.06]}
            maxWidth={stageTextMaxWidth}
            fontSize={stageFontSize}>
            {stageLabel}
          </Text>
        </group>
        <Text
          {...subtitleProps}
          maxWidth={3.8}
          position={[-1.9, 2.3, 0.1]}
          // scale={[0, 0, 1]}
          fontSize={0.2}>
          {project.subtext}
        </Text>
        <group
          position={[1.05, -0.6, -1]}
          scale={[0, 0, 1]}
          onClick={handleClick}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'auto'}>
          <mesh>
            <boxGeometry args={[1.6, 0.4, 0.2]} />
            <meshBasicMaterial color="#222" />
            <Edges color="white" lineWidth={1} />
          </mesh>
          <Text
            {...subtitleProps}
            color="white"
            position={[-0.65, 0.15, 0.2]}
            fontSize={0.22}>
            OPEN
          </Text>
        </group>
      </group>
    </group>
  );
};

export default ProjectTile;
