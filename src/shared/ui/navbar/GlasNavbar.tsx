"use client";

import { ReactNode } from "react";

interface GlassNavbarProps {
  children: ReactNode;
  className?: string;
}

export default function GlassNavbar({ children, className }: GlassNavbarProps) {
  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        bg-blue-900/20 backdrop-blur-md
        border-b border-white/10
        ${className}
      `}
    >
      {children}
    </nav>
  );
}
