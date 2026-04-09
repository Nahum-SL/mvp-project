import { useState, useMemo } from "react";
import { ScoredService } from "@/src/types/servicio/scoring.types";

type UseComparisonProps = {
  services: ScoredService[];
};

export function useComparison({ services }: UseComparisonProps) {
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleCompare = (id: number) => {
    setCompareIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((i) => i !== id)
        : prev.length < 2
          ? [...prev, id]
          : [prev[1], id];

      if (next.length === 2) setIsModalOpen(true);

      return next;
    });
  };

  const resetCompare = () => {
    setCompareIds([]);
    setIsModalOpen(false);
  };

  const selectedServices = useMemo(
    () => services.filter((s) => compareIds.includes(s.id)),
    [services, compareIds],
  );

  return {
    compareIds,
    toggleCompare,
    selectedServices,
    isModalOpen,
    setIsModalOpen,
    resetCompare,
  };
}
