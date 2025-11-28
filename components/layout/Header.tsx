"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">A</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                AutoHub Premium
              </h1>
              <p className="text-xs text-gray-500">
                Búsqueda visual inteligente
              </p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="cursor-pointer text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Inicio
            </Link>
            <span className="cursor-pointer text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Catálogo
            </span>
            <span className="cursor-pointer text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Financiamiento
            </span>
            <span className="cursor-pointer text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Contacto
            </span>
          </nav>
          <span className="cursor-pointer px-4 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
            Contactar
          </span>
        </div>
      </div>
    </header>
  );
}
