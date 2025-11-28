export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <h3 className="text-xl font-bold">AutoHub Premium</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Tu concesionario de confianza con tecnología de búsqueda visual
              inteligente.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Inicio
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Catálogo
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Sobre nosotros
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Blog
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>📞 +57 (321) 234-2356</li>
              <li>📧 info@autohub.com</li>
              <li>📍 Autopista Simón Bolívar, Cali</li>
              <li>🕐 Lun - Sáb: 8:00 - 18:00</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Tecnología</h4>
            <p className="text-gray-400 text-sm mb-2">
              Búsqueda visual potenciada por:
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-900 rounded-full text-xs">
                CBIR
              </span>
              <span className="px-3 py-1 bg-blue-900 rounded-full text-xs">
                HSV+LBP
              </span>
              <span className="px-3 py-1 bg-blue-900 rounded-full text-xs">
                GrabCut
              </span>
              <span className="px-3 py-1 bg-blue-900 rounded-full text-xs">
                Computer Vision
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>
            © 2025 AutoHub Premium. Desarrollado por William & Juan. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
