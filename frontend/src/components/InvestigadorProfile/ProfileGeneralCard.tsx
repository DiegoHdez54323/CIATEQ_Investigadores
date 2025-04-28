import React from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Award, Tag, Mail, Phone, MapPin } from "lucide-react";

export interface ProfileGeneralCardProps {
  nombre: string;
  titulo: string;
  snii: string;
  correo: string;
  telefono: string;
  ubicacion: string;
  avatar?: string;
  onContact?: () => void;
}

export const ProfileGeneralCard: React.FC<ProfileGeneralCardProps> = ({
  nombre,
  titulo,
  snii,
  correo,
  telefono,
  ubicacion,
  avatar,
  onContact,
}) => {
  const src = avatar ? `/avatars/${avatar}` : "/avatars/placeholder.svg";

  return (
    <Card>
      <div className="flex flex-col items-center p-6">
        <img
          src={src}
          alt={nombre}
          className="mb-4 h-40 w-40 rounded-full object-cover"
        />
        <h1 className="text-xl font-bold">{nombre}</h1>
        <p className="text-lg text-slate-600">{titulo}</p>

        <div className="mt-4 w-full space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Award className="text-indigo-600" />
            <span className="font-medium">SNII:</span>
            <span>{snii}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="text-indigo-600" />
            <span>{correo}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="text-indigo-600" />
            <span>{telefono}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-indigo-600" />
            <span>{ubicacion}</span>
          </div>
        </div>

        <Button className="mt-4 w-full" onClick={onContact}>
          Contactar
        </Button>
      </div>
    </Card>
  );
};
