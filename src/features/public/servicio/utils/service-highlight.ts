// Obtiene el nivel de resaltado para un servicio dado su ID y una lista de IDs resaltados

export function getHighlightLevel(serviceId: number, highlightedIds: number[]) {
  return highlightedIds.includes(serviceId) ? "high" : "none";
}
