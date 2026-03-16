// src/features/containers/ServiceDashboard.tsx
"use client";

// Optimizar los datos y refrescar la pagina
import { useState, useMemo, useEffect } from "react";
// Manejo con las URLs
import { useRouter, usePathname, useSearchParams } from "next/navigation";
// Componentes
import { SmartSelector } from "../components/servicios/SmartSelector";
import { ServiceGrid } from "../components/servicios/ServiceGrid";
import { ComparisonModal } from "../components/servicios/ComparisonModal";
// Hook para optimizar y evitar errores con el llamado a la API de NestJS
import { useServices } from "@/src/hooks/useServices";
// Animaciones
import { AnimatePresence } from "framer-motion";
// Types
import { ServiceFilters } from "@/src/types/servicio/servicio";
import { Service } from "@/src/types/servicio/servicio";
// Logica para calcular el Score
import { calculateServiceScore } from "@/src/lib/scoring";

export default function ServiceDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { services, isLoading } = useServices();
  const [compareIds, setCompareIds] = useState<number[]>([]);

  // Pensado para cuando copien y compartan la URL de un servicio
  // Inicializar estado desde la URL
  const [filters, setFilters] = useState<ServiceFilters>({
    businessType: searchParams.get("type") || "",
    painPoint: searchParams.get("pain") || "",
    search: searchParams.get("q") || "",
  });

  // Sincronizar filtros -> URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.businessType) params.set("type", filters.businessType);
    if (filters.painPoint) params.set("pain", filters.painPoint);
    if (filters.search) params.set("q", filters.search);

    // replace para no llenar el historial de navegación con cada letra del buscador
    // scroll: false es vital para evitar confundir a Nextjs generando un scroll hacia la parte de arriba
    // Rompiendo la UX
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [filters, pathname, router]);

  // 1. Obtener los objetos completos de los servicios a comparar
  const selectedServicesToCompare = useMemo(() => {
    return services.filter((s) => compareIds.includes(s.id));
  }, [services, compareIds]);

  // 2. Controlar la comparación
  const toggleCompare = (id: number) => {
    setCompareIds(
      (prev) =>
        prev.includes(id)
          ? prev.filter((i) => i !== id)
          : prev.length < 2
            ? [...prev, id]
            : [prev[1], id], // Reemplaza el más antiguo si ya hay 2
    );
  };

  // Filtrar los servicios
  const filteredServices = useMemo(() => {
    return services.filter((svc: Service) => {
      const matchType =
        !filters.businessType ||
        svc.businessTypes.includes(filters.businessType);
      const matchPain =
        !filters.painPoint || svc.painPoints.includes(filters.painPoint);
      const matchSearch = svc.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      return matchType && matchPain && matchSearch;
    });
  }, [services, filters]);

  // Muestra el mejor match
  const bestMatchId = useMemo(() => {
    if (!services.length) return null;

    const scored = services.map((svc) => ({
      id: svc.id,
      score: calculateServiceScore(svc, filters),
    }));

    const best = scored.sort((a, b) => b.score - a.score)[0];

    return best?.score > 0 ? best.id : null;
  }, [services, filters]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-16">
      <SmartSelector onFilterChange={setFilters} filters={filters}/>

      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-6">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
            {filters.businessType || filters.painPoint
              ? "Soluciones Recomendadas"
              : "Nuestros Servicios"}
            <span className="ml-4 px-4 rounded-4xl bg-blue-500 text-white">
              {filteredServices.length}
            </span>
          </h2>

          {/* Muestra el numero de servicios comparados */}
          {compareIds.length > 0 && (
            <div className="flex gap-2 text-xs text-blue-600 font-bold">
              {selectedServicesToCompare.map((s) => (
                <span key={s.id} className="bg-blue-50 px-2 py-1 rounded-md">
                  {s.title}
                </span>
              ))}
            </div>
          )}
        </div>

        <ServiceGrid
          services={filteredServices}
          onCompare={toggleCompare} // Pasamos la función al Grid
          compareIds={compareIds}
          highlightedIds={bestMatchId !== null ? [bestMatchId] : []} // Pasamos los IDs para resaltar el botón activo
          filters={filters}
        />
      </div>

      {/* 3. Renderizado del Modal con Animación */}
      <AnimatePresence>
        {compareIds.length === 2 && (
          <ComparisonModal
            services={selectedServicesToCompare}
            onClose={() => setCompareIds([])}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
