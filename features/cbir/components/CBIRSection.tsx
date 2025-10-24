"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import type { Carro, CarroConSimilitud } from "@/types/carro";
import { formatCurrency } from "@/utils/price/format";
import { Pagination } from "@/features/pagination/components/Pagination";
import { getCarrosByIds } from "@/lib/services/carros";

type Initial = {
  carros: Carro[];
  total: number;
  totalPages: number;
  currentPage: number;
};

type CBIRResponse = {
  carros: Array<{
    id: number;
    imagen: string;
    similarity: number;
  }>;
  total: number;
  totalPages: number;
};

type CBIRVersion = "v1" | "v2";

export function CBIRSection({ initial }: { initial: Initial }) {
  const [list, setList] = useState<CarroConSimilitud[]>(initial.carros);
  const [meta, setMeta] = useState({
    total: initial.total,
    totalPages: initial.totalPages,
    currentPage: initial.currentPage,
  });
  const [cbirActive, setCbirActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [threshold, setThreshold] = useState(0.8);
  const [topK, setTopK] = useState(10);
  const [selectedVersion, setSelectedVersion] = useState<CBIRVersion>("v1");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Estado del health check
  const [healthStatus, setHealthStatus] = useState<
    "checking" | "online" | "offline" | null
  >(null);

  // Estado del modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const BACKEND_URL = "https://scbir-python-backend.onrender.com";

  // Sincronizar el estado con las props cuando cambien
  useEffect(() => {
    if (!cbirActive) {
      setList(initial.carros);
      setMeta({
        total: initial.total,
        totalPages: initial.totalPages,
        currentPage: initial.currentPage,
      });
    }
  }, [initial, cbirActive]);

  // Cerrar modal al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    }

    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [modalOpen]);

  async function checkHealth() {
    setHealthStatus("checking");
    try {
      const res = await fetch(`${BACKEND_URL}/health`, {
        method: "GET",
      });
      if (res.ok) {
        setHealthStatus("online");
        setTimeout(() => setHealthStatus(null), 3000);
      } else {
        setHealthStatus("offline");
      }
    } catch {
      setHealthStatus("offline");
    }
  }

  function handleFile(f: File) {
    if (!f.type.startsWith("image/")) {
      setErrMsg("El archivo debe ser una imagen");
      return;
    }
    if (f.size > 6 * 1024 * 1024) {
      setErrMsg("La imagen no debe superar 6MB");
      return;
    }
    setErrMsg(null);
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  }

  function onDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  }

  async function onSearch() {
    if (!file) {
      setErrMsg("Selecciona una imagen para buscar");
      return;
    }
    setLoading(true);
    setErrMsg(null);
    try {
      // 1. Buscar con CBIR usando la versión seleccionada
      const fd = new FormData();
      fd.append("file", file);
      fd.append("threshold", String(threshold));
      fd.append("top_k", String(topK));

      const endpoint = `${BACKEND_URL}/cbir/search/${selectedVersion}`;
      const cbirRes = await fetch(endpoint, {
        method: "POST",
        body: fd,
      });

      if (!cbirRes.ok) {
        throw new Error(`Error del servidor CBIR: ${cbirRes.status}`);
      }

      const cbirData = (await cbirRes.json()) as CBIRResponse;

      if (!cbirData.carros || cbirData.carros.length === 0) {
        setErrMsg("No se encontraron resultados similares");
        setList([]);
        setMeta({ total: 0, totalPages: 0, currentPage: 1 });
        setCbirActive(true);
        return;
      }

      // 2. Obtener IDs y crear mapa de similaridad
      const carroIds = cbirData.carros.map((c) => c.id);
      const similarityMap = new Map(
        cbirData.carros.map((c) => [c.id, c.similarity])
      );

      // 3. Consultar datos completos usando el servicio
      const carrosCompletos = await getCarrosByIds(carroIds);

      // 4. Combinar datos y mantener orden por similaridad
      const carrosConSimilitud: CarroConSimilitud[] = carroIds
        .map((id) => {
          const carro = carrosCompletos.find((c: Carro) => c.id === id);
          if (!carro) return null;
          return {
            ...carro,
            similarity: similarityMap.get(id),
          };
        })
        .filter((c): c is NonNullable<typeof c> => c !== null);

      setList(carrosConSimilitud);
      setMeta({
        total: cbirData.total,
        totalPages: cbirData.totalPages,
        currentPage: 1,
      });
      setCbirActive(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Error desconocido al buscar";
      setErrMsg(msg);
    } finally {
      setLoading(false);
    }
  }

  function clearInput() {
    if (inputRef.current?.value) {
      inputRef.current.value = "";
    }
    setFile(null);
    setPreview(null);
    setCbirActive(false);
    setErrMsg(null);
  }

  function resetSearch() {
    clearInput();
    setList(initial.carros);
    setMeta({
      total: initial.total,
      totalPages: initial.totalPages,
      currentPage: initial.currentPage,
    });
    setCbirActive(false);
  }

  function openModal(imagen: string) {
    setSelectedImage(imagen);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelectedImage(null);
  }

  return (
    <>
      <div className="mx-auto max-w-5xl mb-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm flex-col gap-10">
          <div className="flex items-center gap-4">
            <label
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
              className="flex-1 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={onChange}
                className="hidden"
              />
              <div className="flex items-center justify-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  🖼️
                </span>
                <div className="text-left">
                  <p className="text-gray-800 font-medium">
                    Arrastra una imagen o haz clic para subir
                  </p>
                  <p className="text-gray-500 text-sm">
                    Formatos: JPG, PNG, WEBP • Máx 6MB
                  </p>
                </div>
              </div>
            </label>
            <button
              onClick={onSearch}
              disabled={loading || !file}
              className="w-40 px-5 py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold disabled:opacity-50 hover:shadow-lg transition-all"
            >
              {loading ? "Buscando..." : "Buscar por imagen"}
            </button>
          </div>

          {/* Controles de threshold y top_k */}
          <div className="mt-4 flex items-center justify-center gap-10">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Umbral de similitud: {threshold.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Menos estricto</span>
                <span>Más estricto</span>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resultados máximos: {topK}
              </label>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={topK}
                onChange={(e) => setTopK(parseInt(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>20</span>
              </div>
            </div>

            {/* Selector de versión CBIR */}
            <div className="mt-4 flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Versión del algoritmo CBIR
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedVersion("v1")}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedVersion === "v1"
                      ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  v1
                </button>
                <button
                  onClick={() => setSelectedVersion("v2")}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedVersion === "v2"
                      ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  v2
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {selectedVersion === "v1"
                  ? "Algoritmo inicial (hsv+lbp)"
                  : "Algoritmo 'mejorado' con segmentacion GrabCut"}
              </p>
            </div>
          </div>

          {/* Header con Health Check y Reset */}
          <div className="mt-5 flex justify-between items-center">
            {cbirActive && (
              <button
                onClick={resetSearch}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                ← Volver al catálogo
              </button>
            )}
            <div className={cbirActive ? "" : "ml-auto"}>
              <button
                onClick={checkHealth}
                disabled={healthStatus === "checking"}
                className="px-4 py-2 rounded-lg text-gray-600 border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {healthStatus === "checking" && "🔄 Verificando..."}
                {healthStatus === "online" && "✅ Backend activo"}
                {healthStatus === "offline" && "❌ Backend inactivo"}
                {healthStatus === null && "🔍 Verificar backend"}
              </button>
            </div>
          </div>

          {preview && (
            <div className="mt-4 flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="preview"
                className="h-20 w-20 object-cover rounded-lg border border-gray-200 shadow-sm"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-700 font-medium">
                  Imagen seleccionada
                </p>
                <p className="text-xs text-gray-500">
                  Lista para buscar coincidencias con{" "}
                  {selectedVersion.toUpperCase()}
                </p>
              </div>
              <button
                onClick={clearInput}
                className="text-sm text-red-600 hover:text-red-700 underline"
              >
                Quitar
              </button>
            </div>
          )}

          {errMsg && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errMsg}</p>
            </div>
          )}

          {cbirActive && list.length > 0 && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700">
                ✓ Se encontraron <strong>{list.length}</strong> resultados
                similares usando{" "}
                <strong>{selectedVersion.toUpperCase()}</strong>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {list.map((carro) => (
          <div
            key={carro.id}
            onClick={() => openModal(carro.imagen)}
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
              {/* Badge de similaridad */}
              {cbirActive && carro.similarity !== undefined && (
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

      {!cbirActive && (
        <Pagination
          currentPage={meta.currentPage}
          totalPages={meta.totalPages}
        />
      )}

      {/* Modal */}
      {modalOpen && selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div
            ref={modalRef}
            className="relative max-w-5xl max-h-[90vh] w-full"
          >
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white text-4xl font-bold hover:text-gray-300 transition-colors z-10"
              aria-label="Cerrar modal"
            >
              ×
            </button>
            <div className="relative w-full h-full">
              <Image
                unoptimized
                src={selectedImage}
                alt="Vista ampliada"
                width={1200}
                height={800}
                className="object-contain w-full h-full rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
