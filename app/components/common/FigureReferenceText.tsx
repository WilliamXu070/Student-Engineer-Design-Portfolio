import type { CSSProperties, ReactNode } from "react";

import InlineCitation from "./InlineCitation";

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

const MIXED_REF_PATTERN = /\[\[fig:([A-Za-z0-9.-]+)(?:\|([^\]]+))?\]\]|\[\[cite:([A-Za-z0-9._,\-\s]+)\]\]/g;

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

  for (const match of text.matchAll(MIXED_REF_PATTERN)) {
    const matchIndex = match.index ?? 0;
    const [fullMatch, figureKey, displayText, rawCitationIds] = match;

    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex));
    }

    if (rawCitationIds) {
      nodes.push(
        <InlineCitation
          key={`${rawCitationIds}-${matchIndex}`}
          referenceIds={rawCitationIds.split(",").map((value) => value.trim()).filter(Boolean)}
        />,
      );
      lastIndex = matchIndex + fullMatch.length;
      continue;
    }

    const target = figureKey ? refs[figureKey] : undefined;
    const linkLabel = displayText ?? target?.label ?? (figureKey ? `Fig. ${figureKey}` : "");

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
