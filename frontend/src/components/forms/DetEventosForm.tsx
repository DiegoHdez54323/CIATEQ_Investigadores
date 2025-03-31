// src/components/forms/DetEventosForm.tsx
import React, { useEffect, useState } from "react";

interface DetEventos {
  id?: number;
  investigador: number;
  evento: number;
  // Campos read-only (devueltos por la API)
  nombre_investigador?: string;
  nombre_evento?: string;
}

interface Investigador {
  id: number;
  nombre: string;
}

interface Evento {
  id: number;
  nombre: string;
}

interface DetEventosFormProps {
  detEventos: DetEventos | null;
  onClose: () => void;
  onSubmit: (data: Partial<DetEventos>) => void;
  investigadores: Investigador[];
  eventos: Evento[];
}

const DetEventosForm: React.FC<DetEventosFormProps> = ({
  detEventos,
  onClose,
  onSubmit,
  investigadores,
  eventos,
}) => {
  const [formData, setFormData] = useState<DetEventos>({
    investigador: investigadores.length > 0 ? investigadores[0].id : 0,
    evento: eventos.length > 0 ? eventos[0].id : 0,
  });

  useEffect(() => {
    if (detEventos) {
      setFormData(detEventos);
    } else {
      setFormData({
        investigador: investigadores.length > 0 ? investigadores[0].id : 0,
        evento: eventos.length > 0 ? eventos[0].id : 0,
      });
    }
  }, [detEventos, investigadores, eventos]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Dropdown para Investigador */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Investigador
        </label>
        <select
          name="investigador"
          value={formData.investigador}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        >
          {investigadores.map((inv) => (
            <option key={inv.id} value={inv.id}>
              {inv.nombre}
            </option>
          ))}
        </select>
      </div>
      {/* Dropdown para Evento */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Evento
        </label>
        <select
          name="evento"
          value={formData.evento}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        >
          {eventos.map((evt) => (
            <option key={evt.id} value={evt.id}>
              {evt.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default DetEventosForm;
