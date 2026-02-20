import { servicesData } from "@/src/types/servicios";
import { notFound } from "next/navigation";
import SlugHeader from "@/src/components/ui/layout/SlugHeader";
import Link from "next/link";

export default async function ServicioDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  // Recurre a la pagina not-found.tsx
  // si el servicio no se encuentra
  if (!service) notFound();

  // Lógica para navegar entre los servicios ( <-- y -->)
  const currentIndex = servicesData.findIndex((s) => s.id === service.id);
  const nextService = servicesData[(currentIndex + 1) % servicesData.length];
  const prevService =
    servicesData[
      (currentIndex - 1 + servicesData.length) % servicesData.length
    ];

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <SlugHeader
        src={service.src}
        alt={service.title}
        category={service.category}
        title={service.title}
      />

      <section className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-8 md:p-16 shadow-xl border border-slate-100">
          {/* Texto Principal */}
          <div className="prose prose-slate lg:prose-xl max-w-none">
            <p className="text-xl text-slate-700 leading-relaxed font-medium mb-12 border-l-4 border-blue-600 pl-6">
              {service.text}
            </p>
          </div>
          {/* Sección de Pasos / Procesos */}
          {service.steps.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-blue-950 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                  ✓
                </span>
                Nuestro proceso de trabajo
              </h2>

              <div className="grid gap-6 md:grid-cols-1">
                {service.steps.map((step) => (
                  <div
                    key={step.id}
                    className="flex gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors"
                  >
                    <span className="text-4xl font-black text-blue-950 tabular-nums">
                      {step.id.toString().padStart(2, "0")}
                    </span>
                    <p className="text-slate-700 text-lg leading-snug pt-1">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navegación Intuitiva entre Servicios */}
          <div className="mt-20">
            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              {/* Botón Anterior */}
              <Link
                href={`/servicios/${prevService.slug}`}
                className="flex-1 group p-6 rounded-2xl border border-slate-200 hover:border-blue-600 transition-all bg-white"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl group-hover:-translate-x-2 transition-transform text-slate-300 group-hover:text-blue-600">
                    ←
                  </span>
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Anterior
                    </p>
                    <h4 className="text-slate-900 font-bold group-hover:text-blue-600 transition-colors">
                      {prevService.title}
                    </h4>
                  </div>
                </div>
              </Link>

              {/* Botón Siguiente (Destacado en Oscuro) */}
              <Link
                href={`/servicios/${nextService.slug}`}
                className="flex-1 group p-6 rounded-2xl bg-blue-800 border border-slate-100 hover:bg-blue-600 hover:border-blue-600 transition-all shadow-xl shadow-slate-900/10"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                      Siguiente
                    </p>
                    <h4 className="text-white font-bold">
                      {nextService.title}
                    </h4>
                  </div>
                  <span className="text-2xl group-hover:translate-x-2 transition-transform text-white">
                    →
                  </span>
                </div>
              </Link>
            </div>

            {/* Enlace de regreso al centro */}
            <div className="mt-8 text-center">
              <Link
                href="/servicios"
                className="text-xs font-bold text-slate-400 hover:text-blue-600 uppercase tracking-[0.3em] transition-colors"
              >
                ••• Ver Catálogo Completo •••
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
