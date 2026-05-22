import { Service } from "@/src/types/servicio/servicio-types";

// Para que sean igual a las medidas del backend en NestJS
// Por ahora se mantiene asi para un avanze rapido
export function getServiceMetrics(service: Service) {
  return {
    impact: 80,
    effort: 40,
    risk: 30,
  };
}
