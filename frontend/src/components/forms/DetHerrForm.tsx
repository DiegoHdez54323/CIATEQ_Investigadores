// src/components/forms/DetHerrForm.tsx
import React, { useEffect, useState } from "react";

interface DetHerr {
  id?: number;
  proyecto: number;
  herramienta: number;
  // Campos read-only devueltos por la API:
  nombre_proyecto?: string;
  descripcion_herramienta?: string;
}

interface Proyecto {
  id: number;
  nombre: string;
}

interface Herramienta {
  id: number;
  descripcion: string;
}

interface DetHerrFormProps {
  detHerr: DetHerr | null;
  onClose: () => void;
  onSubmit: (data: Partial<DetHerr>) => void;
  proyectos: Proyecto[];
  herramientas: Herramienta[];
}

const DetHerrForm: React.FC<DetHerrFormProps> = ({
  detHerr,
  onClose,
  onSubmit,
  proyectos,
  herramientas,
}) => {
  const [formData, setFormData] = useState<DetHerr>({
    proyecto: proyectos.length > 0 ? proyectos[0].id : 0,
    herramienta: herramientas.length > 0 ? herramientas[0].id : 0,
  });

  useEffect(() => {
    if (detHerr) {
      setFormData(detHerr);
    } else {
      setFormData({
        proyecto: proyectos.length > 0 ? proyectos[0].id : 0,
        herramienta: herramientas.length > 0 ? herramientas[0].id : 0,
      });
    }
  }, [detHerr, proyectos, herramientas]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      {/* Dropdown para Herramienta */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Herramienta
        </label>
        <select
          name="herramienta"
          value={formData.herramienta}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        >
          {herramientas.map((herr) => (
            <option key={herr.id} value={herr.id}>
              {herr.descripcion}
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

export default DetHerrForm;
