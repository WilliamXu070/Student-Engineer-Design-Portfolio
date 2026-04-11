import { Svg, Text, useCursor, useScroll } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";
import { FOOTER_COPY, FOOTER_LINKS } from "../../constants";
import { FooterLink } from "../../types";
import { withBasePath } from "@/app/lib/sitePath";

const FooterLinkItem = ({ link }: { link: FooterLink }) => {
  const textRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const tooltipId = `footer-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`;
  const onPointerOver = () => setHovered(true);
  const onPointerOut = () => setHovered(false);
  const onClick = () => window.open(link.url, '_blank');
  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (isMobile) return;
    const hoverDiv = document.getElementById(tooltipId);
    gsap.to(hoverDiv, {
      top: `${e.clientY + 14}px`,
      left: `${e.clientX}px`,
      duration: 0.6,
    });
  };

  const fontProps = {
    font: withBasePath("/Vercetti-Regular.woff"),
    fontSize: 0.2,
    color: 'white',
    onPointerOver,
    onPointerMove,
    onPointerOut,
    onClick,
  };

  useEffect(() => {
    if (isMobile) return;

    const hoverDiv = document.getElementById(tooltipId);

    if (!hoverDiv) {
      const hoverDiv = document.createElement('div');
      hoverDiv.id = tooltipId;
      hoverDiv.textContent = link.hoverText ?? link.name.toUpperCase();
      hoverDiv.style.position = 'fixed';
      hoverDiv.style.zIndex = '4';
      hoverDiv.style.bottom = '0';
      hoverDiv.style.opacity = '0';
      hoverDiv.style.left = window.innerWidth / 2 + 'px';
      hoverDiv.style.fontSize = '0.76rem';
      hoverDiv.style.letterSpacing = '0.14em';
      hoverDiv.style.textTransform = 'uppercase';
      hoverDiv.style.color = 'rgba(255, 255, 255, 0.78)';
      hoverDiv.style.pointerEvents = 'none';
      hoverDiv.style.fontFamily = '"Vercetti-Regular", Arial, sans-serif';
      document.body.appendChild(hoverDiv);
      return () => {
        hoverDiv.remove();
      };
    }

    return () => {
      hoverDiv?.remove();
    };
  }, [isMobile, link.hoverText, link.name, tooltipId]);

  useEffect(() => {
    if (isMobile) return

    const hoverDiv = document.getElementById(tooltipId);

    if (hovered) {
      gsap.fromTo(hoverDiv, { opacity: 0 }, { opacity: 0.72, delay: 0.2 });
    } else {
      gsap.to(hoverDiv, { opacity: 0 });
    }

    gsap.to(textRef.current, {
      letterSpacing: hovered ? 0.3 : 0,
      y: hovered ? 0.05 : 0,
      duration: 0.3,
    });

    return () => {
      gsap.killTweensOf(hoverDiv);
      gsap.killTweensOf(textRef.current);
    }
  }, [hovered, tooltipId]);

  useCursor(hovered);

  if (isMobile) {
    return (
      <group onClick={onClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
        <Svg scale={0.00135} position={[0, 0.1, 0]} src={withBasePath(link.icon)} />
        <Text
          font={withBasePath("/Vercetti-Regular.woff")}
          fontSize={0.08}
          color="white"
          position={[0, -0.16, 0]}
          anchorX="center">
          {link.name.toUpperCase()}
        </Text>
      </group>
    );
  }

  return (
    <Text ref={textRef} {...fontProps} >
      {link.name.toUpperCase()}
    </Text>
  )
}

const Footer = () => {
  const groupRef = useRef<THREE.Group>(null);
  const data = useScroll();
  const panelWidth = isMobile ? 4.8 : 9.6;
  const panelHeight = isMobile ? 2.2 : 1.75;
  const contentX = isMobile ? -2 : -4;

  useFrame(() => {
    const d = data.range(0.8, 0.2);
    if (groupRef.current) {
      groupRef.current.visible = d > 0;
    }
  });

  const getLinks = () => {
    return FOOTER_LINKS.map((link, i) => {
      const xOffset = isMobile ? (i % 2) * 1.7 : i * 2.15;
      const yOffset = isMobile ? -Math.floor(i / 2) * 0.82 : 0;

      return (
        <group key={i} position={[xOffset, yOffset, 0]}>
          <FooterLinkItem link={link}/>
        </group>
      );
    });
  };

  return (
    <group position={[0, -42.8, 17]} rotation={[-Math.PI / 2, 0, 0]} ref={groupRef}>
      <mesh position={[0, 0.15, -0.08]}>
        <planeGeometry args={[panelWidth, panelHeight, 1]} />
        <meshBasicMaterial color="#0b1320" opacity={0.28} transparent />
      </mesh>
      <mesh position={[contentX + (isMobile ? 0.62 : 0.75), 0.82, -0.04]}>
        <planeGeometry args={[isMobile ? 1.25 : 1.55, 0.035, 1]} />
        <meshBasicMaterial color="#bdd1e3" opacity={0.9} transparent />
      </mesh>

      <Text
        font={withBasePath("/Vercetti-Regular.woff")}
        fontSize={0.1}
        color="#bdd1e3"
        anchorX="left"
        position={[contentX, 0.9, 0]}>
        {FOOTER_COPY.eyebrow.toUpperCase()}
      </Text>

      <Text
        font={withBasePath("/soria-font.ttf")}
        fontSize={isMobile ? 0.19 : 0.25}
        maxWidth={isMobile ? 4.1 : 5.2}
        lineHeight={1.0}
        color="white"
        anchorX="left"
        anchorY="top"
        position={[contentX, 0.68, 0]}>
        {FOOTER_COPY.headline}
      </Text>

      <Text
        font={withBasePath("/Vercetti-Regular.woff")}
        fontSize={isMobile ? 0.095 : 0.1}
        maxWidth={isMobile ? 4.1 : 7.8}
        lineHeight={1.18}
        color="rgba(255,255,255,0.72)"
        anchorX="left"
        anchorY="top"
        position={[contentX, isMobile ? 0.22 : 0.14, 0]}>
        {FOOTER_COPY.body}
      </Text>

      <group position={[contentX, isMobile ? -0.42 : -0.32, 0]}>
        {getLinks()}
      </group>
    </group>

  );
};

export default Footer;
