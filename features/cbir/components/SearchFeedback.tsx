"use client";

import { CheckCircleIcon } from "@/components/icons/CheckCircleIcon";
import { XCircleIcon } from "@/components/icons/XCircleIcon";

interface SearchFeedbackProps {
  uploadError: string | null;
  searchError: string | null;
  successMessage: string | null;
}

export function SearchFeedback({
  uploadError,
  searchError,
  successMessage,
}: SearchFeedbackProps) {
  return (
    <div className="mt-4 space-y-3">
      {uploadError && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-in slide-in-from-top duration-300">
          <div className="flex items-start gap-3">
            <XCircleIcon className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">Error de Carga</p>
              <p className="text-sm text-red-600 mt-1">{uploadError}</p>
            </div>
          </div>
        </div>
      )}

      {searchError && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-in slide-in-from-top duration-300">
          <div className="flex items-start gap-3">
            <XCircleIcon className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">
                Error de Búsqueda
              </p>
              <p className="text-sm text-red-600 mt-1">{searchError}</p>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="p-4 bg-linear-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg animate-in slide-in-from-top duration-300">
          <div className="flex items-start gap-3">
            <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800">
                ¡Búsqueda Exitosa!
              </p>
              <p className="text-sm text-green-700 mt-1">{successMessage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
