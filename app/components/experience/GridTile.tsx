
import { Edges, MeshPortalMaterial, Text, TextProps, useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { PORTAL_CLOSE_EVENT, ensurePortalCloseButton, removePortalCloseButton } from '@/app/lib/portalUi';
import { getPortalScrollLayers } from '@/app/lib/portalUi';
import { usePortalStore, useScrollStore } from '@stores';
import gsap from "gsap";
import { useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import * as THREE from 'three';
import { TriangleGeometry } from './Triangle';

interface GridTileProps {
  id: string;
  title: string;
  textAlign: TextProps['textAlign'];
  children: React.ReactNode;
  color: string;
  position: THREE.Vector3;
}

// TODO: Rename this
const GridTile = (props: GridTileProps) => {
  const entryStartRef = useRef<number | null>(null);
  const titleRef = useRef<THREE.Group>(null);
  const gridRef = useRef<THREE.Group>(null);
  const hoverBoxRef = useRef<THREE.Mesh>(null);
  const portalRef = useRef(null);
  const { title, textAlign, children, color, position, id } = props;
  const { camera } = useThree();
  const setActivePortal = usePortalStore((state) => state.setActivePortal);
  const portalReturnRootScrollProgress = usePortalStore((state) => state.portalReturnRootScrollProgress);
  const setPortalReturnRootScrollProgress = usePortalStore((state) => state.setPortalReturnRootScrollProgress);
  const isActive = usePortalStore((state) => state.activePortalId === id);
  const activePortalId = usePortalStore((state) => state.activePortalId);
  const recordPortalEntryMetric = usePortalStore((state) => state.recordPortalEntryMetric);
  const rootScrollProgress = useScrollStore((state) => state.scrollProgress);
  const setScrollProgress = useScrollStore((state) => state.setScrollProgress);
  const data = useScroll();

  useEffect(() => {
    // Hanlde the hover box and title animation for mobile.
    if (isMobile && titleRef.current) {
      const isWork = id === 'work';
      gsap.to(titleRef.current, {
        fontSize: 0.13,
        maxWidth: 4,
        color: isWork ? '#FFF' : '#888',
        letterSpacing: 0.4,
      });
      gsap.to(titleRef.current.position, {
        x: isWork ? 1: -1,
        y: isWork ? -1.7 : 1.5,
        duration: 0.5,
      });
    }
  }, []);

  useFrame(() => {
    const d = data.range(0.95, 0.05);
    if (isMobile && titleRef.current) {
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      (titleRef.current as any).fillOpacity = d;
    }
  });

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      exitPortal(true);
    }
  };
  const handlePortalClose = () => exitPortal(true);

  const portalInto = (e: React.MouseEvent) => {
    if (isActive || activePortalId) return;
    e.stopPropagation();
    entryStartRef.current = performance.now();
    setPortalReturnRootScrollProgress(rootScrollProgress);
    setActivePortal(id);
    document.body.style.cursor = 'auto';
    gsap.to(portalRef.current, {
      blend: 1,
      duration: 0.5,
    });
  };

  const exitPortal = (force = false) => {
    if (!force && !activePortalId) return;
    setActivePortal(null)
    const { root: rootScrollWrapper } = getPortalScrollLayers();
    const restoreRootScroll = () => {
      if (!rootScrollWrapper) {
        return;
      }

      const rootScrollableHeight = rootScrollWrapper.scrollHeight - rootScrollWrapper.clientHeight;
      rootScrollWrapper.scrollTop = Math.max(0, rootScrollableHeight * portalReturnRootScrollProgress);
      rootScrollWrapper.dispatchEvent(new Event("scroll"));
      setScrollProgress(portalReturnRootScrollProgress);
    };

    gsap.to(camera.position, {
      x: 0,
      duration: 1,
    });

    gsap.to(camera.rotation, {
      x: -Math.PI / 2,
      y: 0,
      duration: 1,
    });

    gsap.to(portalRef.current, {
      blend: 0,
      duration: 1,
    });

    removePortalCloseButton();
    document.body.removeEventListener('keydown', handleEscape);
    window.removeEventListener(PORTAL_CLOSE_EVENT, handlePortalClose);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        restoreRootScroll();
      });
    });
  }

  useEffect(() => {
    let animationFrameOne = 0;
    let animationFrameTwo = 0;

    if (activePortalId === id) {
      animationFrameOne = window.requestAnimationFrame(() => {
        animationFrameTwo = window.requestAnimationFrame(() => {
          if (entryStartRef.current !== null) {
            recordPortalEntryMetric(id, performance.now() - entryStartRef.current);
            entryStartRef.current = null;
          }
        });
      });

      ensurePortalCloseButton();
      document.body.addEventListener('keydown', handleEscape);
      window.addEventListener(PORTAL_CLOSE_EVENT, handlePortalClose);
      gsap.to(portalRef.current, {
        blend: 1,
        duration: 0.5,
      });
      return () => {
        window.cancelAnimationFrame(animationFrameOne);
        window.cancelAnimationFrame(animationFrameTwo);
        document.body.removeEventListener('keydown', handleEscape);
        window.removeEventListener(PORTAL_CLOSE_EVENT, handlePortalClose);
      };
    }

    gsap.to(portalRef.current, {
      blend: 0,
      duration: 0.5,
    });
    document.body.removeEventListener('keydown', handleEscape);
    window.removeEventListener(PORTAL_CLOSE_EVENT, handlePortalClose);

    if (!activePortalId) {
      removePortalCloseButton();
    }
  }, [activePortalId, handlePortalClose, id, recordPortalEntryMetric]);

  const fontProps: Partial<TextProps> = {
    font: "/soria-font.ttf",
    maxWidth: 2,
    anchorX: 'center',
    anchorY: 'bottom',
    fontSize: 0.7,
    color: 'white',
    textAlign: textAlign,
    fillOpacity: 0,
  };

  const onPointerOver = () => {
    if (isActive || isMobile) return;
    document.body.style.cursor = 'pointer';
    gsap.to(titleRef.current, {
      fillOpacity: 1
    });
    if (gridRef.current && hoverBoxRef.current) {
      gsap.to(gridRef.current.position, { z: 0.5, duration: 0.4});
      gsap.to(hoverBoxRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.4 });
    }
  };

  const onPointerOut = () => {
    if (isMobile) return;
    document.body.style.cursor = 'auto';
    gsap.to(titleRef.current, {
      fillOpacity: 0
    });
    if (gridRef.current && hoverBoxRef.current) {
      gsap.to(gridRef.current.position, { z: 0, duration: 0.4});
      gsap.to(hoverBoxRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.4 });
    }
  };

  const getGeometry = () => {
    if (!isMobile) {
      return <planeGeometry args={[4, 4, 1]} />
    }

    const isWork = id === 'work';
    const points = isWork ?
      [[-1, 2, 0], [-1, -2, 0], [3, -2, 0]] :
      [[-3, 2, 0], [1, -2, 0], [1, 2, 0]];

    return <primitive object={TriangleGeometry({ points })} attach="geometry" />
  };

  return (
    <mesh ref={gridRef}
      position={position}
      onClick={portalInto}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}>
      { getGeometry() }
      <group>
        <mesh position={[0, 0, -0.01]} ref={hoverBoxRef} scale={[0, 0, 0]}>
          <boxGeometry args={[4, 4, 0.5]}/>
          <meshPhysicalMaterial
            color="#444"
            transparent={true}
            opacity={0.3}
          />
          <Edges color="white" lineWidth={3}/>
        </mesh>
        <Text position={[0, -1.8, 0.4]} {...fontProps} ref={titleRef}>
          {title}
        </Text>
      </group>
      <MeshPortalMaterial
        ref={portalRef}
        blend={0}
        resolution={0}
        blur={0}
        events={isActive}
        eventPriority={isActive ? 1 : 0}>
        <color attach="background" args={[color]} />
        {children}
      </MeshPortalMaterial>
    </mesh>
  );
}

export default GridTile;
