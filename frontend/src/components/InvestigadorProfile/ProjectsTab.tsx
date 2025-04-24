// components/ProjectsTab.tsx
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Progress } from "../ui/Progress";

export interface Project {
  id: string;
  title: string;
  description: string;
  funding: string;
  period: string;
  status: string;
}

interface ProjectsTabProps {
  projects: Project[];
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({ projects }) => (
  <Card>
    <CardHeader>
      <CardTitle>Research Projects</CardTitle>
      <CardDescription>Current and past research initiatives</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        {projects.map((p) => (
          <div key={p.id} className="rounded-lg border border-slate-200 p-5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{p.title}</h3>
              <Badge variant={p.status === "Active" ? "secondary" : "outline"}>
                {p.status}
              </Badge>
            </div>
            <p className="text-slate-600 mb-4">{p.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-50 p-3 rounded">
                <p className="text-xs text-slate-500">Funding</p>
                <p className="font-medium">{p.funding}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded">
                <p className="text-xs text-slate-500">Period</p>
                <p className="font-medium">{p.period}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded">
                <p className="text-xs text-slate-500">Completion</p>
                <Progress value={p.status === "Completed" ? 100 : 50} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
