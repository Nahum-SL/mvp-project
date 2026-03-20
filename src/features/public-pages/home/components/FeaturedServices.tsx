// src/features/public-pages/home/components/FeaturedServices.tsx
import { ServiceCardHome } from "./ServiceCardHome.";
import { FEATURED_HOME } from "../constants/features-home";
import { SectionHeaderHome } from "@/src/components/ui/layout/contacto/SectionHeaderHome";

export const FeaturedServices = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Línea divisoria superior sutil */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

      <div className="container mx-auto">
        {/* Header con color Azul para transmitir autoridad en servicios */}
        <SectionHeaderHome
          title="Soluciones Estratégicas"
          description="Transformamos la complejidad administrativa en tranquilidad operativa para su empresa."
          lineColor="blue"
        />

        <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_HOME.map((servicio, index) => (
            <ServiceCardHome
              key={servicio.slug}
              service={servicio}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
