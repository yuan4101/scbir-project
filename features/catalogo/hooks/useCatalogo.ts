import { useState, useEffect } from "react";
import type { Carro } from "@/types/carro";
import type { CarroConSimilitud, CBIRSearchResult } from "@/features/cbir/types/cbirTypes";
import type { CatalogoData, CatalogoMode } from "../types/catalogoTypes";
import { getCarrosByIds } from "@/lib/services/carros";

export function useCatalogo(initialData: CatalogoData) {
  const [carros, setCarros] = useState<CarroConSimilitud[]>(initialData.carros);
  const [meta, setMeta] = useState({
    total: initialData.total,
    totalPages: initialData.totalPages,
    currentPage: initialData.currentPage,
  });
  const [mode, setMode] = useState<CatalogoMode>("normal");

  // Sincronizar con datos iniciales en modo normal
  useEffect(() => {
    if (mode === "normal") {
      setCarros(initialData.carros);
      setMeta({
        total: initialData.total,
        totalPages: initialData.totalPages,
        currentPage: initialData.currentPage,
      });
    }
  }, [initialData, mode]);

  async function applyCBIRResults(cbirResult: CBIRSearchResult) {
    try {
      // Obtener datos completos de los carros
      const carrosCompletos = await getCarrosByIds(cbirResult.carroIds);

      // Combinar con similaridad manteniendo el orden
      const carrosConSimilitud: CarroConSimilitud[] = cbirResult.carroIds
        .map((id) => {
          const carro = carrosCompletos.find((c: Carro) => c.id === id);
          if (!carro) return null;
          return {
            ...carro,
            similarity: cbirResult.similarityMap.get(id),
          };
        })
        .filter((c): c is NonNullable<typeof c> => c !== null);

      setCarros(carrosConSimilitud);
      setMeta({
        total: cbirResult.total,
        totalPages: cbirResult.totalPages,
        currentPage: 1,
      });
      setMode("cbir");
    } catch (error) {
      console.error("Error al aplicar resultados CBIR:", error);
      throw error;
    }
  }

  function resetToNormal() {
    setCarros(initialData.carros);
    setMeta({
      total: initialData.total,
      totalPages: initialData.totalPages,
      currentPage: initialData.currentPage,
    });
    setMode("normal");
  }

  return {
    carros,
    meta,
    mode,
    applyCBIRResults,
    resetToNormal,
  };
}
