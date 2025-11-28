import type { CBIRVersion, CBIRVersionInfo } from "../types/cbirTypes";

// Catálogo de versiones disponibles
export const CBIR_VERSIONS: Record<CBIRVersion, CBIRVersionInfo> = {
  v1: {
    id: "v1",
    name: "Versión 1",
    description: "Algoritmo inicial (HSV + LBP)",
    details: "Utiliza histogramas de color en espacio HSV combinado con patrones binarios locales (LBP) para extracción de características de textura.",
  },
  v2: {
    id: "v2",
    name: "Versión 2",
    description: "Algoritmo mejorado con segmentación GrabCut",
    details: "Incorpora segmentación GrabCut para aislar el objeto principal antes de extraer características, mejorando la precisión en imágenes con fondos complejos.",
  },
  v3: {
    id: "v3",
    name: "Versión 3",
    description: "Algoritmo xxxx xxxx xxxx",
    details: "Utiliza xxxx para extracción de características xxxxxxx, ofreciendo mayor precisión xxxxxx.",
  },
};
