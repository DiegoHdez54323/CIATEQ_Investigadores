import React, { useEffect, useState } from "react";

interface Linea {
  id?: number;
  descripcion: string;
}

interface LineaFormProps {
  linea: Linea | null;
  onClose: () => void;
  onSubmit: (data: Partial<Linea>) => void;
}

const LineaForm: React.FC<LineaFormProps> = ({ linea, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<Linea>({
    descripcion: "",
  });

  useEffect(() => {
    if (linea) {
      setFormData(linea);
    } else {
      setFormData({ descripcion: "" });
    }
  }, [linea]);

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
          Descripción
        </label>
        <input
          type="text"
          name="descripcion"
          value={formData.descripcion}
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

export default LineaForm;
