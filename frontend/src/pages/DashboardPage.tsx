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
import MetricCard from "../components/MetricCard";
import QuickLinkCard from "../components/QuickLinkCard";

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
  // verifica si la sesion está iniciada, si no redirige a login
  const isLoggedIn =
    localStorage.getItem("loggedUser") || sessionStorage.getItem("tempUser");
  if (!isLoggedIn) {
    alert("Inicia sesión para acceder a esta página.");
    window.location.href = "/login"; // Redirigir a otra página
  }

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
            <MetricCard
              title="Investigadores"
              value={data?.investigadores ?? 0}
              icon={<Users className="w-6 h-6" />}
            />
            <MetricCard
              title="Proyectos (Totales)"
              value={data?.proyectos_total ?? 0}
              icon={<BarChart3 className="w-6 h-6" />}
            />
            <MetricCard
              title="Proyectos este año"
              value={data?.proyectos_este_anio ?? 0}
              icon={<BarChart3 className="w-6 h-6" />}
            />
            <MetricCard
              title="Artículos este año"
              value={data?.articulos_este_anio ?? 0}
              icon={<Newspaper className="w-6 h-6" />}
            />
            <MetricCard
              title="Artículos este mes"
              value={data?.articulos_este_mes ?? 0}
              icon={<FileText className="w-6 h-6" />}
            />
            <MetricCard
              title="Estudiantes"
              value={data?.estudiantes ?? 0}
              icon={<GraduationCap className="w-6 h-6" />}
            />
            <MetricCard
              title="Est. terminan este año"
              value={data?.estudiantes_terminan_este_anio ?? 0}
              icon={<GraduationCap className="w-6 h-6" />}
            />
            <MetricCard
              title="Eventos totales"
              value={data?.eventos_total ?? 0}
              icon={<Calendar className="w-6 h-6" />}
            />
            <MetricCard
              title="Eventos este año"
              value={data?.eventos_este_anio ?? 0}
              icon={<Calendar className="w-6 h-6" />}
            />
            <MetricCard
              title="Eventos próximos"
              value={data?.eventos_proximos ?? 0}
              icon={<Calendar className="w-6 h-6" />}
            />
          </div>
        )}

        {/* Accesos rápidos */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Accesos rápidos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuickLinkCard
              to="/investigadores"
              title="Investigadores"
              description="Gestiona los investigadores registrados."
            />
            <QuickLinkCard
              to="/proyectos"
              title="Proyectos"
              description="Administra y consulta los proyectos."
            />
            <QuickLinkCard
              to="/articulos"
              title="Artículos"
              description="Revisa los artículos publicados."
            />
            <QuickLinkCard
              to="/eventos"
              title="Eventos"
              description="Gestiona los eventos registrados."
            />
            <QuickLinkCard
              to="/estudiantes"
              title="Estudiantes"
              description="Consulta y administra estudiantes."
            />
            <QuickLinkCard
              to="/snii"
              title="Snii"
              description="Consulta el registro Snii."
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
