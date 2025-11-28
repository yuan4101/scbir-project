"use client";

import { useEffect } from "react";
import Image from "next/image";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { CalendarIcon } from "@/components/icons/CalendarIcon";
import { ClipboardIcon } from "@/components/icons/ClipboardIcon";
import type { CarroConSimilitud } from "@/features/cbir/types/cbirTypes";
import { formatCurrency } from "@/utils/price/format";

interface CarroDetailModalProps {
  carro: CarroConSimilitud | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CarroDetailModal({
  carro,
  isOpen,
  onClose,
}: CarroDetailModalProps) {
  // Cerrar modal con tecla Escape
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !carro) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con botón cerrar */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white shadow-lg transition-all hover:scale-110 cursor-pointer group"
            aria-label="Cerrar"
          >
            <CloseIcon className="w-6 h-6 text-gray-700 group-hover:text-red-600 transition-colors" />
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="overflow-y-auto max-h-[90vh]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Imagen */}
            <div className="relative h-96 lg:h-auto bg-linear-to-br from-gray-100 to-gray-200">
              <Image
                unoptimized
                src={carro.imagen}
                alt={`${carro.marca} ${carro.modelo}`}
                fill
                className="object-cover"
                priority
              />
              {carro.similarity !== undefined && (
                <div className="absolute top-4 left-4 bg-linear-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
                  {(carro.similarity * 100).toFixed(1)}% match
                </div>
              )}
            </div>

            {/* Información */}
            <div className="p-8 lg:p-10">
              {/* Header */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                  {carro.marca}
                </p>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  {carro.modelo}
                </h2>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl border border-blue-200">
                  <CalendarIcon className="w-5 h-5 text-blue-600" />
                  <span className="text-lg font-semibold text-blue-900">
                    Año {carro.año}
                  </span>
                </div>
              </div>

              {/* Precio destacado */}
              <div className="mb-8 p-6 bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Precio</p>
                <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                  {formatCurrency(carro.precio)}
                </p>
              </div>

              {/* Características técnicas */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ClipboardIcon className="w-5 h-5 text-blue-600" />
                  Información del Vehículo
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-600 font-medium">ID</span>
                    <span className="text-gray-900 font-semibold">
                      #{carro.id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-600 font-medium">Marca</span>
                    <span className="text-gray-900 font-semibold">
                      {carro.marca}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-600 font-medium">Modelo</span>
                    <span className="text-gray-900 font-semibold">
                      {carro.modelo}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-600 font-medium">Año</span>
                    <span className="text-gray-900 font-semibold">
                      {carro.año}
                    </span>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3">
                <button className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all cursor-pointer">
                  Contactar Vendedor
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors cursor-pointer">
                  💙 Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
