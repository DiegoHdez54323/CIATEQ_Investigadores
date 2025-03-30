// src/components/forms/EstudianteForm.tsx
import React, { useEffect, useState } from "react";

interface Estudiante {
  id?: number;
  investigador: number;
  carrera: number;
  tipo_estudiante: number;
  escuela: string;
  fecha_inicio: string;
  fecha_termino: string;
  sueldo: number;
  nombre: string;
  // Campos read-only devueltos por la API (para la lista, no se editan aquí)
  nombre_investigador?: string;
  nombre_carrera?: string;
  descripcion_tipo_estudiante?: string;
}

interface Investigador {
  id: number;
  nombre: string;
}

interface Carrera {
  id: number;
  nombre: string;
}

interface TipoEstudiante {
  id: number;
  descripcion: string;
}

interface EstudianteFormProps {
  estudiante: Estudiante | null;
  onClose: () => void;
  onSubmit: (data: Partial<Estudiante>) => void;
  investigadores: Investigador[];
  carreras: Carrera[];
  tiposEstudiante: TipoEstudiante[];
}

const EstudianteForm: React.FC<EstudianteFormProps> = ({
  estudiante,
  onClose,
  onSubmit,
  investigadores,
  carreras,
  tiposEstudiante,
}) => {
  const [formData, setFormData] = useState<Estudiante>({
    investigador: investigadores.length > 0 ? investigadores[0].id : 0,
    carrera: carreras.length > 0 ? carreras[0].id : 0,
    tipo_estudiante: tiposEstudiante.length > 0 ? tiposEstudiante[0].id : 0,
    escuela: "",
    fecha_inicio: "",
    fecha_termino: "",
    sueldo: 0,
    nombre: "",
  });

  useEffect(() => {
    if (estudiante) {
      setFormData(estudiante);
    } else {
      setFormData({
        investigador: investigadores.length > 0 ? investigadores[0].id : 0,
        carrera: carreras.length > 0 ? carreras[0].id : 0,
        tipo_estudiante: tiposEstudiante.length > 0 ? tiposEstudiante[0].id : 0,
        escuela: "",
        fecha_inicio: "",
        fecha_termino: "",
        sueldo: 0,
        nombre: "",
      });
    }
  }, [estudiante, investigadores, carreras, tiposEstudiante]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "investigador" ||
        name === "carrera" ||
        name === "tipo_estudiante"
          ? parseInt(value)
          : name === "sueldo"
          ? parseFloat(value)
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
      {/* Dropdown para Carrera */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Carrera
        </label>
        <select
          name="carrera"
          value={formData.carrera}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        >
          {carreras.map((car) => (
            <option key={car.id} value={car.id}>
              {car.nombre}
            </option>
          ))}
        </select>
      </div>
      {/* Dropdown para Tipo Estudiante */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tipo Estudiante
        </label>
        <select
          name="tipo_estudiante"
          value={formData.tipo_estudiante}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        >
          {tiposEstudiante.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.descripcion}
            </option>
          ))}
        </select>
      </div>
      {/* Input para Escuela */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Escuela
        </label>
        <input
          type="text"
          name="escuela"
          value={formData.escuela}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      {/* Input para Fecha Inicio */}
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
      {/* Input para Fecha Término */}
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
      {/* Input para Sueldo */}
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
      {/* Input para Nombre */}
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

export default EstudianteForm;
