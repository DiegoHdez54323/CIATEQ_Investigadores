import React, { useEffect, useState } from "react";

interface Evento {
  id?: number;
  tipo_evento: number;
  nombre: string;
  lugar: string;
  fecha: string;
  duracion: number;
  empresa_invita: string;
  // Este campo es read-only y viene de la API, no se editará en el formulario
  tipo_evento_descripcion?: string;
}

interface TipoEvento {
  id: number;
  descripcion: string;
}

interface EventosFormProps {
  evento: Evento | null;
  onClose: () => void;
  onSubmit: (data: Partial<Evento>) => void;
  tipoEventos: TipoEvento[];
}

const EventoForm: React.FC<EventosFormProps> = ({
  evento,
  onClose,
  onSubmit,
  tipoEventos,
}) => {
  const [formData, setFormData] = useState<Evento>({
    tipo_evento: tipoEventos.length > 0 ? tipoEventos[0].id : 0,
    nombre: "",
    lugar: "",
    fecha: "",
    duracion: 0,
    empresa_invita: "",
  });

  useEffect(() => {
    if (evento) {
      setFormData(evento);
    } else {
      setFormData({
        tipo_evento: tipoEventos.length > 0 ? tipoEventos[0].id : 0,
        nombre: "",
        lugar: "",
        fecha: "",
        duracion: 0,
        empresa_invita: "",
      });
    }
  }, [evento, tipoEventos]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "tipo_evento" || name === "duracion" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Dropdown para Tipo de Evento */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tipo de Evento
        </label>
        <select
          name="tipo_evento"
          value={formData.tipo_evento}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        >
          {tipoEventos.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.descripcion}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Lugar</label>
        <input
          type="text"
          name="lugar"
          value={formData.lugar}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Fecha</label>
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Duración (días)
        </label>
        <input
          type="number"
          name="duracion"
          value={formData.duracion}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Empresa Invita
        </label>
        <input
          type="text"
          name="empresa_invita"
          value={formData.empresa_invita}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
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

export default EventoForm;
