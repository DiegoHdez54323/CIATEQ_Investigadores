import React from "react";

const Menu = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            CIATEQ Investigadores
          </h1>
        </div>
      </header>

      {/* Menú de navegación */}
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex space-x-4">
              <a
                href="#"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Investigadores
              </a>
              <a
                href="#"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Registrar SNII
              </a>
              <a
                href="#"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Lineas
              </a>
              <a
                href="#"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Articulos
              </a>
              <a
                href="#"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Eventos
              </a>
              <a
                href="#"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                Proyectos
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="p-8">
        {/* Aquí se mostrará el contenido según la opción seleccionada */}
        <p className="text-gray-700">
          Selecciona una opción del menú para ver el contenido correspondiente.
        </p>
      </main>
    </div>
  );
};

export default Menu;
