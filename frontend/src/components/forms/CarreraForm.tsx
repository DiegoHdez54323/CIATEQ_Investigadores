// src/components/forms/CarreraForm.tsx
import React, { useEffect, useState } from "react";

interface Carrera {
  id?: number;
  nombre: string;
}

interface CarreraFormProps {
  carrera: Carrera | null;
  onClose: () => void;
  onSubmit: (data: Partial<Carrera>) => void;
}

const CarreraForm: React.FC<CarreraFormProps> = ({
  carrera,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Carrera>({ nombre: "" });

  useEffect(() => {
    if (carrera) {
      setFormData(carrera);
    } else {
      setFormData({ nombre: "" });
    }
  }, [carrera]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

export default CarreraForm;
