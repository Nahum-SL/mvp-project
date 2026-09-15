// src/features/public/servicio/components/servicio-detail/service-content.tsx

import type { Service } from "@/src/types/servicio/servicio-types";

import { ServiceDescription } from "./service-description";
import { ServiceFeatures } from "./service-features";

interface ServiceContentProps {
  service: Service;
}

export function ServiceContent({ service }: ServiceContentProps) {
  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl shadow-slate-200/50 border border-slate-100">
      <ServiceDescription description={service.description} />

      <ServiceFeatures features={service.features} />
    </div>
  );
}
