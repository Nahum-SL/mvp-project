"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export default function BreadcrumbAuto() {
  const pathname = usePathname();
  const segments = pathname?.split("/").filter(Boolean) || [];

  const format = (segment: string) => {
    // Si el segmento es un ID (solo números), podrías retornar "Detalle" o dejarlo
    if (!isNaN(Number(segment))) return "Detalle";

    return segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <nav className="flex items-center gap-2 text-[15px] md:text-[17] text-slate-400 mb-2">
      <Link href="/admin" className="hover:text-sky-400 transition">
        <Home size={17} />
      </Link>

      {segments.length > 0 && <ChevronRight size={12} className="opacity-50" />}

      {segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;

        return (
          <div key={path} className="flex items-center gap-2">
            {!isLast ? (
              <Link href={path} className="hover:text-sky-400 transition">
                {format(segment)}
              </Link>
            ) : (
              <span className="text-slate-500 font-medium">
                {format(segment)}
              </span>
            )}
            {!isLast && <ChevronRight size={12} className="opacity-50" />}
          </div>
        );
      })}
    </nav>
  );
}
