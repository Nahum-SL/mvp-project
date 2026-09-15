// src/app/(public)/herramientas/cronograma-sunat/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import SunatToolPro from "@/src/modules/public-web/herramientas/sunat/SunatToolPro";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Cronograma SUNAT 2026 Perú | Consulta tus vencimientos",
  description:
    "Consulta el cronograma SUNAT según tu RUC. Evita multas y mantente al día con tus obligaciones tributarias.",
};

export default function CronogramaSunatPage() {
  return (
    <main className="bg-slate-950 text-white">
      {/* HERO */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <p className="text-xs mt-10 uppercase tracking-[0.3em] text-sky-400 mb-4">
          Herramienta gratuita
        </p>

        <h1 className="text-4xl md:text-5xl font-serif tracking-tight">
          Cronograma SUNAT 2026
        </h1>

        <p className="text-slate-400 mt-6 text-lg max-w-2xl mx-auto">
          Consulta tus fechas de vencimiento según tu RUC y evita multas
          innecesarias. Guarda tu dígito y accede en segundos.
        </p>
      </section>

      {/* TOOL */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Suspense
            fallback={
              <div className="h-85 md:h-105 rounded-[2.5rem] bg-slate-900 border border-slate-800 animate-pulse" />
            }
          >
            <SunatToolPro />
          </Suspense>
        </div>
      </section>

      {/* SEO + EDUCACIÓN */}
      <section className="py-24 px-6 max-w-4xl mx-auto space-y-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            ¿Qué es el cronograma SUNAT?
          </h2>
          <p className="text-slate-400">
            Es el calendario oficial que determina las fechas límite para
            declarar y pagar impuestos según el último dígito de tu RUC.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            ¿Por qué es importante?
          </h2>
          <ul className="text-slate-400 list-disc pl-6 space-y-2">
            <li>Evitas multas y sanciones</li>
            <li>Evitas intereses moratorios</li>
            <li>Mantienes tu empresa en regla</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-sky-500/5 border border-sky-500/20 rounded-3xl p-8 text-center">
          <h3 className="text-xl font-semibold mb-3">
            ¿Prefieres olvidarte de esto?
          </h3>

          <p className="text-slate-400 mb-6">
            Nosotros gestionamos tus declaraciones y evitamos errores costosos.
          </p>

          <Link
            href="/servicio/asesoria-contable"
            className="inline-block bg-sky-500 hover:bg-sky-400 text-black font-bold px-6 py-3 rounded-xl transition"
          >
            Delegar mi contabilidad
          </Link>
        </div>
      </section>

      <div className="h-px bg-slate-800" />
    </main>
  );
}
