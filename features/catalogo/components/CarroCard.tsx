"use client";

import Image from "next/image";
import type { CarroConSimilitud } from "@/features/cbir/types/cbirTypes";
import { formatCurrency } from "@/utils/price/format";

interface CarroCardProps {
  carro: CarroConSimilitud;
  showSimilarity?: boolean;
  onDetailClick?: (carro: CarroConSimilitud) => void;
}

export function CarroCard({
  carro,
  showSimilarity = false,
  onDetailClick,
}: CarroCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      {/* Imagen - sin click */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-200">
        <Image
          unoptimized
          src={carro.imagen}
          alt={`${carro.marca} ${carro.modelo}`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
        {showSimilarity && carro.similarity !== undefined && (
          <div className="absolute top-3 right-3 bg-linear-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
            {(carro.similarity * 100).toFixed(1)}% match
          </div>
        )}
      </div>

      {/* Información */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="flex-1">
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">
              {carro.marca}
            </p>
            <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
              {carro.modelo}
            </h2>
          </div>
          <span className="px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg shrink-0">
            {carro.año}
          </span>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Precio</p>
              <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                {formatCurrency(carro.precio)}
              </p>
            </div>
            <button
              onClick={() => onDetailClick?.(carro)}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Ver más
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
