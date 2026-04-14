// src/features/public-pages/home/components/FeaturedServices.tsx
import { ServiceCardHome } from "./ServiceCardHome.";
import { FEATURED_HOME } from "../constants/features-home";
import { SectionHeaderHome } from "@/src/components/ui/layout/contacto/SectionHeaderHome";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const FeaturedServices = () => {
  return (
    <section className="py-28 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* HEADER EDITORIAL */}
        <SectionHeaderHome
          title="Soluciones a Problemas Reales"
          description="No vendemos servicios. Resolvemos puntos críticos que frenan el crecimiento de su empresa."
          lineColor="blue"
        />

        {/* GRID NUEVO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {FEATURED_HOME.map((service, index) => (
            <ServiceCardHome
              key={service.slug}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 flex justify-center">
          <Link
            href="/servicio?from=featured_services"
            className="group inline-flex items-center gap-3 px-6 py-3 
            rounded-full bg-slate-900 text-white text-sm font-semibold
            hover:bg-slate-800 transition-all"
          >
            Ver todos los servicios
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
