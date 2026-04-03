"use client";

import Link from "next/link";
import { useRef } from "react";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const ReflectButton = ({ href, children, className }: Props) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const frame = useRef<number | null>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    if (frame.current) cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      const rect = ref.current!.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ref.current!.style.setProperty("--x", `${x}px`);
      ref.current!.style.setProperty("--y", `${y}px`);
    });
  };

  const handleLeave = () => {
    if (!ref.current) return;

    ref.current.style.setProperty("--x", `50%`);
    ref.current.style.setProperty("--y", `50%`);
  };

  return (
    <Link
      href={href}
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`
        group relative inline-flex items-center justify-center
        px-8 py-4 rounded-full overflow-hidden

        bg-white/5 border border-white/20
        backdrop-blur-xl

        transition-all duration-300
        hover:border-white/40 hover:bg-white/8

        ${className}
      `}
      style={
        {
          "--x": "50%",
          "--y": "50%",
        } as React.CSSProperties
      }
    >
      {/* ✨ REFLECTOR */}
      <div
        className="
          pointer-events-none absolute inset-0 rounded-full
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        "
        style={{
          background: `
            radial-gradient(
              200px circle at var(--x) var(--y),
              rgba(255,255,255,0.25),
              transparent 60%
            )
          `,
        }}
      />

      {/* Glow suave */}
      <div className="absolute inset-0 rounded-full bg-linear-to-r from-white/10 to-transparent 
      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* CONTENIDO */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Link>
  );
};
