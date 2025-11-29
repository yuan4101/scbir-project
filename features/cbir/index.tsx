"use client";

import { useState } from "react";
import { SearchPanel } from "./components/SearchPanel";
import { CarroGrid } from "@/features/catalogo/components/CarroGrid";
import { CarroDetailModal } from "@/features/catalogo/components/CarroDetailModal";
import { Pagination } from "@/features/pagination/components/Pagination";
import { MetricsGrid } from "@/features/catalogo/components/MetricsGrid";
import { useImageUpload } from "./hooks/useImageUpload";
import { useCBIRSearch } from "./hooks/useCBIRSearch";
import { useCarroDetail } from "@/features/catalogo/hooks/useCarroDetail";
import { useCatalogo } from "@/features/catalogo/hooks/useCatalogo";
import { useBackendHealth } from "./hooks/useBackendHealth";

import type { CatalogoData } from "@/features/catalogo/types/catalogoTypes";
import type {
  CBIRVersion,
  CBIRMetric,
  CarroConSimilitud,
} from "./types/cbirTypes";
import {
  CBIR_VERSIONS,
  DEFAULT_METRICA,
  DEFAULT_PESO_COLOR,
  DEFAULT_THRESHOLD,
  DEFAULT_TOP_K,
} from "./constants/versions";

type MaybeCBIRVersion = CBIRVersion | null;

interface CBIRSectionProps {
  initial: CatalogoData;
}

export function CBIRSection({ initial }: CBIRSectionProps) {
  const [threshold, setThreshold] = useState(DEFAULT_THRESHOLD);
  const [topK, setTopK] = useState(DEFAULT_TOP_K);
  const [selectedVersion, setSelectedVersion] =
    useState<MaybeCBIRVersion>(null);
  const [metrica, setMetrica] = useState<CBIRMetric>(DEFAULT_METRICA);
  const [pesoColor, setPesoColor] = useState(DEFAULT_PESO_COLOR);
  const [analyzeAllMetrics, setAnalyzeAllMetrics] = useState(false);

  const imageUpload = useImageUpload();
  const cbirSearch = useCBIRSearch();
  const catalogo = useCatalogo(initial);
  const carroDetail = useCarroDetail();
  const { v12Online, v3Online, healthStatusGlobal } = useBackendHealth();

  async function handleSearch() {
    if (!imageUpload.file || !selectedVersion) {
      imageUpload.setError("Selecciona una imagen y una versión para buscar");
      return;
    }

    const result = await cbirSearch.search({
      file: imageUpload.file!,
      threshold,
      topK,
      version: selectedVersion,
      ...(selectedVersion === "v3" && { metrica, pesoColor }),
      analyzeAllMetrics,
    });

    if (result) {
      await catalogo.applyCBIRResults(result);
    }
  }

  function handleReset() {
    imageUpload.clear();
    cbirSearch.reset();
    catalogo.resetToNormal();
    setAnalyzeAllMetrics(false);
  }

  const isCBIRMode = catalogo.mode === "cbir";

  const effectiveVersion: CBIRVersion | null =
    selectedVersion &&
    (selectedVersion === "v1" || selectedVersion === "v2"
      ? v12Online
      : selectedVersion === "v3"
      ? v3Online
      : false)
      ? selectedVersion
      : null;

  const usedVersion = cbirSearch.lastSearchVersion || effectiveVersion;
  const usedVersionInfo = usedVersion
    ? CBIR_VERSIONS[usedVersion]
    : CBIR_VERSIONS.v1;

  const successMessage =
    isCBIRMode && catalogo.carros.length > 0 && usedVersion
      ? `Se encontraron ${catalogo.carros.length} resultados similares usando ${usedVersionInfo.name}`
      : null;

  const showMetricsGrid =
    isCBIRMode &&
    analyzeAllMetrics &&
    cbirSearch.lastSearchVersion === "v3" &&
    cbirSearch.metricsResult;

  const handleCarroClick = (carro: CarroConSimilitud) => {
    carroDetail.open(carro);
  };

  return (
    <>
      <SearchPanel
        inputRef={imageUpload.inputRef}
        preview={imageUpload.preview}
        selectedVersion={selectedVersion}
        onImageChange={imageUpload.onChange}
        onImageDrop={imageUpload.onDrop}
        onImageClear={imageUpload.clear}
        onSearch={handleSearch}
        loading={cbirSearch.loading}
        canSearch={!!imageUpload.file && !!effectiveVersion}
        threshold={threshold}
        topK={topK}
        version={effectiveVersion}
        versionInfo={usedVersionInfo}
        metrica={effectiveVersion === "v3" ? metrica : undefined}
        pesoColor={effectiveVersion === "v3" ? pesoColor : undefined}
        onThresholdChange={setThreshold}
        onTopKChange={setTopK}
        onVersionChange={setSelectedVersion}
        onMetricaChange={effectiveVersion === "v3" ? setMetrica : undefined}
        onPesoColorChange={effectiveVersion === "v3" ? setPesoColor : undefined}
        showReset={isCBIRMode}
        onReset={handleReset}
        uploadError={imageUpload.error}
        searchError={cbirSearch.error}
        successMessage={successMessage}
        metricsResult={cbirSearch.metricsResult}
        analyzeAllMetrics={analyzeAllMetrics}
        onAnalyzeAllMetricsChange={setAnalyzeAllMetrics}
        isV12Online={v12Online}
        isV3Online={v3Online}
        healthStatusGlobal={healthStatusGlobal}
      />

      {showMetricsGrid ? (
        <MetricsGrid
          metricsResult={cbirSearch.metricsResult!}
          onCarroClick={handleCarroClick}
        />
      ) : (
        <>
          <CarroGrid
            carros={catalogo.carros}
            showSimilarity={isCBIRMode}
            onCarroDetailClick={carroDetail.open}
          />
          <Pagination
            currentPage={catalogo.meta.currentPage}
            totalPages={catalogo.meta.totalPages}
          />
        </>
      )}

      <CarroDetailModal
        carro={carroDetail.selectedCarro}
        isOpen={carroDetail.isOpen}
        onClose={carroDetail.close}
      />
    </>
  );
}
