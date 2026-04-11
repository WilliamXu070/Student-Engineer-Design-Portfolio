'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { readReturnTarget, type ReturnTarget } from "@/app/lib/navigationMemory";

type RememberedBackLinkProps = {
  fallbackHref: string;
  fallbackLabel: string;
  className?: string;
};

const RememberedBackLink = ({ fallbackHref, fallbackLabel, className }: RememberedBackLinkProps) => {
  const pathname = usePathname();
  const [target, setTarget] = useState<ReturnTarget>({
    href: fallbackHref,
    label: fallbackLabel,
  });

  useEffect(() => {
    const rememberedTarget = readReturnTarget();

    if (rememberedTarget && rememberedTarget.href !== pathname) {
      setTarget(rememberedTarget);
    } else {
      setTarget({
        href: fallbackHref,
        label: fallbackLabel,
      });
    }
  }, [fallbackHref, fallbackLabel, pathname]);

  return (
    <Link
      href={target.href}
      className={`inline-flex items-center gap-3 text-sm uppercase tracking-[0.28em] transition-colors ${
        className ?? "text-slate-700/70 hover:text-slate-950"
      }`}
      style={{ fontFamily: "var(--font-vercetti)" }}>
      <span aria-hidden="true">&larr;</span>
      {target.label}
    </Link>
  );
};

export default RememberedBackLink;
