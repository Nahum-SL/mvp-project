import ServiceDashboard from "@/src/components/ui/layout/servicios/ServiceDashboard";
import ServiceHeader from "@/src/components/ui/layout/ServiceHeader";
import ServiceDashboardSkeleton from "@/src/components/skeletons/ServiceDashboardSkeleton";
import { Suspense } from "react";

export default function ServiciosPage() {
  return (
    <main>
      <ServiceHeader
        title="Expertos en Asesoría y Consultoría Empresarial"
        subtitle="Nuestras Soluciones"
        src="/servicios-hero.webp"
        alt="Equipo de asesores trabajando en oficina moderna"
      />
      <Suspense fallback={<ServiceDashboardSkeleton />}>
        <section className="bg-slate-50">
          <ServiceDashboard />
        </section>
      </Suspense>
    </main>
  );
}
