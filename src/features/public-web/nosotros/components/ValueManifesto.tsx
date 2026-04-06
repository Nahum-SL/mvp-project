// src/features/public-pages/about/components/ValuesManifesto.tsx
import { ASESCON_VALUES } from "../constants";
import { ValueCard } from "./ValueCard";
// Types
import { ValuesAsescon } from "../types";

export const ValuesManifesto = () => {
  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        {/* Ajuste de Responsive: items-start en móvil, items-end en desktop */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          
          <div className="max-w-2xl">
            <span className="text-sky-500 font-extrabold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 block">
              Nuestra Filosofía
            </span>
            <h2 className="text-5xl md:text-6xl font-medium text-white 
            leading-[0.9] tracking-tighter">
              El Manifiesto <br />
              ASESCON
            </h2>
          </div>

          {/* Ajuste de Párrafo: Borde dinámico y alineación */}
          <p className="text-slate-500 text-xs md:text-sm max-w-xs font-medium 
            border-l-2 md:border-l border-sky-900 md:border-slate-800 
            pl-6 uppercase tracking-widest leading-relaxed
            mt-4 md:mt-0 transition-colors group-hover:text-slate-400">
            No somos solo contadores. Somos la unidad de inteligencia financiera 
            de tu empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(ASESCON_VALUES as ValuesAsescon[]).map((val) => (
            <ValueCard key={val.id} value={val} />
          ))}
        </div>
      </div>
    </section>
  );
};