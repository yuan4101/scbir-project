// app/page.tsx (Server Component por defecto)
import { getCarros } from "@/lib/services/carros";
import { CBIRSection } from "@/features/cbir/components/CBIRSection";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const { carros, total, totalPages } = await getCarros({
    page: currentPage,
    limit: 12,
  });

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 pb-2 leading-tight">
            Catálogo de Vehículos
          </h1>
          <p className="text-gray-600 text-lg mt-2">
            {total} vehículos disponibles
          </p>
        </div>

        {/* La key fuerza el remount cuando cambia la página */}
        <CBIRSection
          key={currentPage}
          initial={{ carros, total, totalPages, currentPage }}
        />
      </div>
    </main>
  );
}
