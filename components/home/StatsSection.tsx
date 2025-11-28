interface StatsSectionProps {
  totalVehicles: number;
}

export function StatsSection({ totalVehicles }: StatsSectionProps) {
  return (
    <section className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white pt-2 pb-5 -mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <div className="text-3xl font-bold">{totalVehicles}+</div>
            <div className="text-sm text-blue-100">Vehículos</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <div className="text-3xl font-bold">3</div>
            <div className="text-sm text-blue-100">Algoritmos</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <div className="text-3xl font-bold">&gt;80%</div>
            <div className="text-sm text-blue-100">Precisión</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <div className="text-3xl font-bold">&lt;5s</div>
            <div className="text-sm text-blue-100">Búsqueda</div>
          </div>
        </div>
      </div>
    </section>
  );
}
