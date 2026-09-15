// src/app/(public)/herramientas/calculadora-gratificacion/page.tsx
import { Metadata } from "next";
import GratificationPro from "@/src/modules/public-web/herramientas/gratificacion/GratificationPro";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calculadora de Gratificación Perú 2026 | Gratis y Precisa",
  description:
    "Calcula tu gratificación en Perú 2026 en segundos. Incluye bonificación del 9% y resultados actualizados según normativa.",
};

export default function GratificacionPage() {
  return (
    <main className="bg-slate-950 text-white">
      {/* HERO SEO */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <p className="text-xs uppercase mt-10 tracking-[0.3em] text-emerald-400 mb-4">
          Herramienta gratuita
        </p>

        <h1 className="text-4xl md:text-5xl font-serif tracking-tight leading-tight">
          Calculadora de Gratificación en el Perú 2026
        </h1>

        <p className="text-slate-400 mt-6 text-lg max-w-2xl mx-auto">
          Calcula tu gratificación en segundos con bonificación incluida según
          normativa vigente. Ideal para trabajadores en planilla.
        </p>
      </section>

      {/* TOOL (CORE CONVERSIÓN) */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <GratificationPro />
        </div>
      </section>

      {/* CONTENIDO SEO */}
      <section className="py-24 px-6 max-w-4xl mx-auto space-y-16">
        {/* Qué es */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            ¿Qué es la gratificación?
          </h2>
          <p className="text-slate-400 leading-relaxed">
            La gratificación es un beneficio laboral obligatorio en Perú que se
            paga dos veces al año (julio y diciembre). Incluye una bonificación
            extraordinaria del 9% correspondiente a EsSalud.
          </p>
        </div>

        {/* Cómo se calcula */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            ¿Cómo se calcula la gratificación?
          </h2>

          <p className="text-slate-400 leading-relaxed mb-4">
            El cálculo depende de tu sueldo mensual y el tiempo trabajado en el
            semestre:
          </p>

          <ul className="text-slate-400 space-y-2 list-disc pl-6">
            <li>Se toma tu sueldo mensual</li>
            <li>Se divide entre 6 meses</li>
            <li>Se multiplica por los meses trabajados</li>
            <li>Se añade el 9% de bonificación</li>
          </ul>
        </div>

        {/* Ejemplo */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Ejemplo práctico</h2>

          <p className="text-slate-400 leading-relaxed">
            Si ganas S/ 3000 y trabajaste los 6 meses completos:
          </p>

          <div className="mt-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-300">
            <p>Base: S/ 3000</p>
            <p>Bonificación (9%): S/ 270</p>
            <p className="font-bold text-white mt-2">Total: S/ 3270</p>
          </div>
        </div>

        {/* CTA SERVICIO */}
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-8 text-center">
          <h3 className="text-xl font-semibold mb-3">
            ¿Quieres optimizar tus impuestos?
          </h3>

          <p className="text-slate-400 mb-6">
            Muchos trabajadores pagan más de lo necesario por falta de
            planificación tributaria.
          </p>

          <Link
            href="/servicio/planeamiento-tributario"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-xl transition"
          >
            Reducir impuestos ahora 
          </Link>
        </div>

        {/* FAQ SEO */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Preguntas frecuentes</h2>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold">¿Quiénes reciben gratificación?</h4>
              <p className="text-slate-400 text-sm">
                Trabajadores en planilla del sector privado bajo régimen laboral
                general.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">
                ¿Qué pasa si trabajé menos de 6 meses?
              </h4>
              <p className="text-slate-400 text-sm">
                Recibes una gratificación proporcional al tiempo trabajado.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">
                ¿La gratificación paga impuestos?
              </h4>
              <p className="text-slate-400 text-sm">
                Sí, puede estar afecta al impuesto a la renta de quinta
                categoría dependiendo de tu ingreso anual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEPARADOR */}
      <div className="h-px bg-slate-800" />
    </main>
  );
}
