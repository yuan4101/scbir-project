import type { Carro } from "@/types/carro";

export type CBIRVersion = "v1" | "v2" | "v3";

export type CBIRMetric = "euclidean" | "manhattan" | "cosine" | "hamming";

export type HealthStatus = "checking" | "online" | "offline";

// Extensión de Carro con información de similaridad (específico de CBIR)
export interface CarroConSimilitud extends Carro {
  similarity?: number;
}

// Información detallada de cada versión del algoritmo CBIR
export interface CBIRVersionInfo {
  id: CBIRVersion;
  name: string;
  description: string;
  details: string;
}

// Respuesta individual de CBIR
export interface CBIRCarroResponse {
  id: number;
  imagen: string;
  similarity: number;
}

// Respuesta completa del endpoint CBIR
export interface CBIRResponse {
  version: string;
  carros: CBIRCarroResponse[];
  total: number;
  totalPages: number;
  metrica?: string;
  peso_color?: number;
  peso_textura?: number;
}

// Parámetros para búsqueda CBIR
export interface CBIRSearchParams {
  file: File;
  threshold: number;
  topK: number;
  version: CBIRVersion;
  metrica?: CBIRMetric;
  pesoColor?: number;
}

// Resultado de búsqueda CBIR
export interface CBIRSearchResult {
  carroIds: number[];
  similarityMap: Map<number, number>;
  total: number;
  totalPages: number;
}

// Respuesta del endpoint con métricas múltiples (V3)
export interface CBIRMetricsResponse {
  aggregation: string;
  metrics_breakdown: {
    euclidean: CBIRCarroResponse[];
    manhattan: CBIRCarroResponse[];
    cosine: CBIRCarroResponse[];
    hamming: CBIRCarroResponse[];
  };
  carros: Array<{
    id: number;
    imagen: string;
    similarity_avg: number;
    metrics: {
      euclidean: number;
      manhattan: number;
      cosine: number;
      hamming: number;
    };
  }>;
}
