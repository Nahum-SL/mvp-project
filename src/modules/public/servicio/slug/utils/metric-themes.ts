import { iconServiceMap } from "@/src/lib/icons";

export const METRIC_THEMES = {
  impact: {
    label: "Impacto",
    icon: iconServiceMap.ChessKnight,
    color: "text-emerald-600",
    glow: "bg-linear-to-br from-emerald-500/20 to-transparent", // Un poco más de opacidad para que se note el hover
    border: "group-hover:border-emerald-200",
  },
  effort: {
    label: "Esfuerzo",
    icon: iconServiceMap.HardHat,
    color: "text-blue-500",
    glow: "bg-linear-to-br from-blue-500/20 to-transparent",
    border: "group-hover:border-blue-200",
  },
  risk: {
    label: "Riesgo",
    icon: iconServiceMap.TriangleAlert,
    color: "text-red-500",
    glow: "bg-linear-to-br from-red-500/20 to-transparent",
    border: "group-hover:border-red-200",
  },
};
