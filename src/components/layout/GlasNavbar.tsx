"use client";

import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/src/lib/utils";

interface GlassNavbarProps {
  children: ReactNode;
  className?: string;
  forceSolid: boolean;
}

export default function GlassNavbar({
  children,
  className,
  forceSolid = false,
}: GlassNavbarProps & { forceSolid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll(); // verificar al cargar
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ... resto del código igual
  return (
    <nav
      className={cn(
        `
    fixed top-0 left-0 w-full z-50
    transition-[background-color,backdrop-filter] duration-200 ease-out
    ${
      forceSolid
        ? "bg-slate-950 shadow-xl border-b border-white/5 py-2"
        : scrolled
          ? "bg-slate-950/70 backdrop-blur-xl border-b border-white/5 py-2"
          : "bg-transparent py-4"
    }
    `,
        className,
      )}
    >
      {children}
    </nav>
  );
}
