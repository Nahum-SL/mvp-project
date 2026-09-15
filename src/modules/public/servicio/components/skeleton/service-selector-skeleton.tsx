// src/features/public/servicio/components/selector/service-selector-skeleton.tsx
export function ServiceSelectorSkeleton() {
  return (
    <div className="relative z-30 mt-16 mx-auto max-w-3xl w-full px-4 animate-pulse">
      <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] md:rounded-full p-2 shadow-2xl border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center">
        {/* SECCIÓN 1: SKELETON TIPO DE EMPRESA */}
        <div className="flex-1 px-6 py-3 md:py-2 flex flex-col justify-center">
          <div className="h-3 w-16 bg-slate-200 rounded mb-1.5" />
          <div className="h-4 w-28 bg-slate-300 rounded" />
        </div>

        {/* Separador vertical escritorio */}
        <div className="hidden md:block h-8 w-px bg-slate-200 mx-1" />
        {/* Separador horizontal móvil */}
        <div className="block md:hidden h-px w-full bg-slate-100 my-1" />

        {/* SECCIÓN 2: SKELETON NECESIDAD */}
        <div className="flex-1 px-6 py-3 md:py-2 flex flex-col justify-center">
          <div className="h-3 w-16 bg-slate-200 rounded mb-1.5" />
          <div className="h-4 w-32 bg-slate-300 rounded" />
        </div>

        {/* Separador vertical escritorio */}
        <div className="hidden md:block h-8 w-px bg-slate-200 mx-1" />
        {/* Separador horizontal móvil */}
        <div className="block md:hidden h-px w-full bg-slate-100 my-1" />

        {/* SECCIÓN 3: SKELETON SEARCH INPUT & BUTTON */}
        <div className="flex items-center justify-between pl-6 pr-2 py-2 md:py-0 md:w-64 gap-4">
          <div className="h-4 w-24 bg-slate-200 rounded" />
          {/* Círculo simulando el botón final de búsqueda */}
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-slate-300 shrink-0" />
        </div>
      </div>
    </div>
  );
}
