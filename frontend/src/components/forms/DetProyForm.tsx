import React, { useEffect, useState } from "react";

interface DetProy {
  id?: number;
  investigador: number;
  proyecto: number;
  es_principal?: boolean;
  // Campos read-only devueltos por la API:
  nombre_investigador?: string;
  nombre_proyecto?: string;
}

interface Investigador {
  id: number;
  nombre: string;
}

interface Proyecto {
  id: number;
  nombre: string;
}

interface DetProyFormProps {
  detProy: DetProy | null;
  onClose: () => void;
  onSubmit: (data: Partial<DetProy>) => void;
  investigadores: Investigador[];
  proyectos: Proyecto[];
}

const DetProyForm: React.FC<DetProyFormProps> = ({
  detProy,
  onClose,
  onSubmit,
  investigadores,
  proyectos,
}) => {
  const [formData, setFormData] = useState<DetProy>({
    investigador: investigadores.length > 0 ? investigadores[0].id : 0,
    proyecto: proyectos.length > 0 ? proyectos[0].id : 0,
    es_principal: false,
  });

  useEffect(() => {
    if (detProy) {
      setFormData(detProy);
    } else {
      setFormData({
        investigador: investigadores.length > 0 ? investigadores[0].id : 0,
        proyecto: proyectos.length > 0 ? proyectos[0].id : 0,
        es_principal: false,
      });
    }
  }, [detProy, investigadores, proyectos]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : false;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : parseInt(value),
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

      {/* Dropdown para Proyecto */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Proyecto
        </label>
        <select
          name="proyecto"
          value={formData.proyecto}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        >
          {proyectos.map((proy) => (
            <option key={proy.id} value={proy.id}>
              {proy.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Checkbox para Es Principal */}
      <div className="flex items-center">
        <input
          type="checkbox"
          name="es_principal"
          checked={formData.es_principal || false}
          onChange={handleChange}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">Es Principal</label>
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

export default DetProyForm;
