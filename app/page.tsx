import { getCarros } from "@/lib/services/carros";
import { CBIRSection } from "@/features/cbir";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { CatalogHeader } from "@/components/home/CatalogHeader";
import { InfoSection } from "@/components/home/InfoSection";
import { CTASection } from "@/components/home/CTASection";

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
      <HeroSection />
      <StatsSection totalVehicles={total} />

      <CatalogHeader currentPage={currentPage} total={total} />

      <div className="container mx-auto px-4">
        <CBIRSection
          key={currentPage}
          initial={{ carros, total, totalPages, currentPage }}
        />
      </div>

      <InfoSection />
      <CTASection />
    </main>
  );
}
