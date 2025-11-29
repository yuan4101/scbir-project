import { useState } from "react";
import type {
  CBIRSearchParams,
  CBIRSearchResult,
  CBIRVersion,
  CBIRMetricsResponse,
} from "../types/cbirTypes";
import { cbirService } from "../services/cbirService";

export function useCBIRSearch() {
  const [result, setResult] = useState<CBIRSearchResult | null>(null);
  const [metricsResult, setMetricsResult] =
    useState<CBIRMetricsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [lastSearchVersion, setLastSearchVersion] =
    useState<CBIRVersion | null>(null);

  async function search(
    params: CBIRSearchParams & { analyzeAllMetrics?: boolean }
  ): Promise<CBIRSearchResult | null> {
    setLoading(true);
    setError(null);
    setMetricsResult(null);

    const { analyzeAllMetrics = false, ...baseParams } = params;

    try {
      if (baseParams.version === "v3" && analyzeAllMetrics) {
        // ✅ V3 + todas las métricas
        const metrics = await cbirService.searchWithMetrics({
          file: baseParams.file,
          threshold: baseParams.threshold,
          topK: baseParams.topK,
          version: "v3",
          pesoColor: baseParams.pesoColor,
        });

        setMetricsResult(metrics);

        // ✅ TOMAR carros principales del backend (similarity_avg)
        const carroIds = metrics.carros.map((c) => c.id);
        const similarityMap = new Map(
          metrics.carros.map((c) => [c.id, c.similarity_avg])
        );

        const searchResult: CBIRSearchResult = {
          carroIds,
          similarityMap,
          total: metrics.total,
          totalPages: metrics.totalPages,
        };

        setResult(searchResult);
        setIsActive(true);
        setLastSearchVersion(baseParams.version);
        return searchResult;
      }

      // V1, V2, V3 normal
      const cbirData = await cbirService.search(baseParams);

      if (!cbirData.carros || cbirData.carros.length === 0) {
        setError("No se encontraron resultados similares");
        setResult(null);
        setIsActive(true);
        setLastSearchVersion(baseParams.version);
        return null;
      }

      const carroIds = cbirData.carros.map((c) => c.id);
      const similarityMap = new Map(
        cbirData.carros.map((c) => [c.id, c.similarity])
      );

      const searchResult: CBIRSearchResult = {
        carroIds,
        similarityMap,
        total: cbirData.total,
        totalPages: cbirData.totalPages,
      };

      setResult(searchResult);
      setIsActive(true);
      setLastSearchVersion(baseParams.version);
      return searchResult;
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Error desconocido al buscar";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setResult(null);
    setMetricsResult(null);
    setIsActive(false);
    setError(null);
    setLastSearchVersion(null);
  }

  return {
    result,
    metricsResult,
    loading,
    error,
    isActive,
    lastSearchVersion,
    search,
    reset,
  };
}
