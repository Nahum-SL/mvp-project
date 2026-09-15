import type { ScoredService } from "@/src/types/servicio/scoring.types";

// Obtiene el nivel de resaltado para un servicio dado su ID y una lista de IDs resaltados
export function getHighlightLevel(serviceId: number, highlightedIds: number[]) {
  return highlightedIds.includes(serviceId) ? "high" : "none";
}

// Obtiene una copia exacta del servicio con mejor score ubicado en la posicion 0
export function getHighlightedServices(services: ScoredService[], limit = 3) {
  return [...services]
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit)
    .map((s) => s.id);
}
