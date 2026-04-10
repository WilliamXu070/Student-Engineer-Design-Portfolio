import type { CSSProperties, ReactNode } from "react";

export type FigureReferenceMap = Record<
  string,
  {
    href: string;
    label: string;
  }
>;

type FigureReferenceTextProps = {
  text: string;
  refs: FigureReferenceMap;
  className?: string;
  style?: CSSProperties;
  linkClassName?: string;
};

const FIGURE_REF_PATTERN = /\[\[fig:([A-Za-z0-9.-]+)(?:\|([^\]]+))?\]\]/g;

export const getFigureAnchorId = (pageKey: string, figureKey: string) =>
  `${pageKey}-fig-${figureKey.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export const FigureReferenceText = ({
  text,
  refs,
  className,
  style,
  linkClassName = "underline decoration-current underline-offset-4 hover:opacity-80",
}: FigureReferenceTextProps) => {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(FIGURE_REF_PATTERN)) {
    const matchIndex = match.index ?? 0;
    const [fullMatch, figureKey, displayText] = match;

    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex));
    }

    const target = refs[figureKey];
    const linkLabel = displayText ?? target?.label ?? `Fig. ${figureKey}`;

    if (target) {
      nodes.push(
        <a key={`${figureKey}-${matchIndex}`} href={target.href} className={linkClassName}>
          {linkLabel}
        </a>,
      );
    } else {
      nodes.push(linkLabel);
    }

    lastIndex = matchIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return (
    <span className={className} style={style}>
      {nodes}
    </span>
  );
};
