"use client";

import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";

interface ResetButtonProps {
  onClick: () => void;
}

export function ResetButton({ onClick }: ResetButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border-2 border-gray-200 text-gray-700 text-sm font-medium hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 cursor-pointer"
    >
      <ArrowLeftIcon className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
      <span>Volver al Catálogo</span>
    </button>
  );
}
