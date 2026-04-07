import { Service } from "@/src/types/servicio/servicio";

export function getServiceMetrics(service: Service) {
  return {
    impact: 80,
    effort: 40,
    risk: 30,
  };
}
