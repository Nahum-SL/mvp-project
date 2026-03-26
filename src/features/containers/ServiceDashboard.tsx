// src/features/containers/ServiceDashboard.tsx
"use client";

// Optimizar los datos y refrescar la pagina
import {
  useState,
  useMemo,
  useEffect,
  useDeferredValue,
  useTransition,
} from "react";
// Manejo con las URLs
import { useRouter, usePathname, useSearchParams } from "next/navigation";
// Componentes
// import { SmartSelector } from "../components/servicios/SmartSelector";
import { SmartSelector } from "../components/servicios/selector/SmartSelector";
import { ServiceGrid } from "../components/servicios/ServiceGrid";
// Comparador de servicios por features
import { ComparisonModal } from "../components/servicios/ComparisonModal";
// Hook para optimizar y evitar errores con el llamado a la API de NestJS
import { useServices } from "@/src/hooks/useServices";
// Animaciones
import { AnimatePresence } from "framer-motion";
// Types
import { ServiceFilters } from "@/src/types/servicio/servicio";
// Logica para calcular el Score
import { calculateServiceScore } from "@/src/utils/scoring";
// Types
import { BusinessTypeID, PainPointID } from "@/src/types/servicio/constants";

import { useDebounce } from "use-debounce";

export default function ServiceDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { services, isLoading } = useServices();
  const [compareIds, setCompareIds] = useState<number[]>([]);

  const [isPending, startTransition] = useTransition();

  // Pensado para cuando copien y compartan la URL de un servicio
  // Inicializar estado desde la URL
  const [filters, setFilters] = useState<ServiceFilters>({
    businessType: (searchParams.get("type") as BusinessTypeID) || "",
    painPoint: (searchParams.get("pain") as PainPointID) || "",
    search: searchParams.get("q") || "",
  });

  // Este debounce es clave
  const [debouncedFilters] = useDebounce(filters, 300);

  // Sincronizar filtros -> URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedFilters.businessType)
      params.set("type", debouncedFilters.businessType);

    if (debouncedFilters.painPoint)
      params.set("pain", debouncedFilters.painPoint);

    if (debouncedFilters.search) params.set("q", debouncedFilters.search);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }, [debouncedFilters, pathname, router]);

  
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

  // 1. Obtener los objetos completos de los servicios a comparar
  const selectedServicesToCompare = useMemo(() => {
    return services.filter((s) => compareIds.includes(s.id));
  }, [services, compareIds]);

  // Mejora la latencia de los botones de ComparisonModal
  const deferredCompareServices = useDeferredValue(selectedServicesToCompare);

  // USAMOS 'debouncedFilters' para que el cálculo no bloquee el input
  const scoredServices = useMemo(() => {
    return services.map((svc) => ({
      ...svc,
      relevanceScore: calculateServiceScore(svc, debouncedFilters),
    }));
  }, [services, debouncedFilters]); // <--- Antes era 'filters'

  // Filtrar y Ordenar los servicios por relevancia1111
  const filteredServices = useMemo(() => {
    const searchVal = debouncedFilters.search.toLowerCase();

    const searched = scoredServices.filter(
      (svc) =>
        svc.title.toLowerCase().includes(searchVal) ||
        svc.description.toLowerCase().includes(searchVal),
    );

    if (!debouncedFilters.businessType && !debouncedFilters.painPoint) {
      return [...searched].sort((a, b) => (a.order || 0) - (b.order || 0));
    }

    return searched
      .filter((svc) => svc.relevanceScore > 0 || !debouncedFilters.businessType)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
  }, [scoredServices, debouncedFilters]); // <--- Antes era 'filters'

  const isProcessing = filters !== debouncedFilters;

  // Muestra el mejor match
  const bestMatchId = useMemo(() => {
    if (!scoredServices.length) return null;

    const best = [...scoredServices].sort(
      (a, b) => b.relevanceScore - a.relevanceScore,
    )[0];

    return best?.relevanceScore > 0 ? best.id : null;
  }, [scoredServices]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-16">
      <SmartSelector
        onFilterChange={setFilters}
        filters={filters}
        isPending={isProcessing || isLoading}
      />

      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-6">
          <h2 className="text-2xl font-extrabold text-slate-900 uppercase tracking-tighter">
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

        {/* Si isLoading es true (primera carga), podemos mostrar un Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-3 gap-6">Cargando servicios...</div>
        ) : (
          <ServiceGrid
            services={filteredServices}
            onCompare={toggleCompare} // Pasamos la función al Grid
            compareIds={compareIds}
            highlightedIds={bestMatchId !== null ? [bestMatchId] : []} // Pasamos los IDs para resaltar el botón activo
            filters={filters}
          />
        )}
      </div>

      {/* 3. Renderizado del Modal con Animación */}
      <AnimatePresence>
        {compareIds.length === 2 && (
          <ComparisonModal
            services={deferredCompareServices}
            onClose={() => setCompareIds([])}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
