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
  nombre: string;
  escuela: string;
  fecha_inicio: string;
  fecha_termino: string;
  sueldo: string;
  status: string;
  nombre_carrera: string;
  descripcion_tipo_estudiante: string;
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
    <CardHeader className="flex items-center justify-between">
      <CardTitle>Estudiantes Supervisados</CardTitle>
      <CardDescription>Estudiantes actuales y anteriores</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((s) => {
          const name = s.nombre;
          const level = s.descripcion_tipo_estudiante;
          const year = `${s.fecha_inicio} – ${s.fecha_termino}`;
          const topic = s.escuela;
          const carrera = s.nombre_carrera;
          const salario = s.sueldo;
          return (
            <div key={s.id} className="rounded-lg border border-slate-200 p-4">
              <div className="flex justify-between mb-3">
                <div>
                  <h4 className="font-medium">{name}</h4>
                  <p className="text-sm text-slate-500">
                    {level}, {year}
                  </p>
                </div>
                <Badge
                  variant={s.status === "Active" ? "secondary" : "outline"}
                >
                  {s.status}
                </Badge>
              </div>
              <p className="text-sm text-slate-700 mb-1">{topic}</p>
              <p className="text-sm text-slate-700 mb-1">
                <span className="font-medium">Carrera:</span> {carrera}
              </p>
              <p className="text-sm text-slate-700 mb-3">
                <span className="font-medium">Sueldo:</span> ${salario}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => onViewProfile(s.id)}
              >
                Ver perfil
              </Button>
            </div>
          );
        })}
      </div>
    </CardContent>
  </Card>
);
