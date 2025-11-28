"use client";

import { ImageIcon } from "@/components/icons/ImageIcon";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { TrashIcon } from "@/components/icons/TrashIcon";

interface ImageUploaderProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  preview: string | null;
  selectedVersion: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (e: React.DragEvent<HTMLLabelElement>) => void;
  onClear: () => void;
}

export function ImageUploader({
  inputRef,
  preview,
  selectedVersion,
  onChange,
  onDrop,
  onClear,
}: ImageUploaderProps) {
  return (
    <div className="w-full">
      {!preview ? (
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className="block w-full group border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300"
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onChange}
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                <PlusIcon className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-800 font-semibold text-lg mb-1">
                Arrastra tu imagen aquí
              </p>
              <p className="text-gray-500 text-sm">
                o haz clic para seleccionar
              </p>
              <p className="text-gray-400 text-xs mt-2">
                JPG, PNG, WEBP • Máximo 6MB
              </p>
            </div>
          </div>
        </label>
      ) : (
        <div className="w-full relative group">
          <div className="border-2 border-blue-200 rounded-2xl p-4 bg-linear-to-br from-blue-50 to-indigo-50">
            <div className="flex items-center gap-4">
              <div className="relative h-24 w-24 rounded-xl overflow-hidden shadow-md border-2 border-white shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="preview"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-sm font-semibold text-gray-900">
                    Imagen cargada correctamente
                  </p>
                </div>
                <p className="text-xs text-gray-600 mb-2">
                  Lista para buscar con{" "}
                  <span className="font-semibold text-blue-600">
                    {selectedVersion.toUpperCase()}
                  </span>
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md">
                    Algoritmo {selectedVersion}
                  </span>
                </div>
              </div>
              <button
                onClick={onClear}
                className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer shrink-0"
                title="Eliminar imagen"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
