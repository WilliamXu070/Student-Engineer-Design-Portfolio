'use client';

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import { rememberReturnTarget } from "@/app/lib/navigationMemory";

type RememberedLinkProps = {
  href: string;
  returnHref: string;
  returnLabel: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

const RememberedLink = ({
  href,
  returnHref,
  returnLabel,
  className,
  style,
  children,
}: RememberedLinkProps) => {
  return (
    <Link
      href={href}
      className={className}
      style={style}
      onClick={() => rememberReturnTarget({ href: returnHref, label: returnLabel })}>
      {children}
    </Link>
  );
};

export default RememberedLink;
