export const PORTAL_CLOSE_EVENT = "portfolio:close-portal";
const ROOT_SCROLL_ATTR = "data-portal-scroll-root";
const WORK_SCROLL_ATTR = "data-portal-scroll-work";

export const ensurePortalCloseButton = () => {
  if (typeof document === "undefined" || document.querySelector(".close")) {
    return;
  }

  const button = document.createElement("div");
  button.className = "fixed close";
  button.style.transform = "rotateX(0deg)";
  button.style.opacity = "1";
  button.style.zIndex = "120";
  button.onclick = () => {
    window.dispatchEvent(new CustomEvent(PORTAL_CLOSE_EVENT));
  };

  document.body.appendChild(button);
};

export const removePortalCloseButton = () => {
  if (typeof document === "undefined") {
    return;
  }

  document.querySelectorAll(".close").forEach((element) => {
    element.remove();
  });
};

const getTaggedElement = (attribute: string) => {
  if (typeof document === "undefined") {
    return null;
  }

  return document.querySelector<HTMLElement>(`[${attribute}="true"]`);
};

export const getPortalScrollLayers = () => {
  const taggedRoot = getTaggedElement(ROOT_SCROLL_ATTR);
  const taggedWork = getTaggedElement(WORK_SCROLL_ATTR);

  return { root: taggedRoot, work: taggedWork };
};
