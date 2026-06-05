// Hooks
import { usePublicServicesBySlug } from "../../hooks/use-public-services";
import { useFeaturedRecommendation } from "../../hooks/use-featured-recommendation";
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
// utils
import { buildRecommendationMetrics } from "../../utils/recommendation/recommendation-metrics";

export function ServiceSlugView({service} : {service: Service}) {
    const {data: slug, isLoading} = usePublicServicesBySlug(service.slug);
    

    return (
        <main>
      <ServiceSlugHero service={service} />

      <ServicePainPoints painPoints={service.painPoints} />

      <ServiceBenefits features={service.features} />

      <ServiceEvaluation 
      impact={metrics.impact}
      effort={metrics.effort}
      risk={metrics.risk}
      />

        <ServiceProcess />

      <ServiceTrust />

      <ServiceCTA serviceTitle={service.title} />

        </main>
    )
}