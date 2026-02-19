import { servicesData } from "@/src/types/servicios";
import { notFound } from "next/navigation";
import SlugHeader from "@/src/components/ui/layout/SlugHeader";

export default async function ServicioDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) notFound();

  return (
    <main className="min-h-screen bg-slate-50 pb-20">

      <SlugHeader src={service.src} alt={service.title} category={service.category} title={service.title}/>

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
        </div>
      </section>
    </main>
  );
}
