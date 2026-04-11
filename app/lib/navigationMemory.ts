export type ReturnTarget = {
  href: string;
  label: string;
};

export type SceneSnapshot = {
  activePortalId: string | null;
  cameraPosition: [number, number, number];
  cameraRotation: [number, number, number];
  rootScrollProgress: number;
  workScrollProgress: number;
};

const RETURN_TARGET_KEY = "portfolio:return-target";
const SCENE_SNAPSHOT_KEY = "portfolio:scene-snapshot";
const PROJECTS_PORTAL_CAMERA_ROTATION: [number, number, number] = [-Math.PI / 2, 0, 0];
const PROJECTS_PORTAL_CAMERA_POSITION_DESKTOP: [number, number, number] = [2, -39, 11.5];
const PROJECTS_PORTAL_CAMERA_POSITION_MOBILE: [number, number, number] = [1, -39, 11.5];

export const rememberReturnTarget = (target: ReturnTarget) => {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(RETURN_TARGET_KEY, JSON.stringify(target));
};

export const readReturnTarget = (): ReturnTarget | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.sessionStorage.getItem(RETURN_TARGET_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as ReturnTarget;
  } catch {
    return null;
  }
};

export const rememberSceneSnapshot = (snapshot: SceneSnapshot) => {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(SCENE_SNAPSHOT_KEY, JSON.stringify(snapshot));
};

export const readSceneSnapshot = (): SceneSnapshot | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.sessionStorage.getItem(SCENE_SNAPSHOT_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as SceneSnapshot;
  } catch {
    return null;
  }
};

export const clearSceneSnapshot = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(SCENE_SNAPSHOT_KEY);
};

export const getProjectsPortalCameraPosition = (mobile: boolean): [number, number, number] =>
  mobile ? PROJECTS_PORTAL_CAMERA_POSITION_MOBILE : PROJECTS_PORTAL_CAMERA_POSITION_DESKTOP;

export const getProjectsPortalCameraRotation = (): [number, number, number] => PROJECTS_PORTAL_CAMERA_ROTATION;
