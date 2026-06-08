// src/features/public/servicio/components/recommendation/featured-recommendation-skeleton.tsx
export function FeaturedRecommendationSkeleton() {
  return (
    <div className="relative max-w-6xl mx-auto mt-5 px-6 mb-16 animate-pulse">
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="relative flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-10 p-6 md:p-10">
          {/* CONTENIDO (Lado Izquierdo) */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-4 h-4 rounded-full bg-slate-200" />
              <div className="h-3 w-36 bg-slate-200 rounded" />
            </div>

            {/* Fila de Scores */}
            <div className="flex gap-6 mb-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3 w-12 bg-slate-100 rounded" />
                  <div className="h-4 w-8 bg-slate-200 rounded" />
                </div>
              ))}
            </div>

            {/* Títulos */}
            <div className="h-8 w-4/5 bg-slate-300 rounded mb-4" />

            <div className="border-l-4 border-slate-200 pl-4 mb-6">
              <div className="h-6 w-1/2 bg-slate-200 rounded" />
            </div>

            {/* Grupo de Donut Charts (Simulamos los 3 círculos) */}
            <div className="flex items-center gap-4 mb-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full border-4 border-slate-200 flex items-center justify-center" />
                  <div className="h-2 w-10 bg-slate-100 rounded" />
                </div>
              ))}
            </div>

            {/* Descripción / Párrafos */}
            <div className="space-y-2 mb-6">
              <div className="h-4 w-full bg-slate-200 rounded" />
              <div className="h-4 w-11/12 bg-slate-200 rounded" />
              <div className="h-4 w-4/5 bg-slate-200 rounded" />
            </div>

            {/* Listado de Razones */}
            <div className="space-y-3 mb-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-300 shrink-0" />
                  <div className="h-3 w-3/4 bg-slate-100 rounded" />
                </div>
              ))}
            </div>

            {/* Barra de Progreso de Confianza */}
            <div className="mb-2">
              <div className="flex justify-between mb-1.5">
                <div className="h-2 w-24 bg-slate-100 rounded" />
                <div className="h-2 w-8 bg-slate-100 rounded" />
              </div>
              <div className="h-1 w-full bg-slate-200 rounded-full" />
            </div>
          </div>

          {/* ASIDE (Lado Derecho) */}
          <div className="flex flex-col gap-6 justify-between h-full">
            {/* Imagen del Servicio */}
            <div className="hidden md:block relative w-full h-64 md:h-72 rounded-2xl bg-slate-100 border border-slate-200" />

            {/* Alternativas Evaluadas */}
            <div>
              <div className="h-2 w-32 bg-slate-200 rounded mb-3" />
              <div className="flex gap-2">
                <div className="px-10 py-3.5 rounded-full bg-slate-100 border border-slate-200" />
                <div className="px-12 py-3.5 rounded-full bg-slate-100 border border-slate-200" />
                <div className="px-8 py-3.5 rounded-full bg-slate-100 border border-slate-200" />
              </div>
            </div>

            {/* Botón CTA */}
            <div className="w-full h-11 bg-slate-300 rounded-xl" />
          </div>
        </div>

        {/* Línea decorativa inferior */}
        <div className="h-0.5 w-full bg-slate-200" />
      </div>
    </div>
  );
}
