// components/EventsTab.tsx
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
  date: string;
  location: string;
  topic: string;
}

interface EventsTabProps {
  events: Event[];
}

export const EventsTab: React.FC<EventsTabProps> = ({ events }) => (
  <Card>
    <CardHeader>
      <CardTitle>Academic Events</CardTitle>
      <CardDescription>Conferences, workshops, and symposiums</CardDescription>
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
                <span>{e.date}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-indigo-600" />
                <span>{e.location}</span>
              </div>
            </div>
            <p className="text-slate-600">{e.topic}</p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
