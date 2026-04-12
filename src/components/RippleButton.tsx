"use client";

import { type ReactNode, type ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** Tailwind bg color class for the button face */
  color?: string;
  /** CSS rgba color for the ripple rings */
  rippleCss?: string;
  /** Render as a Next.js Link instead of a button */
  href?: string;
  /** Additional classes */
  className?: string;
}

export default function RippleButton({
  children,
  color = "bg-orange-500",
  rippleCss = "rgba(249, 115, 22, 0.4)",
  href,
  className = "",
  ...rest
}: RippleButtonProps) {
  const style = { "--ripple-color": rippleCss } as React.CSSProperties;

  const inner = (
    <span
      className={`ripple-btn relative block ${color} rounded-full px-8 py-3 text-white text-center font-semibold text-sm ${className}`}
      style={style}
    >
      <span className="ripple-extra absolute inset-0 rounded-full pointer-events-none" />
      <span className="relative z-10">{children}</span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {inner}
      </Link>
    );
  }

  return (
    <button {...rest} className="inline-block cursor-pointer bg-transparent border-none p-0">
      {inner}
    </button>
  );
}
