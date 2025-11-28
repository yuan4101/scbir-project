"use client";

import type { CarroConSimilitud } from "@/features/cbir/types/cbirTypes";
import { CarroCard } from "./CarroCard";

interface CarroGridProps {
  carros: CarroConSimilitud[];
  showSimilarity?: boolean;
  onCarroDetailClick?: (carro: CarroConSimilitud) => void;
}

export function CarroGrid({
  carros,
  showSimilarity = false,
  onCarroDetailClick,
}: CarroGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {carros.map((carro) => (
        <CarroCard
          key={carro.id}
          carro={carro}
          showSimilarity={showSimilarity}
          onDetailClick={onCarroDetailClick}
        />
      ))}
    </div>
  );
}
