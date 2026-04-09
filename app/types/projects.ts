interface ProjectUrl {
  text: string;
  url: string;
}

export interface CtmfDossierSection {
  title: string;
  bullets: string[];
  calloutTitle?: string;
  callouts?: string[];
  figures?: {
    src: string;
    alt: string;
    caption: string;
  }[];
}

export interface CtmfDossierArtifact {
  title: string;
  eyebrow: string;
  description: string;
  highlights?: string[];
  src?: string;
  alt?: string;
  sourceHref?: string;
  sourceLabel?: string;
}

export interface CtmfProjectDossier {
  project: string;
  phaseCode: string;
  claimHeadline: string;
  summary: string;
  artifacts?: CtmfDossierArtifact[];
  sections: CtmfDossierSection[];
}

export interface Project {
  slug: string;
  title: string;
  date: string;
  subtext: string;
  url?: string;
  urls?: ProjectUrl[];
}

export interface Ctmf {
  slug: string;
  title: string;
  stage: string;
  stageCode?: string;
  subtext: string;
  overview: string;
  whyItMatters: string;
  evidence: string[];
  application: string;
  dossiers?: CtmfProjectDossier[];
}
