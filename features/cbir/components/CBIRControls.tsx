"use client";

import { ChartBarIcon } from "@/components/icons/ChartBarIcon";
import { MenuIcon } from "@/components/icons/MenuIcon";
import { MonitorIcon } from "@/components/icons/MonitorIcon";
import type {
  CBIRVersion,
  CBIRVersionInfo,
  CBIRMetric,
} from "../types/cbirTypes";
import { CBIR_VERSIONS, CBIR_METRICS } from "../constants/versions";

interface CBIRControlsProps {
  threshold: number;
  topK: number;
  selectedVersion: CBIRVersion;
  versionInfo: CBIRVersionInfo;
  metrica?: CBIRMetric;
  pesoColor?: number;
  onThresholdChange: (value: number) => void;
  onTopKChange: (value: number) => void;
  onVersionChange: (version: CBIRVersion) => void;
  onMetricaChange?: (metrica: CBIRMetric) => void;
  onPesoColorChange?: (peso: number) => void;
}

export function CBIRControls({
  threshold,
  topK,
  selectedVersion,
  versionInfo,
  metrica = "euclidean",
  pesoColor = 0.7,
  onThresholdChange,
  onTopKChange,
  onVersionChange,
  onMetricaChange,
  onPesoColorChange,
}: CBIRControlsProps) {
  const versions = Object.values(CBIR_VERSIONS);
  const pesoTextura = 1 - pesoColor;

  return (
    <div className="mt-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Threshold */}
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
            step="0.02"
            value={threshold}
            onChange={(e) => onThresholdChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>0% (Flexible)</span>
            <span>100% (Exacto)</span>
          </div>
        </div>

        {/* Top K */}
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

      {/* Selector de versión */}
      <div className="bg-linear-to-br from-slate-50 to-purple-50 rounded-xl p-5 border border-gray-200">
        <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <MonitorIcon className="w-4 h-4 text-purple-600" />
          Algoritmo de Búsqueda Visual
        </label>
        <div className="grid grid-cols-3 gap-4 mb-3">
          {versions.map((version) => (
            <button
              key={version.id}
              onClick={() => onVersionChange(version.id)}
              className={`group relative px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                selectedVersion === version.id
                  ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg">{version.id.toUpperCase()}</span>
                {selectedVersion === version.id && (
                  <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                )}
              </div>
            </button>
          ))}
        </div>
        <div className="bg-white/70 rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-800">
              {versionInfo.name}:
            </span>{" "}
            {versionInfo.details}
          </p>
        </div>
      </div>

      {/* Controles específicos para V3 */}
      {selectedVersion === "v3" && onMetricaChange && onPesoColorChange && (
        <div className="bg-linear-to-r from-purple-50 to-indigo-50 p-5 rounded-xl border border-purple-200">
          <h4 className="text-sm font-semibold text-purple-800 mb-4 flex items-center gap-2">
            ⚙️ Configuración Avanzada V3
          </h4>

          {/* Selector de métrica - CORREGIDO */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-purple-700 mb-2">
              Métrica de distancia
            </label>
            <select
              value={metrica}
              onChange={(e) => onMetricaChange!(e.target.value as CBIRMetric)}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl text-sm font-medium text-purple-800 bg-white/80 shadow-sm hover:border-purple-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100/50 focus:outline-none transition-all duration-200"
            >
              {Object.entries(CBIR_METRICS).map(([key, metric]) => (
                <option key={key} value={key} className="text-purple-900">
                  {metric.name} - {metric.description}
                </option>
              ))}
            </select>
          </div>

          {/* Control de pesos */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-purple-700">
                Balance Color/Textura
              </label>
              <span className="text-xs font-semibold text-purple-800">
                Color: {(pesoColor! * 100).toFixed(0)}% | Textura:{" "}
                {(pesoTextura * 100).toFixed(0)}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={pesoColor}
              onChange={(e) => onPesoColorChange!(parseFloat(e.target.value))}
              className="w-full h-2 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />

            <div className="flex justify-between text-xs text-purple-600 mt-2">
              <span>100% Textura</span>
              <span>50/50</span>
              <span>100% Color</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
