"use client";

import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/src/lib/utils";

interface GlassNavbarProps {
  children: ReactNode;
  className?: string;
}

export default function GlassNavbar({ children, className }: GlassNavbarProps) {
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
        transition-all duration-500 ease-in-out
        ${
          scrolled
            ? "bg-blue-950/90 shadow-xl backdrop-blur-md border-b border-white/5 py-2"
            : "bg-transparent backdrop-blur-none border-b border-transparent py-4"
        }
        `,
        className,
      )}
    >
      {children}
    </nav>
  );
}
