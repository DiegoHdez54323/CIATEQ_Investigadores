// components/StudentsTab.tsx
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export interface Student {
  id: string;
  name: string;
  level: string;
  year: string;
  topic: string;
  status: string;
}

interface StudentsTabProps {
  students: Student[];
  onViewProfile: (id: string) => void;
}

export const StudentsTab: React.FC<StudentsTabProps> = ({
  students,
  onViewProfile,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Supervised Students</CardTitle>
      <CardDescription>Current and former students</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((s) => (
          <div key={s.id} className="rounded-lg border border-slate-200 p-4">
            <div className="flex justify-between mb-3">
              <div>
                <h4 className="font-medium">{s.name}</h4>
                <p className="text-sm text-slate-500">
                  {s.level}, {s.year}
                </p>
              </div>
              <Badge variant={s.status === "Active" ? "secondary" : "outline"}>
                {s.status}
              </Badge>
            </div>
            <p className="text-sm text-slate-700 mb-3">{s.topic}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewProfile(s.id)}
              className="w-full"
            >
              Ver perfil
            </Button>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
