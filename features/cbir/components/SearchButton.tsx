"use client";

import { SearchIcon } from "@/components/icons/SearchIcon";
import { SpinnerIcon } from "@/components/icons/SpinnerIcon";

interface SearchButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
}

export function SearchButton({
  onClick,
  loading,
  disabled,
}: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="group relative w-full px-6 py-4 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      <div className="relative flex items-center justify-center gap-2">
        {loading ? (
          <>
            <SpinnerIcon />
            <span>Buscando...</span>
          </>
        ) : (
          <>
            <SearchIcon className="w-5 h-5" />
            <span>Buscar Similares</span>
          </>
        )}
      </div>
    </button>
  );
}
