import IntranetHeader from "@/src/components/ui/layout/IntranetHeader";
import IntranetDashboard from "@/src/components/ui/layout/intranet/IntranetDashboard";

export default function IntranetPage() {
  return (
    <main className="bg-slate-950">
      <IntranetHeader
        title="Intranet"
        subtitle="Portal seguro de gestión empresarial ASESCON"
        src="/fondo-intranet.webp"
        alt="Fondo Intranet"
      />

      {/* El Dashboard continúa el fondo oscuro del Header */}
      <IntranetDashboard />
    </main>
  );
}
