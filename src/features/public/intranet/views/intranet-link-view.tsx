"use client";
import { IntranetLinks } from "@/src/types/intranet/intranet-types";
// Components
import IntranetDashboard from "../components/intranet-dashboard";
import IntranetHero from "../components/intranet-hero";

interface IntranetLinkViewProps {
  initialLinks: IntranetLinks[];
}

export default function IntranetLinkView({ initialLinks }: IntranetLinkViewProps) {

  return (
    <div>
      <IntranetHero
        title="Portal Asescon"
        subtitle="Acceso a servicios digitales y sistemas de gestión"
      />
      <IntranetDashboard initialLinks={initialLinks} />
    </div>
  );
}
