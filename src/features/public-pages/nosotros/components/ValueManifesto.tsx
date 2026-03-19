// src/features/public-pages/about/components/ValuesManifesto.tsx
import { ASESCON_VALUES } from "../constanst/value";
import { ValueCard } from "./ValueCard";
import { ValuesAsescon } from "@/src/types/nosotros/value-asescon";

export const ValuesManifesto = () => {
  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-sky-500 font-black uppercase tracking-[0.4em] text-xs mb-4 block">
              Nuestra Filosofía
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter italic">
              El Manifiesto <br />
              <span className="text-slate-700">ASESCON</span>
            </h2>
          </div>
          <p className="text-slate-500 text-sm max-w-xs font-medium border-l border-slate-800 pl-6 uppercase tracking-widest leading-relaxed">
            No somos solo contadores. Somos la unidad de inteligencia financiera
            de tu empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tipamos explícitamente el array si no viene tipado de la constante */}
          {(ASESCON_VALUES as ValuesAsescon[]).map((val) => (
            <ValueCard key={val.id} value={val} />
          ))}
        </div>
      </div>
    </section>
  );
};
