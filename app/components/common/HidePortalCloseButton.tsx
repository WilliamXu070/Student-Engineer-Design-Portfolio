'use client';

import { useEffect } from "react";

import { removePortalCloseButton } from "@/app/lib/portalUi";

const HidePortalCloseButton = () => {
  useEffect(() => {
    removePortalCloseButton();
  }, []);

  return null;
};

export default HidePortalCloseButton;
