// src/features/public/servicio/utils/compare/comparison-metrics.config.ts

export const COMPARISON_METRICS = [
  { id: "impact", label: "Impacto" },
  { id: "effort", label: "Esfuerzo" },
  { id: "risk", label: "Riesgo" },
] as const;

export type MetricId = (typeof COMPARISON_METRICS)[number]["id"];
