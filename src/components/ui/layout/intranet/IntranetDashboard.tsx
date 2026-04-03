"use client";

// Componentes internos
import { IntranetNavHint } from "./IntranetNavHint";
import { IntranetCardLink } from "./IntranetCardLink";

interface IntranetLink {
  id: number;
  title: string;
  description: string;
  url: string;
  icon: string | null;
}

interface Props {
  initialLinks: IntranetLink[];
}

export default function IntranetDashboard({ initialLinks }: Props) {
  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Luces decorativas de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/10 blur-[150px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        {/* El hint / subtitulo */}
        <IntranetNavHint />

        {/* Cards de acceso a plataformas internas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialLinks.map((item, index) => (
            <IntranetCardLink
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              url={item.url}
              icon={item.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
