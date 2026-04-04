interface ProjectUrl {
  text: string;
  url: string;
}

export interface CtmfDossierSection {
  title: string;
  bullets: string[];
}

export interface CtmfProjectDossier {
  project: string;
  phaseCode: string;
  claimHeadline: string;
  summary: string;
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
