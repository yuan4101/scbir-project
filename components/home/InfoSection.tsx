export function InfoSection() {
  return (
    <section className="bg-linear-to-b from-gray-50 to-white py-16 mt-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">
          ¿Cómo funciona nuestra búsqueda visual?
        </h2>
        <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
          Tecnología de visión por computadora para encontrar tu vehículo ideal
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">📸</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              1. Sube una imagen
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Arrastra o selecciona una foto del vehículo que te interesa
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">🤖</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              2. Se analizan características
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Nuestros algoritmos extraen características visuales únicas
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">✨</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              3. Resultados instantáneos
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Encuentra vehículos similares en segundos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
