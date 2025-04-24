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
import { ProfileDetailsCard } from "../components/InvestigadorProfile/ProfileDetailsCard";
import { OverviewTab } from "../components/InvestigadorProfile/OverviewTab";
import { ArticlesTab } from "../components/InvestigadorProfile/ArticlesTab";
import { ProjectsTab } from "../components/InvestigadorProfile/ProjectsTab";
import { StudentsTab } from "../components/InvestigadorProfile/StudentsTab";
import { EventsTab } from "../components/InvestigadorProfile/EventsTab";

// sampleData para las pestañas mientras se implementan

type Tab = "overview" | "articles" | "projects" | "students" | "events";

interface InvestigatorData {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  titulo: string | null;
  ubicacion: string | null;
  avatar_url: string | null;
  bio: string | null;
  articles_count: number;
  projects_count: number;
  students_count: number;
  events_count: number;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
}

// Este Article coincide con lo que espera ArticlesTab
interface Article {
  id: string;
  title: string;
  journal: string;
  year: string;
  citations: number;
  abstract: string;
  doi: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  funding: string; // coincide con p.funding
  period: string;
  status: string;
}

export const InvestigadoresProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const [investData, setInvestData] = useState<InvestigatorData | null>(null);
  const [sniiDesc, setSniiDesc] = useState("");
  const [areas, setAreas] = useState<string[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
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
      setEducation(
        Array.isArray(eduArr)
          ? eduArr.map((e: any) => ({
              degree: e.grado,
              institution: e.institucion,
              year: String(e.anio), // ahora string
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
                id: String(art.id), // string aquí
                title: art.nombre,
                journal: art.nombre_revista,
                year: String(art.anio_publicacion), // string aquí
                citations: art.citados,
                abstract: art.resumen ?? "",
                doi: art.doi ?? "", // siempre string
              }))
          )
        )
      )
      .then(setArticles);

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
                funding: proj.ingresos, // usamos el campo ingresos
                period: `${proj.fecha_inicio} – ${proj.fecha_termino}`,
                status: proj.status,
              }))
          )
        )
      )
      .then(setProjects);

    Promise.all([general, artFetch, projFetch])
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

  const metrics = {
    articles: investData.articles_count,
    projects: investData.projects_count,
    students: investData.students_count,
    events: investData.events_count,
  };

  return (
    <Layout title={`Perfil – ${investData.nombre} ${investData.apellido}`}>
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          <ProfileGeneralCard
            name={`${investData.nombre} ${investData.apellido}`}
            title={investData.titulo ?? ""}
            department={investData.ubicacion ?? ""}
            snii={sniiDesc}
            area={areas.join(", ")}
            email={investData.correo}
            phone={investData.telefono}
            location={investData.ubicacion ?? ""}
            avatarUrl={investData.avatar_url ?? "/placeholder.svg"}
            onContact={() => {}}
          />
          <ProfileDetailsCard
            bio={investData.bio ?? ""}
            metrics={metrics}
            expertise={areas}
            education={education}
          />
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as Tab)}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab
              articles={articles}
              projects={projects}
              onViewAllArticles={() => setActiveTab("articles")}
              onViewAllProjects={() => setActiveTab("projects")}
            />
          </TabsContent>

          <TabsContent value="articles">
            <ArticlesTab articles={articles} />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsTab projects={projects} />
          </TabsContent>

          {/* <TabsContent value="students">
            <StudentsTab
              students={researcher.students}
              onViewProfile={(sid) => navigate(`/investigadores/${sid}`)}
            />
          </TabsContent>

          <TabsContent value="events">
            <EventsTab events={researcher.events} />
          </TabsContent> */}
        </Tabs>
      </div>
    </Layout>
  );
};

export default InvestigadoresProfilePage;
