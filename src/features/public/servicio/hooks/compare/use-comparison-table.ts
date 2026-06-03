import { useMemo } from "react";

import type { ScoredService } from "@/src/types/servicio/scoring.types";

import { buildComparisonRows } from "../../utils/compare/comparison-table.helpers";

export function useComparisonTable(services: ScoredService[]) {
  // La tabla puede crecer bastante en features.
  // Memo evita reconstruir filas en cada render del modal.
  const rows = useMemo(() => buildComparisonRows(services), [services]);

  return {
    rows,
  };
}
