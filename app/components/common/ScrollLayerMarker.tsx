'use client';

import { useScroll } from "@react-three/drei";
import { useEffect } from "react";

type ScrollLayerMarkerProps = {
  layer: "root" | "work";
};

const ATTRIBUTE_BY_LAYER: Record<ScrollLayerMarkerProps["layer"], string> = {
  root: "data-portal-scroll-root",
  work: "data-portal-scroll-work",
};

const ScrollLayerMarker = ({ layer }: ScrollLayerMarkerProps) => {
  const data = useScroll();

  useEffect(() => {
    const attribute = ATTRIBUTE_BY_LAYER[layer];
    const element = data.el;

    if (!element) {
      return;
    }

    element.setAttribute(attribute, "true");

    return () => {
      element.removeAttribute(attribute);
    };
  }, [data.el, layer]);

  return null;
};

export default ScrollLayerMarker;
