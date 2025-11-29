"use client";

import type { CBIRCarroResponse } from "@/features/cbir/types/cbirTypes";
import Image from "next/image";

interface MetricsBreakdownProps {
  metricsBreakdown: Record<string, CBIRCarroResponse[]>;
  pesoColor: number;
  pesoTextura: number;
}

export function MetricsBreakdown({
  metricsBreakdown,
  pesoColor,
  pesoTextura,
}: MetricsBreakdownProps) {
  const metricKeys = Object.keys(metricsBreakdown);

  if (metricKeys.length === 0) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center bg-linear-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          📊 Desglose por Métrica (V3)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <span className="font-semibold text-blue-600">Peso Color:</span>
            <span className="ml-1 font-mono bg-blue-100 px-2 py-1 rounded text-sm">
              {pesoColor.toFixed(2)}
            </span>
          </div>
          <div>
            <span className="font-semibold text-green-600">Peso Textura:</span>
            <span className="ml-1 font-mono bg-green-100 px-2 py-1 rounded text-sm">
              {pesoTextura.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Grid de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricKeys.map((metricKey) => {
          const metricData = metricsBreakdown[metricKey];
          return (
            <div
              key={metricKey}
              className="border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all bg-white"
            >
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold capitalize bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                  {metricKey
                    .replace("_", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </h4>
                <p className="text-sm text-gray-600 font-mono">
                  {metricData.length} resultado(s)
                </p>
              </div>

              {metricData.length === 0 ? (
                <div className="h-48 flex items-center justify-center text-gray-500">
                  <p className="text-lg">🚫 Sin resultados</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {metricData.slice(0, 3).map((carro) => (
                    <div
                      key={carro.id}
                      className="group cursor-pointer p-4 bg-linear-to-r from-gray-50 to-gray-100 rounded-xl hover:bg-blue-50 border-2 border-transparent hover:border-blue-200 transition-all hover:shadow-md"
                    >
                      <div className="flex items-start space-x-4">
                        {/* Imagen */}
                        <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                          <Image
                            unoptimized
                            src={carro.imagen}
                            alt={`Carro #${carro.id}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm mb-1 truncate">
                            Carro #{carro.id}
                          </p>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-mono text-green-600 font-bold">
                              {carro.similarity.toFixed(4)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {metricData.length > 3 && (
                    <div className="text-center pt-4">
                      <p className="text-sm text-gray-500 font-medium">
                        +{metricData.length - 3} más...
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
