/* ---------------- INSIGHTS DINÁMICOS ---------------- */

export function getImpactInsight(value: number) {
  if (value >= 80)
    return "Alta transformación con impacto inmediato en tu negocio.";
  if (value >= 50) return "Mejora relevante con resultados progresivos.";
  return "Optimización puntual sin cambios radicales.";
}

export function getEffortInsight(value: number) {
  if (value >= 80) return "Requiere dedicación alta y cambios importantes.";
  if (value >= 50) return "Nivel de esfuerzo moderado con cierta gestión.";
  return "Implementación simple, nosotros hacemos la mayor parte.";
}

export function getRiskInsight(value: number) {
  if (value >= 80) return "Requiere ejecución experta para evitar riesgos.";
  if (value >= 50)
    return "Nivel de riesgo controlado con seguimiento adecuado.";
  return "Proceso seguro, probado y con mínima incertidumbre.";
}
