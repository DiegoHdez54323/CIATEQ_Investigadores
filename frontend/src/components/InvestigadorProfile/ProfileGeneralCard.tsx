import React from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Award, Tag, Mail, Phone, MapPin } from "lucide-react";

export interface ProfileGeneralCardProps {
  name: string;
  title: string;
  department: string;
  snii: string;
  area: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl?: string;
  onContact?: () => void;
}

export const ProfileGeneralCard: React.FC<ProfileGeneralCardProps> = ({
  name,
  title,
  department,
  snii,
  area,
  email,
  phone,
  location,
  avatarUrl = "/placeholder.svg",
  onContact,
}) => (
  <Card>
    <div className="flex flex-col items-center p-6">
      <img
        src={avatarUrl}
        alt={name}
        className="mb-4 h-40 w-40 rounded-full object-cover"
      />
      <h1 className="text-xl font-bold">{name}</h1>
      <p className="text-lg text-slate-600">{title}</p>

      <div className="mt-4 w-full space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Award className="text-indigo-600" />
          <span className="font-medium">SNII:</span>
          <span>{snii}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="text-indigo-600" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="text-indigo-600" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="text-indigo-600" />
          <span>{location}</span>
        </div>
      </div>

      <Button className="mt-4 w-full" onClick={onContact}>
        Contactar
      </Button>
    </div>
  </Card>
);
