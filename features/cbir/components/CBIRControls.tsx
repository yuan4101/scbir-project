"use client";

import { ChartBarIcon } from "@/components/icons/ChartBarIcon";
import { MenuIcon } from "@/components/icons/MenuIcon";
import { MonitorIcon } from "@/components/icons/MonitorIcon";
import { SettingsIcon } from "@/components/icons/SettingsIcon";
import type {
  CBIRVersion,
  CBIRVersionInfo,
  CBIRMetric,
} from "../types/cbirTypes";
import { CBIR_VERSIONS, CBIR_METRICS } from "../constants/versions";

type HealthStatusGlobal = "checking" | "online" | "partial" | "offline";

interface CBIRControlsProps {
  threshold: number;
  topK: number;
  selectedVersion: CBIRVersion | null;
  versionInfo: CBIRVersionInfo;
  metrica?: CBIRMetric;
  pesoColor?: number;
  analyzeAllMetrics?: boolean;
  onThresholdChange: (value: number) => void;
  onTopKChange: (value: number) => void;
  onVersionChange: (version: CBIRVersion) => void;
  onMetricaChange?: (metrica: CBIRMetric) => void;
  onPesoColorChange?: (peso: number) => void;
  onAnalyzeAllMetricsChange?: (value: boolean) => void;
  isV12Online?: boolean;
  isV3Online?: boolean;
  healthStatusGlobal?: HealthStatusGlobal;
}

export function CBIRControls({
  threshold,
  topK,
  selectedVersion,
  versionInfo,
  metrica = "euclidean",
  pesoColor = 0.7,
  analyzeAllMetrics = false,
  onThresholdChange,
  onTopKChange,
  onVersionChange,
  onMetricaChange,
  onPesoColorChange,
  onAnalyzeAllMetricsChange,
  isV12Online = true,
  isV3Online = true,
  healthStatusGlobal = "checking",
}: CBIRControlsProps) {
  const versions = Object.values(CBIR_VERSIONS);
  const isHealthChecking = healthStatusGlobal === "checking";

  return (
    <div className="mt-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-linear-to-br from-gray-50 to-blue-50 rounded-xl p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <ChartBarIcon className="w-4 h-4 text-blue-600" />
              Umbral de Similitud
            </label>
            <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-lg">
              {(threshold * 100).toFixed(0)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={threshold}
            onChange={(e) => onThresholdChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>0% (Flexible)</span>
            <span>100% (Exacto)</span>
          </div>
        </div>

        <div className="bg-linear-to-br from-gray-50 to-indigo-50 rounded-xl p-5 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <MenuIcon className="w-4 h-4 text-indigo-600" />
              Resultados Máximos
            </label>
            <span className="px-3 py-1 bg-indigo-600 text-white text-sm font-bold rounded-lg">
              {topK}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={topK}
            onChange={(e) => onTopKChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>1 resultado</span>
            <span>20 resultados</span>
          </div>
        </div>
      </div>

      <div className="bg-linear-to-br from-slate-50 to-purple-50 rounded-xl p-5 border border-gray-200">
        <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <MonitorIcon className="w-4 h-4 text-purple-600" />
          Algoritmo de Búsqueda Visual
        </label>
        <div className="grid grid-cols-3 gap-4 mb-3">
          {versions.map((version) => {
            const isDisabledByHealth =
              version.id === "v1" || version.id === "v2"
                ? !isV12Online
                : version.id === "v3"
                ? !isV3Online
                : false;

            const isDisabled = isHealthChecking || isDisabledByHealth;

            return (
              <button
                key={version.id}
                onClick={() => !isDisabled && onVersionChange(version.id)}
                disabled={isDisabled}
                className={`group relative px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isDisabled
                    ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-50"
                    : selectedVersion === version.id
                    ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105 cursor-pointer"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 cursor-pointer"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-lg">{version.id.toUpperCase()}</span>
                  {selectedVersion === version.id && !isDisabled && (
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
        {selectedVersion && (
          <div className="bg-white/80 rounded-lg p-3 border border-gray-200">
            <p className="text-xs text-slate-700 leading-relaxed">
              <span className="font-semibold text-slate-900">
                {versionInfo.name}:
              </span>{" "}
              {versionInfo.details}
            </p>
          </div>
        )}
      </div>

      {selectedVersion === "v3" && onMetricaChange && onPesoColorChange && (
        <div className="bg-linear-to-r from-sky-50 via-indigo-50 to-white rounded-xl border border-indigo-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <SettingsIcon className="w-4 h-4 text-indigo-600" />
              <h4 className="text-sm font-semibold text-indigo-800">
                Configuración avanzada V3
              </h4>
            </div>
            {onAnalyzeAllMetricsChange && (
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <div className="relative">
                  <input
                    id="analyze-all-metrics"
                    type="checkbox"
                    checked={analyzeAllMetrics}
                    onChange={(e) =>
                      onAnalyzeAllMetricsChange(e.target.checked)
                    }
                    className="peer sr-only"
                  />
                  <div className="w-9 h-5 rounded-full bg-slate-200 peer-checked:bg-indigo-600 transition-colors" />
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow peer-checked:translate-x-4 transition-transform" />
                </div>
                <span className="text-xs font-medium text-slate-700">
                  Analizar todas las métricas
                </span>
              </label>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-slate-700 mb-2">
              Métrica de distancia
            </label>
            <select
              value={metrica}
              onChange={(e) => onMetricaChange?.(e.target.value as CBIRMetric)}
              disabled={analyzeAllMetrics}
              className={`w-full px-3 py-2 border rounded-lg text-sm bg-white shadow-sm transition-all ${
                analyzeAllMetrics
                  ? "border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
                  : "border-indigo-200 text-slate-800 hover:border-indigo-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
              }`}
            >
              {Object.entries(CBIR_METRICS).map(([key, metric]) => (
                <option key={key} value={key} className="text-slate-900">
                  {metric.name} – {metric.description}
                </option>
              ))}
            </select>
            {analyzeAllMetrics && (
              <p className="mt-1 text-xs text-slate-500">
                Se calcularán todas las métricas y se mostrarán en el panel de
                resultados.
              </p>
            )}
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-slate-700">
                Balance color / textura
              </label>
              <span className="text-[11px] font-semibold">
                <span className="text-sky-700">
                  Color: {(pesoColor * 100).toFixed(0)}%
                </span>
                <span className="text-slate-500"> · </span>
                <span className="text-indigo-700">
                  Textura: {((1 - pesoColor) * 100).toFixed(0)}%
                </span>
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={pesoColor}
              onChange={(e) => onPesoColorChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-linear-to-r from-sky-400 via-sky-300 to-indigo-400 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />

            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>100% textura</span>
              <span>50 / 50</span>
              <span>100% color</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
