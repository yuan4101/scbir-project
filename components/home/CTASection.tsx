export function CTASection() {
  return (
    <section className="bg-linear-to-r from-blue-600 to-indigo-600 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          ¿No encuentras lo que buscas?
        </h2>
        <p className="text-xl text-blue-100 mb-6">
          Contáctanos y te ayudaremos a encontrar el vehículo perfecto para ti
        </p>
        <span className="cursor-pointer px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-xl transition-all">
          Hablar con un asesor
        </span>
      </div>
    </section>
  );
}
