'use client';

import { Text } from "@react-three/drei";

import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import CloudContainer from "../models/Cloud";
import StarsContainer from "../models/Stars";
import WindowModel from "../models/WindowModel";
import TextWindow from "./TextWindow";
import { withBasePath } from "@/app/lib/sitePath";

const Hero = () => {
  const titleRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const detailRef = useRef<THREE.Mesh>(null);
  const cueRef = useRef<THREE.Mesh>(null);
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100 && titleRef.current) {
      gsap.fromTo(titleRef.current.position, {
        y: -10,
        duration: 1,
        // delay: 1.5,
      }, {
        y: 0,
        duration: 3
      });
    }

    if (progress === 100) {
      [bodyRef.current, detailRef.current, cueRef.current].forEach((ref, index) => {
        if (!ref) return;

        gsap.fromTo(ref.position, {
          y: ref.position.y - 1.6,
        }, {
          y: ref.position.y,
          duration: 2.2,
          delay: 0.45 + index * 0.14,
          ease: "power3.out",
        });
      });
    }
  }, [progress]);

  const fontProps = {
    font: soriaFontPath,
    fontSize: 1.28,
  };
  
  const maxWidth2 = 15;
  const maxfont = 0.38;
  
  return (
    <>
      <group position={[0, 5.35, -10]}>
        <Text
          position={[0, 15.42, 0]}
          maxWidth={25.5}
          textAlign="center"
          {...fontProps}
          ref={titleRef}>
          William&apos;s Engineering Design Portfolio
        </Text>
        <Text
          ref={bodyRef}
          font={vercettiFontPath}
          fontSize={maxfont}
          maxWidth={maxWidth2}
          lineHeight={1.42}
          color="rgba(255,255,255,0.78)"
          anchorX="center"
          anchorY="middle"
          textAlign="center"
          position={[0, -2.2, 0]}>
          Hello, I&apos;m William Xu, a first year engineering science student at The University of Toronto. This portfolio documents how my approach to engineering design developed across Praxis I, CIV102, and Praxis II through project work, reflection, engineering decisions, and iterative self-assessment.
        </Text>
        <Text
          ref={detailRef}
          font={vercettiFontPath}
          fontSize={maxfont}
          maxWidth={maxWidth2}
          lineHeight={1.4}
          color="rgba(189,209,227,0.88)"
          anchorX="center"
          anchorY="middle"
          textAlign="center"
          position={[0, -4.58, 0]}>
          As you continue downward, the portfolio opens into two paths: Engineering Tasks presents the projects as case studies, while the CTMF Dossier traces the methods and frameworks that shaped how those projects were framed, explored, and evaluated in a ESC102 framework.
        </Text>
        <Text
          ref={cueRef}
          font={vercettiFontPath}
          fontSize={maxfont}
          maxWidth={maxWidth2}
          lineHeight={1.35}
          color="rgba(255,255,255,0.62)"
          anchorX="center"
          anchorY="middle"
          textAlign="center"
          position={[0, -6.28, 0]}>
          At any time select position + values to view my position in context.
        </Text>
      </group>
      <StarsContainer />
      <CloudContainer/>
      <group position={[0, -25, 5.69]}>
        <pointLight castShadow position={[1, 1, -2.5]} intensity={60} distance={10}/>
        <WindowModel receiveShadow/>
        <TextWindow/>
      </group>
    </>
  );
};

export default Hero;
  const soriaFontPath = withBasePath("/soria-font.ttf");
  const vercettiFontPath = withBasePath("/Vercetti-Regular.woff");
