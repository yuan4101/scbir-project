"use client";

import { CarroCard } from "@/features/catalogo/components/CarroCard";
import { useMetricsGridData } from "@/features/catalogo/hooks/useMetricsGridData";
import type {
  CBIRMetricsResponse,
  CBIRCarroResponse,
  CarroConSimilitud,
} from "@/features/cbir/types/cbirTypes";

interface MetricsGridProps {
  metricsResult: CBIRMetricsResponse;
  onCarroClick: (carro: CarroConSimilitud) => void;
}

export function MetricsGrid({ metricsResult, onCarroClick }: MetricsGridProps) {
  const carrosBase = useMetricsGridData(metricsResult);
  const metricKeys = Object.keys(metricsResult.metrics_breakdown) as Array<
    keyof typeof metricsResult.metrics_breakdown
  >;

  const mergeCarro = (
    carroMetric: CBIRCarroResponse
  ): CarroConSimilitud | null => {
    const base = carrosBase.find((c) => c.id === carroMetric.id);
    if (!base) return null;

    return {
      ...base,
      similarity: carroMetric.similarity,
    };
  };

  const formatMetricName = (key: string) =>
    key.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          📊 Resultados por Métrica (V3)
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Cada columna muestra los mejores resultados para su métrica específica
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
        {metricKeys.map((metricKey) => {
          const metricData = metricsResult.metrics_breakdown[metricKey];

          return (
            <div
              key={metricKey}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden h-[700px] flex flex-col"
            >
              <div className="bg-linear-to-r from-purple-600 to-indigo-600 px-6 py-5">
                <h3 className="text-xl font-bold text-white capitalize">
                  {formatMetricName(metricKey)}
                </h3>
                <p className="text-blue-100 text-sm mt-1">
                  {metricData.length} resultado(s)
                </p>
              </div>

              <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                {metricData.slice(0, 8).map((carroMetric) => {
                  const carro = mergeCarro(carroMetric);
                  if (!carro) return null;

                  return (
                    <CarroCard
                      key={carro.id}
                      carro={carro}
                      showSimilarity={true}
                      compactLayout={true}
                      onDetailClick={onCarroClick}
                    />
                  );
                })}
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-500 text-center">
                  Página 1 • {metricData.length} resultados
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
