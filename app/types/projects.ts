interface ProjectUrl {
  text: string;
  url: string;
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
  subtext: string;
  overview: string;
  whyItMatters: string;
  evidence: string[];
  application: string;
}
