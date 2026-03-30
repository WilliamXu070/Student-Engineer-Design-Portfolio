'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

import { readReturnTarget, type ReturnTarget } from "@/app/lib/navigationMemory";

type RememberedBackLinkProps = {
  fallbackHref: string;
  fallbackLabel: string;
};

const RememberedBackLink = ({ fallbackHref, fallbackLabel }: RememberedBackLinkProps) => {
  const [target, setTarget] = useState<ReturnTarget>({
    href: fallbackHref,
    label: fallbackLabel,
  });

  useEffect(() => {
    const rememberedTarget = readReturnTarget();

    if (rememberedTarget) {
      setTarget(rememberedTarget);
    }
  }, []);

  return (
    <Link
      href={target.href}
      className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.28em] text-slate-700/70 transition-colors hover:text-slate-950"
      style={{ fontFamily: "var(--font-vercetti)" }}>
      <span aria-hidden="true">←</span>
      {target.label}
    </Link>
  );
};

export default RememberedBackLink;
