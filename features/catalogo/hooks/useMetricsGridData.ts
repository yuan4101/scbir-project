"use client";

import { useEffect, useState } from "react";
import { getCarrosByIds } from "@/lib/services/carros";
import type { Carro } from "@/types/carro";
import type { CBIRMetricsResponse } from "@/features/cbir/types/cbirTypes";

export function useMetricsGridData(metricsResult: CBIRMetricsResponse | null) {
  const [carros, setCarros] = useState<Carro[]>([]);

  useEffect(() => {
    if (!metricsResult) return;

    const load = async () => {
      const allIds = Object.values(metricsResult.metrics_breakdown)
        .flat()
        .map((c) => c.id);
      const uniqueIds = Array.from(new Set(allIds));

      const data = await getCarrosByIds(uniqueIds);
      setCarros(data);
    };

    load();
  }, [metricsResult]);

  return carros;
}
