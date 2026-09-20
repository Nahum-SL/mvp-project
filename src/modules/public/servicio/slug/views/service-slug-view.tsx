// Subcomponentes
import ServiceSlugHero from "../components/service-slug-hero";
import ServicePainPoints from "../components/service-pain-points";
import ServiceBenefits from "../components/service-benefits";
import ServiceEvaluation from "../components/service-evaluation";
import ServiceProcess from "../components/service-process";
import ServiceTrust from "../components/service-trust";
import ServiceCTA from "../components/service-cta";
// Types
import type { Service } from "@/src/types/servicio/servicio-types";
// Utils

export function ServiceSlugView({ service}: { service: Service }) {

  return (
    <main>
      <ServiceSlugHero service={service} />

      <ServicePainPoints painPoints={service.painPoints} />

      <ServiceBenefits features={service.features} />

      <ServiceProcess />

      <ServiceTrust />

      <ServiceCTA serviceTitle={service.title} />
    </main>
  );
}
