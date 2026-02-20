import ServiceDashboard from "@/src/components/ui/layout/servicios/ServiceDashboard";
import ServiceHeader from "@/src/components/ui/layout/ServiceHeader";

export default function ServiciosPage() {
  return (
    <main>
      <ServiceHeader
        title="Expertos en Asesoría y Consultoría Empresarial"
        subtitle="Nuestras Soluciones"
        src="/services-hero.webp" 
        alt="Equipo de asesores trabajando en oficina moderna"
      />

      <section className="bg-slate-50">
        <ServiceDashboard />
      </section>
    </main>
  );
}
