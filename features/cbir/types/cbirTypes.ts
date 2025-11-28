import type { Carro } from "@/types/carro";

export type CBIRVersion = "v1" | "v2" | "v3";

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
  carros: CBIRCarroResponse[];
  total: number;
  totalPages: number;
}

// Parámetros para búsqueda CBIR
export interface CBIRSearchParams {
  file: File;
  threshold: number;
  topK: number;
  version: CBIRVersion;
}

// Resultado de búsqueda CBIR
export interface CBIRSearchResult {
  carroIds: number[];
  similarityMap: Map<number, number>;
  total: number;
  totalPages: number;
}
