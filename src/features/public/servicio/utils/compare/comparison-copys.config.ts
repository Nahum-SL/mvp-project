export const COMPARISON_BANNERS = {
  noContext: {
    title: "Comparación general:",
    text: "Define tus objetivos en el selector para personalizar estas métricas.",
  },
  winner: {
    text: "Basado en tus objetivos, la opción resaltada es la que cuenta con el mejor balance de impacto y viabilidad para tu empresa.",
  },
  tie: {
    text: "Ambos servicios presentan una prioridad equilibrada. La decisión final puede inclinarse según tu presupuesto o la velocidad de implementación.",
  },
} as const;

export const COMPARISON_MODES = {
  winner: {
    card: "border-indigo-500 bg-linear-to-b from-indigo-50/50 to-white shadow-indigo-100/50 shadow-lg",
    badge: "bg-indigo-600",
    badgeText: "Mejor Elección",
    accent: "text-indigo-600",
    bar: "bg-indigo-500",
  },
  tie: {
    card: "border-emerald-500 bg-linear-to-b from-emerald-50/50 to-white shadow-emerald-100/50 shadow-md",
    badge: "bg-emerald-500",
    badgeText: "Prioridad Equilibrada",
    accent: "text-emerald-600",
    bar: "bg-emerald-500",
  },
  neutral: {
    card: "border-slate-100 bg-white hover:border-slate-200 shadow-sm",
    badge: "",
    badgeText: "",
    accent: "text-slate-400",
    bar: "bg-slate-400",
  },
} as const;

export type ComparisonModeKey = keyof typeof COMPARISON_MODES;
