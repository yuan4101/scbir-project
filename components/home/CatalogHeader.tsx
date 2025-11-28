import Link from "next/link";

interface CatalogHeaderProps {
  currentPage: number;
  total: number;
}

export function CatalogHeader({ currentPage, total }: CatalogHeaderProps) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mb-2 pt-3 pb-1">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            Inicio
          </Link>
          <span>›</span>
          <span className="text-gray-900 font-medium">Catálogo</span>
          {currentPage > 1 && (
            <>
              <span>›</span>
              <span className="text-gray-900">Página {currentPage}</span>
            </>
          )}
        </nav>
      </div>

      {/* Info bar */}
      <div className="container mx-auto px-4 mb-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Mostrando</span>
            <span className="font-semibold text-gray-900">
              {(currentPage - 1) * 12 + 1} - {Math.min(currentPage * 12, total)}
            </span>
            <span className="text-gray-600">de</span>
            <span className="font-semibold text-blue-600">{total}</span>
            <span className="text-gray-600">vehículos</span>
          </div>
        </div>
      </div>
    </>
  );
}
