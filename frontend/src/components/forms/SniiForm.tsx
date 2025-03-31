import React, { useEffect, useState } from "react";

interface Snii {
  id?: number;
  fecha_asignacion: string;
  investigador: number;
  nivel: number;
  // Campos de solo lectura devueltos por la API:
  nombre_investigador?: string;
  nivel_descripcion?: string;
}

interface Investigator {
  id: number;
  nombre: string;
}

interface Nivel {
  id: number;
  descripcion: string;
}

interface SniiFormProps {
  snii: Snii | null;
  onClose: () => void;
  onSubmit: (data: Partial<Snii>) => void;
  investigators: Investigator[];
  niveles: Nivel[];
}

const SniiForm: React.FC<SniiFormProps> = ({
  snii,
  onClose,
  onSubmit,
  investigators,
  niveles,
}) => {
  const [formData, setFormData] = useState<Snii>({
    fecha_asignacion: "",
    investigador: investigators.length > 0 ? investigators[0].id : 0,
    nivel: niveles.length > 0 ? niveles[0].id : 0,
  });

  useEffect(() => {
    if (snii) {
      setFormData(snii);
    } else {
      // Para nuevos, podemos asignar el primer valor de cada lista si existen
      setFormData({
        fecha_asignacion: "",
        investigador: investigators.length > 0 ? investigators[0].id : 0,
        nivel: niveles.length > 0 ? niveles[0].id : 0,
      });
    }
  }, [snii, investigators, niveles]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "investigador" || name === "nivel" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fecha Asignación
        </label>
        <input
          type="date"
          name="fecha_asignacion"
          value={formData.fecha_asignacion}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
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
          {investigators.map((inv) => (
            <option key={inv.id} value={inv.id}>
              {inv.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nivel SNII
        </label>
        <select
          name="nivel"
          value={formData.nivel}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        >
          {niveles.map((niv) => (
            <option key={niv.id} value={niv.id}>
              {niv.descripcion}
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

export default SniiForm;
