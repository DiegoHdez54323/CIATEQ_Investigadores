import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { GraduationCap } from "lucide-react";

export interface ProfileDetailsCardProps {
  bio: string;
  metrics: Record<string, number>;
  expertise: string[];
  education: { degree: string; institution: string; year: string }[];
}

export const ProfileDetailsCard: React.FC<ProfileDetailsCardProps> = ({
  bio,
  metrics,
  expertise,
  education,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Biografía</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-slate-600">{bio}</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {Object.entries(metrics).map(([key, val]) => (
          <div
            key={key}
            className="flex flex-col items-center rounded-lg bg-slate-50 p-3"
          >
            <span className="text-2xl font-bold text-indigo-600">{val}</span>
            <span className="text-xs text-slate-500">{key}</span>
          </div>
        ))}
      </div>

      <h3 className="mt-6 text-lg font-semibold">Áreas de Expertise</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {expertise.map((area, i) => (
          <Badge key={i} variant="secondary">
            {area}
          </Badge>
        ))}
      </div>

      <h3 className="mt-6 text-lg font-semibold">Educación</h3>
      <div className="mt-2 space-y-2">
        {education.map((edu, i) => (
          <div key={i} className="flex items-start gap-2">
            <GraduationCap className="text-indigo-600 mt-0.5" />
            <div>
              <p className="font-medium">{edu.degree}</p>
              <p className="text-sm text-slate-500">
                {edu.institution}, {edu.year}
              </p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
