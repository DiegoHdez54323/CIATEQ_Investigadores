import React, { useEffect, useState } from "react";

interface DetLineas {
  id?: number;
  investigador: number;
  linea: number;
  // Campos read-only devueltos por la API:
  nombre_investigador?: string;
  descripcion_linea?: string;
}

interface Investigador {
  id: number;
  nombre: string;
}

interface Linea {
  id: number;
  descripcion: string;
}

interface DetLineasFormProps {
  detLineas: DetLineas | null;
  onClose: () => void;
  onSubmit: (data: Partial<DetLineas>) => void;
  investigadores: Investigador[];
  lineas: Linea[];
}

const DetLineasForm: React.FC<DetLineasFormProps> = ({
  detLineas,
  onClose,
  onSubmit,
  investigadores,
  lineas,
}) => {
  const [formData, setFormData] = useState<DetLineas>({
    investigador: investigadores.length > 0 ? investigadores[0].id : 0,
    linea: lineas.length > 0 ? lineas[0].id : 0,
  });

  useEffect(() => {
    if (detLineas) {
      setFormData(detLineas);
    } else {
      setFormData({
        investigador: investigadores.length > 0 ? investigadores[0].id : 0,
        linea: lineas.length > 0 ? lineas[0].id : 0,
      });
    }
  }, [detLineas, investigadores, lineas]);

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
      {/* Dropdown para seleccionar Investigador */}
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

      {/* Dropdown para seleccionar Línea */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Línea</label>
        <select
          name="linea"
          value={formData.linea}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        >
          {lineas.map((l) => (
            <option key={l.id} value={l.id}>
              {l.descripcion}
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

export default DetLineasForm;
