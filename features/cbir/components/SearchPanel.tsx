"use client";

import { SearchIcon } from "@/components/icons/SearchIcon";
import { BackendStatus } from "./BackendStatus";
import { ImageUploader } from "./ImageUploader";
import { SearchButton } from "./SearchButton";
import { CBIRControls } from "./CBIRControls";
import { ResetButton } from "./ResetButton";
import { SearchFeedback } from "./SearchFeedback";

import type {
  CBIRVersion,
  CBIRVersionInfo,
  CBIRMetric,
  CBIRMetricsResponse,
} from "../types/cbirTypes";
import { useState } from "react";

type HealthStatusGlobal = "checking" | "online" | "partial" | "offline";

interface SearchPanelProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  preview: string | null;
  selectedVersion: CBIRVersion | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageDrop: (e: React.DragEvent<HTMLLabelElement>) => void;
  onImageClear: () => void;
  onSearch: () => void;
  loading: boolean;
  canSearch: boolean;
  threshold: number;
  topK: number;
  version: CBIRVersion | null;
  versionInfo: CBIRVersionInfo;
  metrica?: CBIRMetric;
  pesoColor?: number;
  onThresholdChange: (value: number) => void;
  onTopKChange: (value: number) => void;
  onVersionChange: (version: CBIRVersion) => void;
  onMetricaChange?: (metrica: CBIRMetric) => void;
  onPesoColorChange?: (peso: number) => void;
  showReset: boolean;
  onReset: () => void;
  uploadError: string | null;
  searchError: string | null;
  successMessage: string | null;
  onAnalyzeAllMetricsChange?: (value: boolean) => void;
  analyzeAllMetrics?: boolean;
  metricsResult?: CBIRMetricsResponse | null;
  isV12Online?: boolean;
  isV3Online?: boolean;
  healthStatusGlobal?: HealthStatusGlobal;
}

export function SearchPanel({
  inputRef,
  preview,
  onImageChange,
  onImageDrop,
  onImageClear,
  onSearch,
  loading,
  canSearch,
  threshold,
  topK,
  version,
  versionInfo,
  metrica,
  pesoColor,
  onThresholdChange,
  onTopKChange,
  onVersionChange,
  onMetricaChange,
  onPesoColorChange,
  showReset,
  onReset,
  uploadError,
  searchError,
  successMessage,
  onAnalyzeAllMetricsChange,
  analyzeAllMetrics = false,
  isV12Online = true,
  isV3Online = true,
  healthStatusGlobal = "checking",
}: SearchPanelProps) {
  const [localAnalyzeAll, setLocalAnalyzeAll] = useState(analyzeAllMetrics);

  const handleAnalyzeToggle = (value: boolean) => {
    setLocalAnalyzeAll(value);
    onAnalyzeAllMetricsChange?.(value);
  };

  const isHealthChecking = healthStatusGlobal === "checking";

  const isSelectedVersionOffline =
    !version ||
    (version === "v1" || version === "v2" ? !isV12Online : false) ||
    (version === "v3" ? !isV3Online : false);

  const searchDisabled =
    isHealthChecking || !canSearch || loading || isSelectedVersionOffline;

  return (
    <div className="mx-auto max-w-6xl mb-12 pt-3">
      <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl">
        <div className="sm:hidden absolute -top-6 right-3 z-20">
          <BackendStatus />
        </div>

        <div className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <SearchIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 shrink-0" />
                <span className="leading-tight">
                  Búsqueda Visual Inteligente
                </span>
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Sube una imagen y encuentra vehículos similares en segundos
              </p>
            </div>
            <div className="hidden sm:block">
              <BackendStatus />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <ImageUploader
            inputRef={inputRef}
            preview={preview}
            selectedVersion={version}
            onChange={onImageChange}
            onDrop={onImageDrop}
            onClear={onImageClear}
          />
        </div>

        <CBIRControls
          threshold={threshold}
          topK={topK}
          selectedVersion={version}
          versionInfo={versionInfo}
          metrica={metrica}
          pesoColor={pesoColor}
          analyzeAllMetrics={localAnalyzeAll}
          onThresholdChange={onThresholdChange}
          onTopKChange={onTopKChange}
          onVersionChange={onVersionChange}
          onMetricaChange={onMetricaChange}
          onPesoColorChange={onPesoColorChange}
          onAnalyzeAllMetricsChange={handleAnalyzeToggle}
          isV12Online={isV12Online}
          isV3Online={isV3Online}
          healthStatusGlobal={healthStatusGlobal}
        />

        <div className="mt-6">
          <SearchButton
            onClick={onSearch}
            loading={loading}
            disabled={searchDisabled}
          />
        </div>

        {showReset && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <ResetButton onClick={onReset} />
          </div>
        )}

        <SearchFeedback
          uploadError={uploadError}
          searchError={searchError}
          successMessage={successMessage}
        />
      </div>
    </div>
  );
}
