import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import ciateq from "../assets/ciateq.png";
import {
  Users,
  BarChart3,
  FileText,
  GraduationCap,
  Calendar,
  Newspaper,
} from "lucide-react";

interface DashboardData {
  investigadores: number;
  proyectos_total: number;
  proyectos_este_anio: number;
  articulos_este_anio: number;
  articulos_este_mes: number;
  estudiantes: number;
  estudiantes_terminan_este_anio: number;
  eventos_total: number;
  eventos_proximos: number;
  eventos_este_anio: number;
}

const DashboardPage: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/gestion/api/dashboard/")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar el dashboard:", err);
        setLoading(false);
      });
  }, []);

  const metricCard = (
    title: string,
    value: number | string,
    icon: React.ReactNode
  ) => (
    <div className="bg-white rounded-2xl shadow-md p-5 flex items-center justify-between">
      <div>
        <h4 className="text-sm text-gray-500 font-semibold">{title}</h4>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <div className="text-indigo-700 bg-indigo-100 p-2 rounded-full">
        {icon}
      </div>
    </div>
  );

  return (
    <Layout title="Dashboard">
      <div className="p-6 space-y-8">
        {/* Encabezado */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Bienvenido al Panel de Administración
          </h1>
          <img
            src={ciateq}
            alt="CIATEQ Logo"
            className="mx-auto mt-4 w-48 h-auto"
          />
        </div>

        {/* Métricas principales */}
        {loading ? (
          <p className="text-center text-gray-500">Cargando métricas...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metricCard(
              "Investigadores",
              data?.investigadores ?? 0,
              <Users className="w-6 h-6" />
            )}
            {metricCard(
              "Proyectos (Totales)",
              data?.proyectos_total ?? 0,
              <BarChart3 className="w-6 h-6" />
            )}
            {metricCard(
              "Proyectos este año",
              data?.proyectos_este_anio ?? 0,
              <BarChart3 className="w-6 h-6" />
            )}
            {metricCard(
              "Artículos este año",
              data?.articulos_este_anio ?? 0,
              <Newspaper className="w-6 h-6" />
            )}
            {metricCard(
              "Artículos este mes",
              data?.articulos_este_mes ?? 0,
              <FileText className="w-6 h-6" />
            )}
            {metricCard(
              "Estudiantes",
              data?.estudiantes ?? 0,
              <GraduationCap className="w-6 h-6" />
            )}
            {metricCard(
              "Est. terminan este año",
              data?.estudiantes_terminan_este_anio ?? 0,
              <GraduationCap className="w-6 h-6" />
            )}
            {metricCard(
              "Eventos totales",
              data?.eventos_total ?? 0,
              <Calendar className="w-6 h-6" />
            )}
            {metricCard(
              "Eventos este año",
              data?.eventos_este_anio ?? 0,
              <Calendar className="w-6 h-6" />
            )}
            {metricCard(
              "Eventos próximos",
              data?.eventos_proximos ?? 0,
              <Calendar className="w-6 h-6" />
            )}
          </div>
        )}

        {/* Accesos rápidos */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Accesos rápidos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/investigadores">
              <div className="bg-white shadow-lg rounded-xl p-5 hover:bg-indigo-50 transition-colors cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-700">
                  Investigadores
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Gestiona los investigadores registrados.
                </p>
              </div>
            </Link>
            <Link to="/proyectos">
              <div className="bg-white shadow-lg rounded-xl p-5 hover:bg-indigo-50 transition-colors cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-700">
                  Proyectos
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Administra y consulta los proyectos.
                </p>
              </div>
            </Link>
            <Link to="/articulos">
              <div className="bg-white shadow-lg rounded-xl p-5 hover:bg-indigo-50 transition-colors cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-700">
                  Artículos
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Revisa los artículos publicados.
                </p>
              </div>
            </Link>
            <Link to="/eventos">
              <div className="bg-white shadow-lg rounded-xl p-5 hover:bg-indigo-50 transition-colors cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-700">Eventos</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Gestiona los eventos registrados.
                </p>
              </div>
            </Link>
            <Link to="/estudiantes">
              <div className="bg-white shadow-lg rounded-xl p-5 hover:bg-indigo-50 transition-colors cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-700">
                  Estudiantes
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Consulta y administra estudiantes.
                </p>
              </div>
            </Link>
            <Link to="/snii">
              <div className="bg-white shadow-lg rounded-xl p-5 hover:bg-indigo-50 transition-colors cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-700">Snii</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Consulta el registro Snii.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
