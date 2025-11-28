import { useState } from "react";
import type { CBIRSearchParams, CBIRSearchResult, CBIRVersion } from "../types/cbirTypes";
import { cbirService } from "../services/cbirService";

export function useCBIRSearch() {
  const [result, setResult] = useState<CBIRSearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [lastSearchVersion, setLastSearchVersion] = useState<CBIRVersion | null>(null);

  async function search(params: CBIRSearchParams): Promise<CBIRSearchResult | null> {
    setLoading(true);
    setError(null);

    try {
      const cbirData = await cbirService.search(params);

      if (!cbirData.carros || cbirData.carros.length === 0) {
        setError("No se encontraron resultados similares");
        setResult(null);
        setIsActive(true);
        setLastSearchVersion(params.version);
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
      setLastSearchVersion(params.version);
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
    setIsActive(false);
    setError(null);
    setLastSearchVersion(null);
  }

  return {
    result,
    loading,
    error,
    isActive,
    lastSearchVersion,
    search,
    reset,
  };
}
