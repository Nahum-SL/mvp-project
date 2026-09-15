import type { ScoredService } from "@/src/types/servicio/scoring.types";

export function sortServicesByRelevance(
  services: ScoredService[],
  highlightedIds: number[],
) {
    
  return [...services].sort((a, b) => {
    // prioridad: resaltados primero
    const aHighlighted = highlightedIds.includes(a.id) ? 1 : 0;
    const bHighlighted = highlightedIds.includes(b.id) ? 1 : 0;
    if (aHighlighted !== bHighlighted) {
      return bHighlighted - aHighlighted;
    }
    // luego por score
    return b.relevanceScore - a.relevanceScore;
  });
}
