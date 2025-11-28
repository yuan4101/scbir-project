import type { CBIRVersion, CBIRVersionInfo, CBIRMetric } from "../types/cbirTypes";

// Catálogo de versiones disponibles
export const CBIR_VERSIONS: Record<CBIRVersion, CBIRVersionInfo> = {
  v1: {
    id: "v1",
    name: "Versión 1 - Histograma de Color",
    description: "Algoritmo base con similitud coseno",
    details: "Utiliza histogramas de color en espacio HSV (8×8×8 bins) combinado con patrones binarios locales (LBP) para extracción de características de textura. Emplea similitud coseno para comparación.",
  },
  v2: {
    id: "v2",
    name: "Versión 2 - Segmentación GrabCut",
    description: "Algoritmo con segmentación GrabCut y distancia euclidiana ponderada",
    details: "Incorpora segmentación GrabCut para aislar el vehículo del fondo antes de extraer características HSV+LBP. Utiliza distancia euclidiana ponderada (70% color, 30% textura), mejorando la precisión en imágenes con fondos complejos.",
  },
  v3: {
    id: "v3",
    name: "Versión 3 - Deep Learning con U²-Net",
    description: "Algoritmo avanzado con segmentación por Deep Learning y métricas configurables",
    details: "Utiliza segmentación basada en red neuronal U²-Net (rembg) para eliminación precisa del fondo. Permite seleccionar entre 4 métricas de distancia (Euclidiana, Manhattan, Coseno, Hamming) y ajustar pesos personalizables entre color y textura, ofreciendo mayor flexibilidad y precisión en la búsqueda.",
  },
};

// Catálogo de métricas disponibles para V3
export const CBIR_METRICS: Record<CBIRMetric, { name: string; description: string }> = {
  euclidean: {
    name: "Euclidiana",
    description: "Distancia L2 clásica, sensible a magnitudes absolutas",
  },
  manhattan: {
    name: "Manhattan",
    description: "Distancia L1 (taxista), más robusta a valores atípicos",
  },
  cosine: {
    name: "Coseno",
    description: "Similitud angular, invariante a escala de vectores",
  },
  hamming: {
    name: "Hamming",
    description: "Diferencias binarias, útil para patrones discretos",
  },
};

// Valores por defecto
export const DEFAULT_THRESHOLD = 0.3;
export const DEFAULT_TOP_K = 12;
export const DEFAULT_METRICA: CBIRMetric = "euclidean";
export const DEFAULT_PESO_COLOR = 0.7;
