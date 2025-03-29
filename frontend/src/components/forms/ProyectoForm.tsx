import React, { useEffect, useState } from "react";

interface Proyecto {
  id?: number;
  nombre: string;
  fecha_inicio: string;
  fecha_termino: string;
  ingresos: number;
}

interface ProyectoFormProps {
  proyecto: Proyecto | null;
  onClose: () => void;
  onSubmit: (data: Partial<Proyecto>) => void;
}

const ProyectoForm: React.FC<ProyectoFormProps> = ({
  proyecto,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Proyecto>({
    nombre: "",
    fecha_inicio: "",
    fecha_termino: "",
    ingresos: 0,
  });

  // Cuando se abre el modal, si es edición llenamos con datos; si no, vaciamos
  useEffect(() => {
    if (proyecto) {
      setFormData(proyecto);
    } else {
      setFormData({
        nombre: "",
        fecha_inicio: "",
        fecha_termino: "",
        ingresos: 0,
      });
    }
  }, [proyecto]);

  // Maneja el cambio de cada campo
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      // Para el campo "ingresos", convertimos a número
      [name]: name === "ingresos" ? parseFloat(value) : value,
    }));
  };

  // Al enviar el formulario, se llama a onSubmit con los datos actuales
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <label className="block text-sm font-medium text-gray-700">
          Fecha Inicio
        </label>
        <input
          type="date"
          name="fecha_inicio"
          value={formData.fecha_inicio}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fecha Término
        </label>
        <input
          type="date"
          name="fecha_termino"
          value={formData.fecha_termino}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ingresos
        </label>
        <input
          type="number"
          step="0.01"
          name="ingresos"
          value={formData.ingresos}
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

export default ProyectoForm;
