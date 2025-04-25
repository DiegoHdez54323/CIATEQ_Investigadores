import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/Card";
import { Users, Calendar, MapPin } from "lucide-react";

export interface Event {
  id: string;
  name: string;
  role: string;
  asunto: string;
  date: string;
  location: string;
  duracion: number;
  empresa_invita: string;
  tipo_evento_descripcion: string;
}

interface EventsTabProps {
  events: Event[];
}

export const EventsTab: React.FC<EventsTabProps> = ({ events }) => (
  <Card>
    <CardHeader className="flex items-center justify-between">
      <CardTitle>Eventos</CardTitle>
      <CardDescription>Conferencias, talleres, simposios, etc.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        {events.map((e) => (
          <div key={e.id} className="rounded-lg border border-slate-200 p-5">
            <h3 className="font-medium mb-2">{e.name}</h3>
            <div className="flex flex-wrap gap-6 text-sm mb-2">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-indigo-600" />
                <span>Role: {e.role}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-indigo-600" />
                <span>Date: {e.date}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-indigo-600" />
                <span>Location: {e.location}</span>
              </div>
            </div>
            <div className="space-y-1 text-sm mb-2">
              <p>
                <span className="font-medium">Duración:</span> {e.duracion} días
              </p>
              <p>
                <span className="font-medium">Empresa invitante:</span>{" "}
                {e.empresa_invita}
              </p>
              <p>
                <span className="font-medium">Tipo de evento:</span>{" "}
                {e.tipo_evento_descripcion}
              </p>
            </div>
            <p className="text-slate-600">
              <span className="font-medium">Asunto:</span> {e.asunto}
            </p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
