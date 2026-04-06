// src/components/ui/layout/intranet/IntranetSkeleton.tsx
"use client";

import { cn } from "@/src/lib/utils";

export const IntranetSkeleton = () => {
  // Generamos 6 cards de carga para llenar el grid inicial
  const skeletonCards = Array.from({ length: 6 });

  return (
    <section className="relative py-24 bg-slate-950 min-h-screen overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skeletonCards.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-75 p-8 rounded-3xl border border-white/5 bg-white/2",
                "animate-pulse flex flex-col justify-between",
              )}
            >
              <div>
                {/* Icono Skeleton */}
                <div className="w-14 h-14 rounded-2xl bg-white/5 mb-6" />
                {/* Título Skeleton */}
                <div className="h-6 w-3/4 bg-white/5 rounded-lg mb-4" />
                {/* Descripción Skeleton */}
                <div className="space-y-2">
                  <div className="h-3 w-full bg-white/5 rounded-md" />
                  <div className="h-3 w-5/6 bg-white/5 rounded-md" />
                </div>
              </div>

              {/* Footer Skeleton */}
              <div className="flex items-center justify-between mt-auto">
                <div className="h-2 w-20 bg-blue-500/20 rounded-full" />
                <div className="w-10 h-10 rounded-full bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
