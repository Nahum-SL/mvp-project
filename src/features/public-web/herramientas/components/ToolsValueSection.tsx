"use client";
import Link from "next/link";

export default function ToolsValueSection() {
  return (
    <>
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-6">
          Diseñadas para decisiones reales
        </h2>

        <p className="text-slate-400 leading-relaxed">
          Nuestras herramientas están construidas específicamente para el
          contexto peruano, considerando normativa vigente, cálculos reales y
          escenarios prácticos que afectan a empresas y trabajadores.
        </p>
      </section>

      <section className="pb-28 px-6">
        <div className="max-w-4xl mx-auto bg-indigo-500/5 border border-indigo-500/20 rounded-3xl p-10 text-center">
          <h3 className="text-xl font-semibold mb-4">
            ¿Prefieres dejar esto en manos expertas?
          </h3>

          <p className="text-slate-400 mb-6">
            Evita errores, multas y pérdida de dinero con asesoría profesional.
          </p>

          <Link
            href="/servicio/asesoria-contable"
            className="inline-block bg-indigo-500 hover:bg-indigo-400 text-black font-bold px-6 py-3 rounded-xl transition"
          >
            Ver asesoría contable 
          </Link>
        </div>
      </section>
    </>
  );
}
