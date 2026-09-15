import type { ScoredService } from "@/src/types/servicio/scoring.types";

export interface ComparisonRow {
  name: string;
  results: boolean[];
}

export function buildComparisonRows(
  services: ScoredService[],
): ComparisonRow[] {
  const featureNames = Array.from(
    new Set(
      services.flatMap((service) =>
        (service.features ?? []).map((feature) => feature.name),
      ),
    ),
  );

  return featureNames.map((name) => ({
    name,
    results: services.map((service) =>
      service.features.some((feature) => feature.name === name),
    ),
  }));
}
