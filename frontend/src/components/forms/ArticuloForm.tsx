import React, { useState, useEffect } from "react";

interface Articulo {
  id?: number;
  fecha_publicacion: string;
  doi: string | null;
  url: string;
  nombre: string;
  nombre_revista: string;
  pais_publicacion: string | null;
  anio_publicacion: number | null;
}

interface ArticuloFormProps {
  article: Articulo | null;
  onClose: () => void;
  onSubmit: (articleData: Partial<Articulo>) => void;
}

const ArticuloForm: React.FC<ArticuloFormProps> = ({
  article,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Articulo>({
    fecha_publicacion: "",
    doi: "",
    url: "",
    nombre: "",
    nombre_revista: "",
    pais_publicacion: "",
    anio_publicacion: null,
  });

  useEffect(() => {
    if (article) {
      setFormData(article);
    } else {
      setFormData({
        fecha_publicacion: "",
        doi: "",
        url: "",
        nombre: "",
        nombre_revista: "",
        pais_publicacion: "",
        anio_publicacion: null,
      });
    }
  }, [article]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "anio_publicacion"
          ? value === ""
            ? null
            : parseInt(value)
          : value,
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
          Fecha Publicación
        </label>
        <input
          type="date"
          name="fecha_publicacion"
          value={formData.fecha_publicacion}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">DOI</label>
        <input
          type="text"
          name="doi"
          value={formData.doi || ""}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">URL</label>
        <input
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre Revista
        </label>
        <input
          type="text"
          name="nombre_revista"
          value={formData.nombre_revista}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          País Publicación
        </label>
        <input
          type="text"
          name="pais_publicacion"
          value={formData.pais_publicacion || ""}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Año Publicación
        </label>
        <input
          type="number"
          name="anio_publicacion"
          value={
            formData.anio_publicacion !== null ? formData.anio_publicacion : ""
          }
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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

export default ArticuloForm;
