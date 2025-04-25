import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/Card";
import { Button } from "../ui/Button";
import { FileText, Calendar } from "lucide-react";
import { Badge } from "../ui/Badge";

export interface Article {
  id: string;
  title: string;
  journal: string;
  year: string;
  citations: number;
}
export interface Project {
  id: string;
  title: string;
  description: string;
  period: string;
  status: string;
}

interface OverviewTabProps {
  articles: Article[];
  projects: Project[];
  onViewAllArticles: () => void;
  onViewAllProjects: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  articles,
  projects,
  onViewAllArticles,
  onViewAllProjects,
}) => (
  <div className="grid gap-6 md:grid-cols-2">
    {/* Recent Publications */}
    <Card>
      <CardHeader>
        <CardTitle>Publicaciones Recientes</CardTitle>
        <CardDescription>Últimos artículos de investigación.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {articles.slice(0, 2).map((a) => (
            <div key={a.id} className="rounded-lg border border-slate-200 p-4">
              <h4 className="font-medium">{a.title}</h4>
              <p className="text-sm text-slate-500">
                {a.journal}, {a.year}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <FileText className="h-3 w-3" />
                <span>Citations: {a.citations}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={onViewAllArticles}
        >
          Ver todas
        </Button>
      </CardFooter>
    </Card>

    {/* Active Projects */}
    <Card>
      <CardHeader>
        <CardTitle>Proyectos Activos</CardTitle>
        <CardDescription>Iniciativas de investigación actuales</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects
            .filter((p) => p.status === "Completado")
            .map((p) => (
              <div
                key={p.id}
                className="rounded-lg border border-slate-200 p-4"
              >
                <h4 className="font-medium">{p.title}</h4>
                <p className="text-sm text-slate-600">{p.description}</p>
                <div className="flex flex-wrap gap-4 text-xs">
                  <div className="flex items-center text-slate-500">
                    <Calendar className="h-3 w-3" />
                    <span>{p.period}</span>
                  </div>
                  <Badge
                    variant={p.status === "Active" ? "secondary" : "outline"}
                  >
                    {p.status}
                  </Badge>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={onViewAllProjects}
        >
          Ver todos
        </Button>
      </CardFooter>
    </Card>
  </div>
);
