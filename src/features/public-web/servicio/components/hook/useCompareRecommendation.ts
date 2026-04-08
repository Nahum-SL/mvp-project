import { useEffect, useState } from "react";
import { compareServices } from "../compare/compare.action";
import { ScoredService } from "@/src/types/servicio/scoring.types";
import { RecommendationParams } from "@/src/types/servicio/recommendation";

interface Props {
  ids: number[];
  filters: RecommendationParams;
  enabled?: boolean;
}

export function useCompareRecommendation({
  ids,
  filters,
  enabled = true,
}: Props) {
  const [data, setData] = useState<ScoredService[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled || ids.length < 2) return;

    const fetchCompare = async () => {
      setLoading(true);
      try {
        const res = await compareServices(ids, filters);
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompare();
  }, [ids, filters, enabled]);

  return {
    data,
    loading,
  };
}
