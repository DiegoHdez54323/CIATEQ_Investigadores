import React, { useEffect, useState } from "react";

interface Investigador {
  id?: number;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  sueldo: number;
}

interface InvestigadorFormProps {
  investigador: Investigador | null;
  onClose: () => void;
  onSubmit: (data: Partial<Investigador>) => void;
}

const InvestigadorForm: React.FC<InvestigadorFormProps> = ({
  investigador,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Investigador>({
    nombre: "",
    apellido: "",
    telefono: "",
    correo: "",
    sueldo: 0,
  });

  useEffect(() => {
    if (investigador) {
      setFormData(investigador);
    } else {
      setFormData({
        nombre: "",
        apellido: "",
        telefono: "",
        correo: "",
        sueldo: 0,
      });
    }
  }, [investigador]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "sueldo" ? parseFloat(value) : value,
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
          Apellido
        </label>
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Correo
        </label>
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Sueldo
        </label>
        <input
          type="number"
          step="0.01"
          name="sueldo"
          value={formData.sueldo}
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

export default InvestigadorForm;
