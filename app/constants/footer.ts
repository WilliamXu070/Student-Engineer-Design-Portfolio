import { FooterLink } from "../types";

export const FOOTER_COPY = {
  eyebrow: "Closing Frame",
  headline: "Open to thoughtful engineering conversations.",
  body:
    "This portfolio is meant to start a conversation about craft, systems, and collaboration. If something here resonates, I would be glad to continue the dialogue.",
};

export const FOOTER_LINKS: FooterLink[] = [
  {
    name: 'LinkedIn',
    hoverText: 'Connect with me',
    icon: 'icons/linkedin.svg',
    url: 'https://www.linkedin.com/in/william/',
  },
  {
    name: 'GitHub',
    hoverText: 'My repositories',
    icon: 'icons/github.svg',
    url: 'https://github.com/',
  },
  {
    name: 'Email',
    hoverText: 'Get in touch',
    icon: 'icons/file.svg',
    url: 'mailto:william@mail.utoronto.ca',
  },
  {
    name: 'UofT',
    hoverText: 'University of Toronto',
    icon: 'icons/file.svg',
    url: 'https://www.utoronto.ca/',
  },
];
