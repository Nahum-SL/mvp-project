// src/features/public-pages/about/components/StatsSection.tsx
import { StatItem } from "./StatsItem";

// Historial de Asescon
const stats = [
  {
    id: 1,
    value: 30,
    suffix: "+",
    label: "Años",
    description: "Trayectoria en el mercado peruano",
  },
  {
    id: 2,
    value: 700,
    suffix: "+",
    label: "Clientes",
    description: "Empresas que confían en nosotros",
  },
  {
    id: 3,
    value: 90,
    suffix: "%",
    label: "Eficacia",
    description: "Casos resueltos",
  },
  {
    id: 4,
    value: 20,
    suffix: "+",
    label: "disposicion",
    description: "Areas de Produccion",
  },
];

export const StatsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Líneas de división sutiles (look de ingeniería) */}
      <div className="container mx-auto px-6">
        <div
          className="grid grid-cols-2 lg:grid-cols-4 
        divide-x divide-y lg:divide-y-0 
        divide-slate-800 border-y border-slate-800"
        >
          {stats.map((stat) => (
            <StatItem
              key={stat.id}
              value={stat.value} // El 0 es un statement potente
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
