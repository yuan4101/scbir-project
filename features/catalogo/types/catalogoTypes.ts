import type { Carro } from "@/types/carro";

// Datos del catálogo
export interface CatalogoData {
  carros: Carro[];
  total: number;
  totalPages: number;
  currentPage: number;
}

// Modo de visualización del catálogo
export type CatalogoMode = "normal" | "cbir";