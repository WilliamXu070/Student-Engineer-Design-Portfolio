import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: 'Sep 2025',
    title: 'Praxis I',
    subtitle: 'Design & Innovation',
    position: 'right',
    slug: 'praxis-i',
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: 'Nov 2025',
    title: 'CIV102 Bridge',
    subtitle: 'Structural Engineering',
    position: 'left',
    slug: 'civ102-bridge',
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: 'Jan 2026',
    title: 'Praxis II',
    subtitle: 'Systems Intervention',
    position: 'left',
    slug: 'praxis-ii',
  },
  {
    point: new THREE.Vector3(0, -1, -10),
    year: 'Mar 2026',
    title: 'Portfolio',
    subtitle: 'Reflection & Growth',
    position: 'left',
    slug: 'portfolio',
  },
  {
    point: new THREE.Vector3(1, 1, -12),
    year: 'Beyond',
    title: '∞',
    subtitle: 'Evolving Designer',
    position: 'right',
    slug: 'beyond',
  }
]
