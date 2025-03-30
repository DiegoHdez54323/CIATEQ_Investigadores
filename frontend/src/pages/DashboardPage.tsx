import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import ciateq from "../assets/ciateq.png";

const DashboardPage: React.FC = () => {
  return (
    <Layout title="Dashboard">
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Bienvenido al Panel de Administración
          </h1>
          <img
            src={ciateq}
            alt="CIATEQ Logo"
            className="mx-auto mt-2 w-48 h-auto"
          />
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/investigadores" className="block">
            <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-indigo-50 transition-colors cursor-pointer">
              <h2 className="text-lg font-semibold text-gray-700">
                Investigadores
              </h2>
              <p className="mt-2 text-gray-500">Gestiona los investigadores.</p>
            </div>
          </Link>
          <Link to="/proyectos" className="block">
            <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-indigo-50 transition-colors cursor-pointer">
              <h2 className="text-lg font-semibold text-gray-700">Proyectos</h2>
              <p className="mt-2 text-gray-500">Administra los proyectos.</p>
            </div>
          </Link>
          <Link to="/snii" className="block">
            <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-indigo-50 transition-colors cursor-pointer">
              <h2 className="text-lg font-semibold text-gray-700">Snii</h2>
              <p className="mt-2 text-gray-500">Consulta el registro Snii.</p>
            </div>
          </Link>
          <Link to="/eventos" className="block">
            <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-indigo-50 transition-colors cursor-pointer">
              <h2 className="text-lg font-semibold text-gray-700">Eventos</h2>
              <p className="mt-2 text-gray-500">Gestiona los eventos.</p>
            </div>
          </Link>
          <Link to="/articulos" className="block">
            <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-indigo-50 transition-colors cursor-pointer">
              <h2 className="text-lg font-semibold text-gray-700">Artículos</h2>
              <p className="mt-2 text-gray-500">Administra los artículos.</p>
            </div>
          </Link>
          <Link to="/estudiantes" className="block">
            <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-indigo-50 transition-colors cursor-pointer">
              <h2 className="text-lg font-semibold text-gray-700">
                Estudiantes
              </h2>
              <p className="mt-2 text-gray-500">Gestiona los estudiantes.</p>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
