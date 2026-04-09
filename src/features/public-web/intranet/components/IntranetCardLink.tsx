"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { iconMap } from "@/src/lib/icons";
import { useRef } from "react";

interface Props {
  id: number;
  title: string;
  description: string;
  url: string;
  icon: string | null;
  index: number;
}

export const IntranetCardLink = ({
  id,
  title,
  description,
  url,
  icon,
  index,
}: Props) => {
  const IconComponent =
    iconMap[icon as keyof typeof iconMap] || iconMap.LinkIcon;

  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const frame = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    if (frame.current) cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      const rect = cardRef.current!.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = (y / rect.height - 0.5) * -8; // tilt vertical
      const rotateY = (x / rect.width - 0.5) * 8; // tilt horizontal

      cardRef.current!.style.setProperty("--x", `${x}px`);
      cardRef.current!.style.setProperty("--y", `${y}px`);
      cardRef.current!.style.transform = `
        perspective(800px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.02)
      `;
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    cardRef.current.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";

    cardRef.current.style.setProperty("--x", `50%`);
    cardRef.current.style.setProperty("--y", `50%`);
  };

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <Link
        ref={cardRef}
        href={url}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="
          group relative block h-full p-8 rounded-3xl 
          transition-[border,background,box-shadow] duration-300
          will-change-transform

          bg-white/2.5 border border-white/10
          hover:border-blue-400/40

          backdrop-blur-xl
          overflow-hidden
        "
        style={
          {
            "--x": "50%",
            "--y": "50%",
          } as React.CSSProperties
        }
      >
        {/* SPOTLIGHT dinámico */}
        <div
          className="
            pointer-events-none absolute inset-0 rounded-3xl
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          "
          style={{
            background: `
              radial-gradient(
                400px circle at var(--x) var(--y),
                rgba(59,130,246,0.25),
                transparent 60%
              )
            `,
          }}
        />

        {/* Glow base */}
        <div className="absolute inset-0 rounded-3xl bg-linear-to-b from-blue-500/5 
        to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* ICON */}
        <div className="relative z-10 w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-500/20">
          <IconComponent className="w-7 h-7 text-blue-400 group-hover:text-blue-200 transition-colors duration-300" />
        </div>

        {/* TITLE */}
        <h3 className="relative z-10 text-xl text-white mb-3 uppercase tracking-tight group-hover:text-blue-300 transition-colors duration-300">
          {title}
        </h3>

        {/* DESCRIPTION */}
        <p className="relative z-10 text-slate-400 text-sm leading-relaxed mb-8">
          {description}
        </p>

        {/* FOOTER */}
        <div className="relative z-10 flex items-center justify-between mt-auto">
          <span className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold">
            Acceder
          </span>

          <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-400/40 transition-all duration-300">
            <FaArrowRight className="text-white text-xs -rotate-45 group-hover:rotate-0 group-hover:text-blue-300 transition-all duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
