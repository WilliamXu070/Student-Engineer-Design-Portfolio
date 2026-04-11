import * as THREE from "three";

export interface WorkTimelinePoint {
  point: THREE.Vector3,
  year: string,
  title: string,
  subtitle?: string,
  position: 'left' | 'right',
  slug: string,
  selectable?: boolean,
  focusProgress: number,
  focusWidth: number,
  overlayLeft: number,
  overlayTop: number,
  overlayWidth: number,
  overlayHeight: number,
}
