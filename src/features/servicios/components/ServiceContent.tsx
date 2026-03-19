'use client';

import { Service } from "@/src/types/servicio/servicio";
import { CheckCircle2 } from "lucide-react";

export default function ServiceContent({ service }: { service: Service }) {
  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl shadow-slate-200/50 border border-slate-100">
      {/* Descripción Principal */}
      <div className="prose prose-slate prose-lg max-w-none mb-16">
        <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight uppercase">
          Sobre el Servicio
        </h2>        
        <div
          className="text-slate-600 leading-relaxed font-medium"
          dangerouslySetInnerHTML={{ __html: service.description }}
        />
        
      </div>

      {/* Grid de Beneficios / Features */}
      <div className="border-t border-slate-100 pt-16">
        <h3 className="text-xl font-black text-slate-900 mb-10 uppercase tracking-tighter">
          ¿Qué incluye nuestra solución?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.features.map((feature) => (
            <div
              key={feature.id}
              className="flex gap-4 p-6 rounded-3xl 
              bg-slate-50 border border-slate-100 group 
              hover:border-green-500/60 transition-colors"
            >
              <CheckCircle2 className="text-green-500 shrink-0" size={24} />
              <div>
                <p className="font-black text-slate-900 uppercase text-xs tracking-wide">
                  {feature.name}
                </p>
                <p className="text-xs text-slate-500 mt-1 font-bold">
                  Implementación inmediata y gestión estratégica.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
