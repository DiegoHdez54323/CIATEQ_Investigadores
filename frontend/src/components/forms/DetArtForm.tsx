import React, { useEffect, useState } from "react";

interface DetArt {
  id?: number;
  investigador: number;
  articulo: number;
  es_principal: boolean;
  // Estos campos son read-only y se muestran en la lista, no se editan aquí.
  nombre_investigador?: string;
  nombre_articulo?: string;
}

interface Investigador {
  id: number;
  nombre: string;
}

interface Articulo {
  id: number;
  nombre: string;
}

interface DetArtFormProps {
  detArt: DetArt | null;
  onClose: () => void;
  onSubmit: (data: Partial<DetArt>) => void;
  investigadores: Investigador[];
  articulos: Articulo[];
}

const DetArtForm: React.FC<DetArtFormProps> = ({
  detArt,
  onClose,
  onSubmit,
  investigadores,
  articulos,
}) => {
  const [formData, setFormData] = useState<DetArt>({
    investigador: investigadores.length > 0 ? investigadores[0].id : 0,
    articulo: articulos.length > 0 ? articulos[0].id : 0,
    es_principal: false,
  });

  useEffect(() => {
    if (detArt) {
      setFormData(detArt);
    } else {
      setFormData({
        investigador: investigadores.length > 0 ? investigadores[0].id : 0,
        articulo: articulos.length > 0 ? articulos[0].id : 0,
        es_principal: false,
      });
    }
  }, [detArt, investigadores, articulos]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : false;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "investigador" || name === "articulo"
          ? parseInt(value)
          : value,
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

      {/* Dropdown para Artículo */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Artículo
        </label>
        <select
          name="articulo"
          value={formData.articulo}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        >
          {articulos.map((art) => (
            <option key={art.id} value={art.id}>
              {art.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Checkbox para Es Principal */}
      <div className="flex items-center">
        <input
          type="checkbox"
          name="es_principal"
          checked={formData.es_principal}
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

export default DetArtForm;
