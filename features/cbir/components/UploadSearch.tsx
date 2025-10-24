"use client";

import { useState, useRef } from "react";
import { Carro } from "@/types/carro";
import { errorMessage } from "@/utils/error/errorMessage";

type Props = {
  onResults: (data: {
    carros: Carro[];
    total: number;
    totalPages: number;
  }) => void;
  defaultTopK?: number;
};

export function UploadSearch({ onResults, defaultTopK = 48 }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleFile(f: File) {
    if (!f.type.startsWith("image/")) {
      setError("El archivo debe ser una imagen");
      return;
    }
    if (f.size > 6 * 1024 * 1024) {
      setError("La imagen no debe superar 6MB");
      return;
    }
    setError(null);
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
      setError("Selecciona una imagen para buscar");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("topK", String(defaultTopK));
      // Puedes añadir más parámetros: método=orb, ratio=0.75, etc.

      const res = await fetch("/api/cbir/search", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) throw new Error("Búsqueda CBIR falló");
      const data = await res.json();
      onResults(data);
    } catch (err) {
      setError(errorMessage(err, "Error desconocido"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl mb-10">
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
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
            className="px-5 py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Buscando..." : "Buscar por imagen"}
          </button>
        </div>

        {preview && (
          <div className="mt-4 flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="preview"
              className="h-20 w-20 object-cover rounded-lg border border-gray-200"
            />
            <button
              onClick={() => {
                setFile(null);
                setPreview(null);
                if (inputRef.current?.value) {
                  inputRef.current.value = "";
                }
              }}
              className="text-sm text-gray-600 underline"
            >
              Quitar imagen
            </button>
          </div>
        )}

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
