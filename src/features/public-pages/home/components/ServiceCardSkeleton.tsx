// src/features/public-pages/home/components/ServiceCardSkeleton.tsx
export const ServiceCardSkeleton = () => {
  return (
    <div className="h-112 w-full rounded-[2.5rem] bg-slate-100 border border-slate-200 p-10 flex flex-col justify-between animate-pulse">
      {/* Skeleton para el Título */}
      <div className="space-y-3">
        <div className="h-8 bg-slate-200 rounded-xl w-3/4" />
        <div className="h-8 bg-slate-200 rounded-xl w-1/2" />
      </div>

      {/* Skeleton para Descripción y Link */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-3 bg-slate-200 rounded-full w-full" />
          <div className="h-3 bg-slate-200 rounded-full w-full" />
          <div className="h-3 bg-slate-200 rounded-full w-2/3" />
        </div>

        {/* Link placeholder */}
        <div className="flex items-center gap-2">
          <div className="h-4 bg-slate-200 rounded-md w-32" />
          <div className="h-4 bg-slate-200 rounded-md w-4" />
        </div>
      </div>
    </div>
  );
};

// Componente para la sección completa que usará Suspense
export const FeaturedServicesSkeleton = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto">
        {/* Header Placeholder */}
        <div className="px-6 mb-16 space-y-4">
          <div className="h-4 bg-slate-100 w-32 rounded-full" />
          <div className="h-12 bg-slate-100 w-64 rounded-xl" />
        </div>

        {/* Grid de 4 tarjetas */}
        <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
