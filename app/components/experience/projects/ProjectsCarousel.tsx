import { Edges, Text, TextProps } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import ProjectTile from "./ProjectTile";

import { PROJECTS, PROJECT_DETAILS } from "@constants";
import { usePortalStore } from "@stores";

const GROUP_ORDER = [
  { slug: "praxis-i", heading: "Praxis I" },
  { slug: "civ102-bridge", heading: "CIV102" },
  { slug: "praxis-ii", heading: "Praxis II" },
] as const;

const headingTextProps = {
  font: "/soria-font.ttf",
  color: "black",
  anchorX: "center" as const,
  anchorY: "middle" as const,
};

const kickerTextProps: Partial<TextProps> = {
  font: "./Vercetti-Regular.woff",
  color: "black",
  anchorX: "center",
  anchorY: "middle",
};

type VisibleTile = {
  slug: string;
  heading: string;
  project: (typeof PROJECTS)[number];
};

const ProjectGroupIndicator = ({
  heading,
  position,
  rotationY,
}: {
  heading: string;
  position: [number, number, number];
  rotationY: number;
}) => {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[4.8, 1.28, 1]} />
        <meshBasicMaterial color="#f5eddc" transparent opacity={0.95} />
        <Edges color="black" lineWidth={1.4} />
      </mesh>

      <mesh position={[-1.42, 0.56, 0.04]}>
        <planeGeometry args={[1.62, 0.34, 1]} />
        <meshBasicMaterial color="#ffe15c" />
        <Edges color="black" lineWidth={1.1} />
      </mesh>

      <Text
        {...kickerTextProps}
        position={[-1.42, 0.56, 0.08]}
        fontSize={0.13}>
        PROJECT
      </Text>

      <Text
        {...headingTextProps}
        position={[0, -0.02, 0.08]}
        maxWidth={4.1}
        fontSize={0.54}>
        {heading}
      </Text>
    </group>
  );
};

const ProjectsCarousel = () => {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const isActive = usePortalStore((state) => state.activePortalId === "projects");

  useEffect(() => {
    if (!isActive) {
      setActiveSlug(null);
    }
  }, [isActive]);

  const onClick = (slug: string) => {
    if (!isMobile) return;
    setActiveSlug((current) => current === slug ? null : slug);
  };

  const visibleProjects = useMemo<VisibleTile[]>(() => {
    return GROUP_ORDER.flatMap((group) => {
      const detail = PROJECT_DETAILS[group.slug];

      return detail.ctmfRefs
        .map((ctmfSlug) => PROJECTS.find((project) => project.slug === ctmfSlug))
        .filter((project): project is (typeof PROJECTS)[number] => Boolean(project))
        .map((project) => ({
          slug: group.slug,
          heading: group.heading,
          project,
        }));
    });
  }, []);

  const tileLayout = useMemo(() => {
    const fov = Math.PI;
    const distance = 13;
    const count = visibleProjects.length;

    return visibleProjects.map((entry, index) => {
      const angle = (fov / count) * index;
      const z = -distance * Math.sin(angle);
      const x = -distance * Math.cos(angle);
      const rotY = Math.PI / 2 - angle;

      return {
        ...entry,
        index,
        position: [x, 1, z] as [number, number, number],
        rotation: [0, rotY, 0] as [number, number, number],
      };
    });
  }, [visibleProjects]);

  const headingLayout = useMemo(() => {
    return GROUP_ORDER.map((group) => {
      const groupTiles = tileLayout.filter((tile) => tile.slug === group.slug);

      if (groupTiles.length === 0) {
        return null;
      }

      const centerX = groupTiles.reduce((sum, tile) => sum + tile.position[0], 0) / groupTiles.length;
      const centerZ = groupTiles.reduce((sum, tile) => sum + tile.position[2], 0) / groupTiles.length;
      const rotationY = groupTiles.reduce((sum, tile) => sum + tile.rotation[1], 0) / groupTiles.length;

      return {
        ...group,
        position: [centerX, 4.95, centerZ + 0.25] as [number, number, number],
        rotationY,
      };
    }).filter((heading): heading is NonNullable<typeof heading> => heading !== null);
  }, [tileLayout]);

  return (
    <group rotation={[0, -Math.PI / 12, 0]}>
      {headingLayout.map((heading) => (
        <ProjectGroupIndicator
          key={heading.slug}
          position={heading.position}
          heading={heading.heading}
          rotationY={heading.rotationY}
        />
      ))}

      {tileLayout.map((entry) => (
        <ProjectTile
          key={entry.project.slug}
          project={entry.project}
          itemKey={entry.project.slug}
          entranceIndex={entry.index}
          position={entry.position}
          rotation={entry.rotation}
          activeSlug={activeSlug}
          onClick={() => onClick(entry.project.slug)}
        />
      ))}
    </group>
  );
};

export default ProjectsCarousel;
