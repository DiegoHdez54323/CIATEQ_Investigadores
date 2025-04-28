import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/Tabs";

import { ProfileGeneralCard } from "../components/InvestigadorProfile/ProfileGeneralCard";
import {
  ProfileDetailsCard,
  Educacion,
} from "../components/InvestigadorProfile/ProfileDetailsCard";
import { OverviewTab } from "../components/InvestigadorProfile/OverviewTab";
import {
  ArticlesTab,
  Article,
} from "../components/InvestigadorProfile/ArticlesTab";
import {
  ProjectsTab,
  Project,
} from "../components/InvestigadorProfile/ProjectsTab";
import {
  StudentsTab,
  Student,
} from "../components/InvestigadorProfile/StudentsTab";
import { EventsTab, Event } from "../components/InvestigadorProfile/EventsTab";

import {
  ScoreSection,
  ScoreData,
} from "../components/InvestigadorProfile/ScoreSection";

type Tab = "overview" | "articulos" | "proyectos" | "estudiantes" | "eventos";

interface InvestigadorData {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  titulo: string | null;
  ubicacion: string | null;
  avatar: string;
  bio: string | null;
  articles_count: number;
  projects_count: number;
  students_count: number;
  events_count: number;
}

export const InvestigadoresProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const [investData, setInvestData] = useState<InvestigadorData | null>(null);
  const [sniiDesc, setSniiDesc] = useState("");
  const [areas, setAreas] = useState<string[]>([]);
  const [educacion, setEducacion] = useState<Educacion[]>([]);
  const [articulos, setArticulos] = useState<Article[]>([]);
  const [proyectos, setProyectos] = useState<Project[]>([]);
  const [estudiantes, setEstudiantes] = useState<Student[]>([]);
  const [eventos, setEventos] = useState<Event[]>([]);

  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [loadingScore, setLoadingScore] = useState<boolean>(true);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    // Datos generales + SNI + líneas + educación
    const general = Promise.all([
      fetch(`http://127.0.0.1:8000/gestion/api/investigadores/${id}/`).then(
        (r) => r.json()
      ),
      fetch(`http://127.0.0.1:8000/gestion/api/snii/?investigador=${id}`).then(
        (r) => r.json()
      ),
      fetch(
        `http://127.0.0.1:8000/gestion/api/detlineas/?investigador=${id}`
      ).then((r) => r.json()),
      fetch(
        `http://127.0.0.1:8000/gestion/api/educacion/?investigador=${id}`
      ).then((r) => r.json()),
    ]).then(([inv, sniiArr, lineasArr, eduArr]) => {
      setInvestData(inv);
      if (Array.isArray(sniiArr) && sniiArr.length) {
        setSniiDesc(sniiArr[0].nivel_descripcion);
      }
      setAreas(
        Array.isArray(lineasArr)
          ? lineasArr.map((l: any) => l.descripcion_linea)
          : []
      );
      setEducacion(
        Array.isArray(eduArr)
          ? eduArr.map((e: any) => ({
              grado: e.grado,
              institucion: e.institucion,
              anio: String(e.anio),
            }))
          : []
      );
    });

    // Artículos: detart + fetch de cada artículo
    const artFetch = fetch(
      `http://127.0.0.1:8000/gestion/api/detart/?investigador=${id}`
    )
      .then((r) => r.json())
      .then((detArr: any[]) =>
        Promise.all(
          detArr.map((det) =>
            fetch(
              `http://127.0.0.1:8000/gestion/api/articulos/${det.articulo}/`
            )
              .then((r) => r.json())
              .then((art) => ({
                id: String(art.id),
                title: art.nombre,
                journal: art.nombre_revista,
                year: String(art.anio_publicacion),
                citations: art.citados,
                abstract: art.resumen ?? "",
                doi: art.doi ?? "",
              }))
          )
        )
      )
      .then(setArticulos);

    // Proyectos: detproy + fetch de cada proyecto
    const projFetch = fetch(
      `http://127.0.0.1:8000/gestion/api/detproy/?investigador=${id}`
    )
      .then((r) => r.json())
      .then((detArr: any[]) =>
        Promise.all(
          detArr.map((det) =>
            fetch(
              `http://127.0.0.1:8000/gestion/api/proyectos/${det.proyecto}/`
            )
              .then((r) => r.json())
              .then((proj) => ({
                id: String(proj.id),
                title: proj.nombre,
                description: proj.descripcion ?? "",
                funding: proj.ingresos,
                period: `${proj.fecha_inicio} – ${proj.fecha_termino}`,
                status: proj.status,
              }))
          )
        )
      )
      .then(setProyectos);

    // 4) estudiantes
    const studentsFetch = fetch(
      `http://127.0.0.1:8000/gestion/api/estudiantes/?investigador=${id}`
    )
      .then((r) => r.json())
      .then((arr: any[]) =>
        arr.map((e) => ({
          id: String(e.id),
          nombre: e.nombre,
          escuela: e.escuela,
          fecha_inicio: e.fecha_inicio,
          fecha_termino: e.fecha_termino,
          sueldo: e.sueldo,
          status: e.status,
          nombre_carrera: e.nombre_carrera,
          descripcion_tipo_estudiante: e.descripcion_tipo_estudiante,
        }))
      )
      .then(setEstudiantes);

    const eventsFetch = fetch(
      `http://127.0.0.1:8000/gestion/api/deteventos/?investigador=${id}`
    )
      .then((r) => r.json())
      .then((detArr: any[]) =>
        Promise.all(
          detArr.map((det) =>
            fetch(`http://127.0.0.1:8000/gestion/api/eventos/${det.evento}/`)
              .then((r) => r.json())
              .then((ev) => ({
                id: String(ev.id),
                name: ev.nombre,
                role: det.rol ?? "",
                asunto: det.asunto ?? "",
                date: ev.fecha,
                location: ev.lugar,
                duracion: ev.duracion,
                empresa_invita: ev.empresa_invita,
                tipo_evento_descripcion: ev.tipo_evento_descripcion,
              }))
          )
        )
      )
      .then(setEventos);

    // Score
    const scoreFetch = fetch(
      `http://127.0.0.1:8000/gestion/api/investigadores/${id}/score/`
    )
      .then((r) => r.json())
      .then(setScoreData)
      .finally(() => setLoadingScore(false));

    Promise.all([
      general,
      artFetch,
      projFetch,
      studentsFetch,
      eventsFetch,
      scoreFetch,
    ])
      .catch((err) => {
        console.error(err);
        setError("Error cargando perfil.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Layout title="Perfil – Cargando...">
        <div className="p-6 text-center">Cargando perfil…</div>
      </Layout>
    );
  }
  if (error || !investData) {
    return (
      <Layout title="Perfil – Error">
        <div className="p-6 text-red-600 text-center">{error}</div>
      </Layout>
    );
  }

  const metricas = {
    Articulos: investData.articles_count,
    Proyectos: investData.projects_count,
    Estudiantes: investData.students_count,
    Eventos: investData.events_count,
  };

  return (
    <Layout title={`Perfil – ${investData.nombre} ${investData.apellido}`}>
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          <ProfileGeneralCard
            nombre={`${investData.nombre} ${investData.apellido}`}
            titulo={investData.titulo ?? ""}
            snii={sniiDesc}
            correo={investData.correo}
            telefono={investData.telefono}
            ubicacion={investData.ubicacion ?? ""}
            avatar={investData.avatar}
            onContact={() => {}}
          />
          <ProfileDetailsCard
            bio={investData.bio ?? ""}
            metricas={metricas}
            lineas={areas}
            educacion={educacion}
          />
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as Tab)}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="articulos">Articulos</TabsTrigger>
            <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
            <TabsTrigger value="estudiantes">Estudiantes</TabsTrigger>
            <TabsTrigger value="eventos">Eventos</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab
              articles={articulos}
              projects={proyectos}
              onViewAllArticles={() => setActiveTab("articulos")}
              onViewAllProjects={() => setActiveTab("proyectos")}
            />
          </TabsContent>

          <TabsContent value="articulos">
            <ArticlesTab articles={articulos} />
          </TabsContent>

          <TabsContent value="proyectos">
            <ProjectsTab projects={proyectos} />
          </TabsContent>

          <TabsContent value="estudiantes">
            <StudentsTab
              students={estudiantes}
              onViewProfile={(sid) => navigate(`/investigadores/${sid}`)}
            />
          </TabsContent>

          <TabsContent value="eventos">
            <EventsTab events={eventos} />
          </TabsContent>
        </Tabs>
        {/* Sección de Score */}
        {scoreData && <ScoreSection data={scoreData} loading={loadingScore} />}
      </div>
    </Layout>
  );
};

export default InvestigadoresProfilePage;
