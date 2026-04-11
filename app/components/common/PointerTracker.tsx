'use client';

import { useEffect } from "react";

import { usePointerStore } from "@stores";

const PointerTracker = () => {
  const setPointer = usePointerStore((state) => state.setPointer);

  useEffect(() => {
    const updatePointer = (clientX: number, clientY: number) => {
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = -((clientY / window.innerHeight) * 2 - 1);

      setPointer(x, y);
    };

    const handleMouseMove = (event: MouseEvent) => {
      updatePointer(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];

      if (!touch) {
        return;
      }

      updatePointer(touch.clientX, touch.clientY);
    };

    const resetPointer = () => {
      setPointer(0, 0);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseleave", resetPointer);
    window.addEventListener("blur", resetPointer);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", resetPointer);
      window.removeEventListener("blur", resetPointer);
    };
  }, [setPointer]);

  return null;
};

export default PointerTracker;
