// src/features/public-pages/home/components/FeaturedServices.tsx
import { ServiceCardHome } from "./ServiceCardHome.";
import { FEATURED_HOME } from "../constants/features-home";
import { SectionHeaderHome } from "@/src/components/ui/layout/contacto/SectionHeaderHome";
import { ServiceCardSkeleton } from "./ServiceCardSkeleton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  isLoading?: boolean;
}

export const FeaturedServices = ({ isLoading = false }: Props) => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Línea divisoria superior sutil */}
      <div
        className="absolute top-0 left-0 w-full h-px bg-linear-to-r 
      from-transparent via-slate-200 to-transparent"
      />

      <div className="container mx-auto">
        {/* Header con color Azul para transmitir autoridad en servicios */}
        <SectionHeaderHome
          title="Soluciones Estratégicas"
          description="Transformamos la complejidad administrativa en tranquilidad operativa para su empresa."
          lineColor="yellow"
          mode="light"
        />

        <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading
            ? // Renderizamos 4 esqueletos mientras carga
              Array.from({ length: 4 }).map((_, i) => (
                <ServiceCardSkeleton key={`skeleton-${i}`} />
              ))
            : // Renderizamos los servicios reales
              FEATURED_HOME.map((servicio, index) => (
                <ServiceCardHome
                  key={servicio.slug}
                  service={servicio}
                  index={index}
                />
              ))}
        </div>
      </div>
      <div className="mt-14 flex justify-center">
        <Link
          href="/servicio"
          className="group inline-flex items-center gap-2 text-sm md:text-base 
                  font-medium text-amber-400 hover:text-amber-500 transition-colors"
        >
          Ver todos los Servicios
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
};
