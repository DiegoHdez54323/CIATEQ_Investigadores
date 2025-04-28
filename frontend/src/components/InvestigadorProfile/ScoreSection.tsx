// src/components/InvestigadorProfile/ScoreSection.tsx
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ScoreDetalle {
  total: number;
  detalle: any[];
}

export interface ScoreData {
  score_estudiantes: ScoreDetalle;
  score_lineas: ScoreDetalle;
  score_proyectos: ScoreDetalle;
  score_articulos: ScoreDetalle;
  score_materias: ScoreDetalle;
  score_eventos: ScoreDetalle;
  score_total: number;
}

interface ScoreSectionProps {
  data: ScoreData;
  loading: boolean;
}

type DetailKey =
  | "estudiantes"
  | "lineas"
  | "proyectos"
  | "articulos"
  | "materias"
  | "eventos"
  | null;

export const ScoreSection: React.FC<ScoreSectionProps> = ({
  data,
  loading,
}) => {
  const [selectedDetail, setSelectedDetail] = useState<DetailKey>(null);

  if (loading) {
    return <div className="p-4 text-center">Cargando puntuación…</div>;
  }

  const mainChartData = [
    { criterio: "Estudiantes", puntos: data.score_estudiantes.total },
    { criterio: "Líneas", puntos: data.score_lineas.total },
    { criterio: "Proyectos", puntos: data.score_proyectos.total },
    { criterio: "Artículos", puntos: data.score_articulos.total },
    { criterio: "Materias", puntos: data.score_materias.total },
    { criterio: "Eventos", puntos: data.score_eventos.total },
  ];

  // Detalle de Estudiantes
  const StudentDetailChart: React.FC = () => {
    const chartData = data.score_estudiantes.detalle.map((d) => ({
      label: `${d.tipo} – ${d.status}`,
      puntos: d.puntos,
    }));
    return (
      <div className="mt-8 w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 50 }}
          >
            <defs>
              <linearGradient id="gradDetail" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34D399" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#e5e7eb"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: "#4b5563" }}
              angle={-45}
              textAnchor="end"
            />
            <YAxis tick={{ fontSize: 12, fill: "#4b5563" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                border: "none",
              }}
              cursor={{ fill: "rgba(99,102,241,0.1)" }}
            />
            <Bar
              dataKey="puntos"
              fill="url(#gradDetail)"
              radius={[8, 8, 0, 0]}
              barSize={120}
              isAnimationActive
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // Detalle Líneas
  const LineasDetailChart: React.FC = () => {
    const chartData = data.score_lineas.detalle.map((d) => ({
      label: d.descripcion,
      puntos: d.puntos,
    }));
    return (
      <div className="mt-8 w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
          >
            <defs>
              <linearGradient id="gradLineas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FACC15" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#F97316" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#e5e7eb"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: "#4b5563" }}
              angle={-45}
              textAnchor="end"
            />
            <YAxis tick={{ fontSize: 12, fill: "#4b5563" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                border: "none",
              }}
              cursor={{ fill: "rgba(250,204,21,0.1)" }}
            />
            <Bar
              dataKey="puntos"
              fill="url(#gradLineas)"
              radius={[8, 8, 0, 0]}
              barSize={30}
              isAnimationActive
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // Detalle Proyectos
  const ProyectosDetailChart: React.FC = () => {
    const chartData = data.score_proyectos.detalle.map((d) => ({
      label: d.nombre,
      puntos: d.puntos,
    }));
    return (
      <div className="mt-8 w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
          >
            <defs>
              <linearGradient id="gradProyectos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F472B6" stopOpacity={0.8} />{" "}
                {/* rosa-500 */}
                <stop
                  offset="100%"
                  stopColor="#8B5CF6"
                  stopOpacity={0.6}
                />{" "}
                {/* violet-500 */}
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#e5e7eb"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: "#4b5563" }}
              angle={-45}
              textAnchor="end"
            />
            <YAxis tick={{ fontSize: 12, fill: "#4b5563" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                border: "none",
              }}
              cursor={{ fill: "rgba(244,114,182,0.1)" }}
            />
            <Bar
              dataKey="puntos"
              fill="url(#gradProyectos)"
              radius={[8, 8, 0, 0]}
              barSize={30}
              isAnimationActive
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // Detalle Artículos
  const ArticulosDetailChart: React.FC = () => {
    const chartData = data.score_articulos.detalle.map((d) => ({
      label: d.status + (d.es_principal ? " (Principal)" : ""),
      puntos: d.puntos,
    }));
    return (
      <div className="mt-8 w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
          >
            <defs>
              <linearGradient id="gradArticulos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FB923C" stopOpacity={0.8} />{" "}
                {/* naranja */}
                <stop
                  offset="100%"
                  stopColor="#EF4444"
                  stopOpacity={0.6}
                />{" "}
                {/* rojo */}
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#e5e7eb"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: "#4b5563" }}
              angle={-45}
              textAnchor="end"
            />
            <YAxis tick={{ fontSize: 12, fill: "#4b5563" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                border: "none",
              }}
              cursor={{ fill: "rgba(251,146,60,0.1)" }}
            />
            <Bar
              dataKey="puntos"
              fill="url(#gradArticulos)"
              radius={[8, 8, 0, 0]}
              barSize={30}
              isAnimationActive
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const MateriasDetailChart = () => {
    const chartData = data.score_materias.detalle.map((d) => ({
      label: d.nombre,
      puntos: d.puntos,
    }));
    return (
      <div className="mt-8 w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
          >
            <defs>
              <linearGradient id="gradMaterias" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5EEAD4" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#e5e7eb"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: "#4b5563" }}
              angle={-45}
              textAnchor="end"
            />
            <YAxis tick={{ fontSize: 12, fill: "#4b5563" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                border: "none",
              }}
              cursor={{ fill: "rgba(94,234,212,0.1)" }}
            />
            <Bar
              dataKey="puntos"
              fill="url(#gradMaterias)"
              radius={[8, 8, 0, 0]}
              barSize={30}
              isAnimationActive
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const EventosDetailChart = () => {
    const chartData = data.score_eventos.detalle.map((d) => ({
      label: `${d.tipo}: ${d.nombre}`,
      puntos: d.puntos,
    }));
    return (
      <div className="mt-8 w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
          >
            <defs>
              <linearGradient id="gradEventos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F87171" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#EF4444" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#e5e7eb"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: "#4b5563" }}
              angle={-45}
              textAnchor="end"
            />
            <YAxis tick={{ fontSize: 12, fill: "#4b5563" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                border: "none",
              }}
              cursor={{ fill: "rgba(248,113,113,0.1)" }}
            />
            <Bar
              dataKey="puntos"
              fill="url(#gradEventos)"
              radius={[8, 8, 0, 0]}
              barSize={30}
              isAnimationActive
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">
        Puntuación del investigador
      </h2>

      {/* ——— Puntuación Total ——— */}
      <div className="mb-6">
        <div className="bg-indigo-200 p-6 rounded-xl text-center shadow-lg">
          <div className="text-base font-medium text-indigo-800">
            Puntuación Total
          </div>
          <div className="text-4xl font-extrabold text-indigo-900 mt-2">
            {data.score_total}
          </div>
        </div>
      </div>

      {/* ——— KPIs secundarios como botones ——— */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Estudiantes */}
        <button
          onClick={() => setSelectedDetail("estudiantes")}
          className={`transition transform hover:scale-105 focus:ring-2 focus:ring-blue-400
            ${selectedDetail === "estudiantes" ? "ring-2 ring-blue-500" : ""}
          bg-blue-100 p-4 rounded-lg text-center`}
        >
          <div className="text-sm font-medium text-blue-600">Estudiantes</div>
          <div className="text-2xl font-bold">
            {data.score_estudiantes.total}
          </div>
        </button>

        {/* Lineas */}
        <button
          onClick={() => setSelectedDetail("lineas")}
          className={`transition transform hover:scale-105 focus:ring-2 focus:ring-green-400
            ${selectedDetail === "lineas" ? "ring-2 ring-green-500" : ""}
            bg-green-100 p-4 rounded-lg text-center`}
        >
          <div className="text-sm font-medium text-green-600">Líneas</div>
          <div className="text-2xl font-bold">{data.score_lineas.total}</div>
        </button>

        {/* Proyectos */}
        <button
          onClick={() => setSelectedDetail("proyectos")}
          className={`transition transform hover:scale-105 focus:ring-2 focus:ring-yellow-400
            ${selectedDetail === "proyectos" ? "ring-2 ring-yellow-500" : ""}
            bg-yellow-100 p-4 rounded-lg text-center`}
        >
          <div className="text-sm font-medium text-yellow-600">Proyectos</div>
          <div className="text-2xl font-bold">{data.score_proyectos.total}</div>
        </button>

        {/* Artículos */}
        <button
          onClick={() => setSelectedDetail("articulos")}
          className={`transition transform hover:scale-105 focus:ring-2 focus:ring-purple-400
            ${selectedDetail === "articulos" ? "ring-2 ring-purple-500" : ""}
            bg-purple-100 p-4 rounded-lg text-center`}
        >
          <div className="text-sm font-medium text-purple-600">Artículos</div>
          <div className="text-2xl font-bold">{data.score_articulos.total}</div>
        </button>

        {/* Materias */}
        <button
          onClick={() => setSelectedDetail("materias")}
          className={`transition transform hover:scale-105 focus:ring-2 focus:ring-teal-400 ${
            selectedDetail === "materias" ? "ring-2 ring-teal-500" : ""
          } bg-teal-100 p-4 rounded-lg text-center`}
        >
          <div className="text-sm font-medium text-teal-600">Materias</div>
          <div className="text-2xl font-bold">{data.score_materias.total}</div>
        </button>

        {/* Eventos */}
        <button
          onClick={() => setSelectedDetail("eventos")}
          className={`transition transform hover:scale-105 focus:ring-2 focus:ring-red-400 ${
            selectedDetail === "eventos" ? "ring-2 ring-red-500" : ""
          } bg-red-100 p-4 rounded-lg text-center`}
        >
          <div className="text-sm font-medium text-red-600">Eventos</div>
          <div className="text-2xl font-bold">{data.score_eventos.total}</div>
        </button>
      </div>

      {/* ——— Gráfico general ——— */}
      <div className="mt-8 w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={mainChartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="gradMain" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#EC4899" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#e5e7eb"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="criterio"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#4b5563", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#4b5563", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: 8,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "none",
              }}
              cursor={{ fill: "rgba(99,102,241,0.1)" }}
            />
            <Bar
              dataKey="puntos"
              fill="url(#gradMain)"
              radius={[8, 8, 0, 0]}
              barSize={120}
              isAnimationActive
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ——— Grafico condicional ——— */}
      {selectedDetail === "estudiantes" && <StudentDetailChart />}
      {selectedDetail === "lineas" && <LineasDetailChart />}
      {selectedDetail === "proyectos" && <ProyectosDetailChart />}
      {selectedDetail === "articulos" && <ArticulosDetailChart />}
      {selectedDetail === "materias" && <MateriasDetailChart />}
      {selectedDetail === "eventos" && <EventosDetailChart />}
    </div>
  );
};
