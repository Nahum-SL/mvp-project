// src/features/admin/components/BreadcrumbAuto.tsx
"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useBreadcrumbs } from "../hooks/use-breadcrumb";

export default function BreadcrumbAuto() {
  const { breadcrumbs, hasItems } = useBreadcrumbs();

  return (
    // "h-6 flex items-center" congela el espacio en el esqueleto del servidor
    // impidiendo que el SectionHeader salte al cargarse el JS.
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-[13px] font-semibold text-slate-400 h-6 select-none"
    >
      <Link
        href="/admin"
        className="hover:text-indigo-600 text-slate-400 transition-colors flex items-center gap-1"
      >
        <Home size={15} />
      </Link>

      {hasItems && (
        <ChevronRight size={12} className="text-slate-300 shrink-0" />
      )}

      <ol className="flex items-center gap-2 p-0 m-0 list-none">
        {breadcrumbs.map((item) => (
          <li key={item.path} className="flex items-center gap-2">
            {!item.isLast ? (
              <Link
                href={item.path}
                className="hover:text-indigo-600 text-slate-400 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className="text-slate-600 font-bold tracking-tight"
              >
                {item.label}
              </span>
            )}

            {!item.isLast && (
              <ChevronRight size={12} className="text-slate-300 shrink-0" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
