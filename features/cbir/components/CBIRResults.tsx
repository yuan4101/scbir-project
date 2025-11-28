"use client";

import Image from "next/image";
import type { CarroConSimilitud } from "../types/cbirTypes";
import { formatCurrency } from "@/utils/price/format";

interface CBIRResultsProps {
  carros: CarroConSimilitud[];
  isActive: boolean;
  onImageClick: (imagen: string) => void;
}

export function CBIRResults({
  carros,
  isActive,
  onImageClick,
}: CBIRResultsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {carros.map((carro) => (
        <div
          key={carro.id}
          onClick={() => onImageClick(carro.imagen)}
          className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
        >
          <div className="relative h-56 w-full overflow-hidden bg-gray-200">
            <Image
              unoptimized
              src={carro.imagen}
              alt={`${carro.marca} ${carro.modelo}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
            {isActive && carro.similarity !== undefined && (
              <div className="absolute top-3 right-3 bg-linear-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
                {(carro.similarity * 100).toFixed(1)}%
              </div>
            )}
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-gray-600 text-sm mb-4">{carro.marca}</p>
                <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {carro.modelo}
                </h2>
              </div>
              <span className="px-3 py-1 text-s font-semibold text-blue-600 bg-blue-100 rounded-lg">
                {carro.año}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 pb-1">
                {formatCurrency(carro.precio)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
