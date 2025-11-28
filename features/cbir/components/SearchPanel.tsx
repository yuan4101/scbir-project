"use client";

import { SearchIcon } from "@/components/icons/SearchIcon";
import { BackendStatus } from "./BackendStatus";
import { ImageUploader } from "./ImageUploader";
import { SearchButton } from "./SearchButton";
import { CBIRControls } from "./CBIRControls";
import { ResetButton } from "./ResetButton";
import { SearchFeedback } from "./SearchFeedback";
import type { CBIRVersion, CBIRVersionInfo } from "../types/cbirTypes";

interface SearchPanelProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  preview: string | null;
  selectedVersion: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageDrop: (e: React.DragEvent<HTMLLabelElement>) => void;
  onImageClear: () => void;
  onSearch: () => void;
  loading: boolean;
  canSearch: boolean;
  threshold: number;
  topK: number;
  version: CBIRVersion;
  versionInfo: CBIRVersionInfo;
  onThresholdChange: (value: number) => void;
  onTopKChange: (value: number) => void;
  onVersionChange: (version: CBIRVersion) => void;
  showReset: boolean;
  onReset: () => void;
  uploadError: string | null;
  searchError: string | null;
  successMessage: string | null;
}

export function SearchPanel({
  inputRef,
  preview,
  selectedVersion,
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
  onThresholdChange,
  onTopKChange,
  onVersionChange,
  showReset,
  onReset,
  uploadError,
  searchError,
  successMessage,
}: SearchPanelProps) {
  return (
    <div className="mx-auto max-w-6xl mb-12">
      <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl">
        {/* BackendStatus flotante SOLO mobile */}
        <div className="sm:hidden absolute -top-5 right-4 z-20">
          <BackendStatus />
        </div>

        {/* Header del panel */}
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
                Sube una imagen y encuentra vehículos similares usando
                algoritmos de visión por computadora
              </p>
            </div>
            {/* BackendStatus en línea SOLO desktop */}
            <div className="hidden sm:block">
              <BackendStatus />
            </div>
          </div>
        </div>

        {/* Upload imagen */}
        <div className="mb-6">
          <ImageUploader
            inputRef={inputRef}
            preview={preview}
            selectedVersion={selectedVersion}
            onChange={onImageChange}
            onDrop={onImageDrop}
            onClear={onImageClear}
          />
        </div>

        {/* Controles */}
        <CBIRControls
          threshold={threshold}
          topK={topK}
          selectedVersion={version}
          versionInfo={versionInfo}
          onThresholdChange={onThresholdChange}
          onTopKChange={onTopKChange}
          onVersionChange={onVersionChange}
        />

        {/* Botón de búsqueda - AHORA AL FINAL */}
        <div className="mt-6">
          <SearchButton
            onClick={onSearch}
            loading={loading}
            disabled={!canSearch}
          />
        </div>

        {/* Botón reset */}
        {showReset && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <ResetButton onClick={onReset} />
          </div>
        )}

        {/* Feedback */}
        <SearchFeedback
          uploadError={uploadError}
          searchError={searchError}
          successMessage={successMessage}
        />
      </div>
    </div>
  );
}
