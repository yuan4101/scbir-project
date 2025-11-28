"use client";

import { useState } from "react";
import { SearchPanel } from "./components/SearchPanel";
import { CarroGrid } from "@/features/catalogo/components/CarroGrid";
import { CarroDetailModal } from "@/features/catalogo/components/CarroDetailModal";
import { Pagination } from "@/features/pagination/components/Pagination";
import { useImageUpload } from "./hooks/useImageUpload";
import { useCBIRSearch } from "./hooks/useCBIRSearch";
import { useCarroDetail } from "@/features/catalogo/hooks/useCarroDetail";
import { useCatalogo } from "@/features/catalogo/hooks/useCatalogo";
import type { CatalogoData } from "@/features/catalogo/types/catalogoTypes";
import type { CBIRVersion, CBIRMetric } from "./types/cbirTypes";
import {
  CBIR_VERSIONS,
  DEFAULT_METRICA,
  DEFAULT_PESO_COLOR,
} from "./constants/versions";

interface CBIRSectionProps {
  initial: CatalogoData;
}

export function CBIRSection({ initial }: CBIRSectionProps) {
  const [threshold, setThreshold] = useState(0.3);
  const [topK, setTopK] = useState(12);
  const [selectedVersion, setSelectedVersion] = useState<CBIRVersion>("v1");
  const [metrica, setMetrica] = useState<CBIRMetric>(DEFAULT_METRICA);
  const [pesoColor, setPesoColor] = useState(DEFAULT_PESO_COLOR);

  const imageUpload = useImageUpload();
  const cbirSearch = useCBIRSearch();
  const catalogo = useCatalogo(initial);
  const carroDetail = useCarroDetail();

  async function handleSearch() {
    if (!imageUpload.file) {
      imageUpload.setError("Selecciona una imagen para buscar");
      return;
    }

    const result = await cbirSearch.search({
      file: imageUpload.file,
      threshold,
      topK,
      version: selectedVersion,
      metrica: selectedVersion === "v3" ? metrica : undefined,
      pesoColor: selectedVersion === "v3" ? pesoColor : undefined,
    });

    if (result) {
      await catalogo.applyCBIRResults(result);
    }
  }

  function handleReset() {
    imageUpload.clear();
    cbirSearch.reset();
    catalogo.resetToNormal();
  }

  const isCBIRMode = catalogo.mode === "cbir";

  const usedVersion = cbirSearch.lastSearchVersion || selectedVersion;
  const usedVersionInfo = CBIR_VERSIONS[usedVersion];

  const successMessage =
    isCBIRMode && catalogo.carros.length > 0
      ? `✓ Se encontraron ${catalogo.carros.length} resultados similares usando ${usedVersionInfo.name}`
      : null;

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
        canSearch={!!imageUpload.file}
        threshold={threshold}
        topK={topK}
        version={selectedVersion}
        versionInfo={CBIR_VERSIONS[selectedVersion]}
        metrica={metrica}
        pesoColor={pesoColor}
        onThresholdChange={setThreshold}
        onTopKChange={setTopK}
        onVersionChange={setSelectedVersion}
        onMetricaChange={setMetrica}
        onPesoColorChange={setPesoColor}
        showReset={isCBIRMode}
        onReset={handleReset}
        uploadError={imageUpload.error}
        searchError={cbirSearch.error}
        successMessage={successMessage}
      />

      <CarroGrid
        carros={catalogo.carros}
        showSimilarity={isCBIRMode}
        onCarroDetailClick={carroDetail.open}
      />

      {!isCBIRMode && (
        <Pagination
          currentPage={catalogo.meta.currentPage}
          totalPages={catalogo.meta.totalPages}
        />
      )}

      <CarroDetailModal
        carro={carroDetail.selectedCarro}
        isOpen={carroDetail.isOpen}
        onClose={carroDetail.close}
      />
    </>
  );
}
