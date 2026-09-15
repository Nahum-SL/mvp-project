// src/features/admin/utils/breadcrumb-map.ts

export const BREADCRUMB_MAP: Record<string, string> = {
  admin: "Inicio",
  stats: "Métricas",
  posts: "Artículos del Blog",
  "intranet-links": "Enlaces Utilitarios",
  "ruc-tracker": "Tracker RUC",
} as const;

export function formatBreadcrumbSegment(segment: string): string {
  if (!segment) return "";

  // Si es un ID numérico (ej. /posts/123)
  if (!isNaN(Number(segment))) return "Detalle";

  // Buscar en el diccionario o formatear como fallback seguro
  return (
    BREADCRUMB_MAP[segment.toLowerCase()] ??
    segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  );
}
