import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/Card";
import { Button } from "../ui/Button";
import {
  BookOpen,
  Calendar,
  FileText,
  ExternalLink,
  Download,
} from "lucide-react";

export interface Article {
  id: string;
  title: string;
  journal: string;
  year: string;
  citations: number;
  abstract: string;
  doi: string;
}

interface ArticlesTabProps {
  articles: Article[];
}

export const ArticlesTab: React.FC<ArticlesTabProps> = ({ articles }) => (
  <Card>
    <CardHeader className="flex items-center justify-between">
      <CardTitle>Articulos Publicados</CardTitle>
      <CardDescription>
        Publicaciones y artículos de investigación
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        {articles.map((a) => (
          <div key={a.id} className="rounded-lg border border-slate-200 p-5">
            <h3 className="font-medium">{a.title}</h3>
            <div className="flex flex-wrap gap-6 text-sm mb-2">
              <div className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4 text-indigo-600" />
                <span>{a.journal}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-indigo-600" />
                <span>{a.year}</span>
              </div>
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-indigo-600" />
                <span>Citations: {a.citations}</span>
              </div>
            </div>
            <p className="text-slate-600 mb-4">{a.abstract}</p>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-3 w-3" />
                DOI
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-3 w-3" />
                PDF
              </Button>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
