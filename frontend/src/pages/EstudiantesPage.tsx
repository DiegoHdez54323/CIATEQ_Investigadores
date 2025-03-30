import React, { useEffect } from "react";
import Layout from "../components/Layout";
import List, { Column } from "../components/List";
import useCrudActions from "../hooks/useCrudActions";
import { useModal } from "../context/ModalContext";
import EstudianteForm from "../components/forms/EstudianteForm";
import SortButton from "../components/SortButton";
import FilterButton from "../components/FilterButton";
import { buildUrl } from "../utils/buildUrl";
import { withOrderingAndFilter } from "../hoc/withOrderingAndFilter";

interface Estudiante {
  id: number;
  investigador: number;
  carrera: number;
  tipo_estudiante: number;
  escuela: string;
  fecha_inicio: string;
  fecha_termino: string;
  sueldo: number;
  nombre: string;
  // Campos read-only devueltos por la API
  nombre_investigador: string;
  nombre_carrera: string;
  descripcion_tipo_estudiante: string;
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

// URL base para estudiantes y endpoints para las opciones de filtro
const BASE_API_URL = "http://127.0.0.1:8000/gestion/api/estudiantes/";
const INVESTIGADORES_API = "http://127.0.0.1:8000/gestion/api/investigadores/";
const CARRERAS_API = "http://127.0.0.1:8000/gestion/api/carreras/";
const TIPO_ESTUDIANTE_API = "http://127.0.0.1:8000/gestion/api/tipoestudiante/";

// Props inyectadas por el HOC withOrderingAndMultiFilter
interface EstudiantesPageProps {
  ordering: string;
  toggleOrdering: (field: string) => void;
  filters: { [key: string]: string | null };
  setFilter: (field: string, value: string | null) => void;
  clearFilters: () => void;
}

const EstudiantesPageComponent: React.FC<EstudiantesPageProps> = ({
  ordering,
  toggleOrdering,
  filters,
  setFilter,
  clearFilters,
}) => {
  // Construir la URL combinando ordenación y filtros
  const apiUrl = buildUrl(BASE_API_URL, {
    ordering,
    investigador: filters.investigador,
    carrera: filters.carrera,
    tipo_estudiante: filters.tipo_estudiante,
  });

  // Hook CRUD para estudiantes
  const {
    data: estudiantes,
    loading,
    error,
    fetchData,
    create,
    update,
    remove,
    editingItem,
    setEditingItem,
    handleEdit,
  } = useCrudActions<Estudiante>(apiUrl);

  const { openModal, closeModal } = useModal();

  // Estados para obtener las listas de opciones para filtros y para el formulario
  // (Se mantienen locales, pues estos arrays se usan para poblar dropdowns)
  const [investigadores, setInvestigadores] = React.useState<Investigador[]>(
    []
  );
  const [carreras, setCarreras] = React.useState<Carrera[]>([]);
  const [tiposEstudiante, setTiposEstudiante] = React.useState<
    TipoEstudiante[]
  >([]);

  const fetchInvestigadores = async () => {
    try {
      const res = await fetch(INVESTIGADORES_API);
      if (!res.ok) throw new Error("Error al obtener investigadores");
      const data = await res.json();
      setInvestigadores(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCarreras = async () => {
    try {
      const res = await fetch(CARRERAS_API);
      if (!res.ok) throw new Error("Error al obtener carreras");
      const data = await res.json();
      setCarreras(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTiposEstudiante = async () => {
    try {
      const res = await fetch(TIPO_ESTUDIANTE_API);
      if (!res.ok) throw new Error("Error al obtener tipos de estudiante");
      const data = await res.json();
      setTiposEstudiante(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchInvestigadores();
    fetchCarreras();
    fetchTiposEstudiante();
  }, [ordering, filters]);

  const handleNew = () => {
    setEditingItem(null);
    openModal(
      <EstudianteForm
        estudiante={null}
        onClose={closeModal}
        onSubmit={async (data) => {
          await create(data);
          closeModal();
        }}
        investigadores={investigadores}
        carreras={carreras}
        tiposEstudiante={tiposEstudiante}
      />,
      "Nuevo Estudiante"
    );
  };

  const handleEditModal = (item: Estudiante) => {
    setEditingItem(item);
    openModal(
      <EstudianteForm
        estudiante={item}
        onClose={closeModal}
        onSubmit={async (data) => {
          await update(item.id, data);
          closeModal();
        }}
        investigadores={investigadores}
        carreras={carreras}
        tiposEstudiante={tiposEstudiante}
      />,
      "Editar Estudiante"
    );
  };

  // Definición de columnas con ordenación y filtros en las columnas para Investigador, Carrera y Tipo Estudiante
  const columns: Column<Estudiante>[] = [
    {
      header: (
        <div className="flex items-center">
          <span>ID</span>
          <SortButton
            field="id"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
        </div>
      ),
      accessor: "id",
    },
    {
      header: (
        <div className="flex items-center">
          <span>Escuela</span>
          <SortButton
            field="escuela"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
        </div>
      ),
      accessor: "escuela",
    },
    {
      header: (
        <div className="flex items-center">
          <span>Fecha Inicio</span>
          <SortButton
            field="fecha_inicio"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
        </div>
      ),
      accessor: "fecha_inicio",
    },
    {
      header: (
        <div className="flex items-center">
          <span>Fecha Término</span>
          <SortButton
            field="fecha_termino"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
        </div>
      ),
      accessor: "fecha_termino",
    },
    {
      header: (
        <div className="flex items-center">
          <span>Sueldo</span>
          <SortButton
            field="sueldo"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
        </div>
      ),
      accessor: "sueldo",
    },
    {
      header: (
        <div className="flex items-center">
          <span>Nombre</span>
          <SortButton
            field="nombre"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
        </div>
      ),
      accessor: "nombre",
    },
    {
      header: (
        <div className="flex items-center">
          <span>Investigador</span>
          <SortButton
            field="investigador"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
          <FilterButton
            options={investigadores.map((i) => ({
              value: i.id,
              label: i.nombre,
            }))}
            currentFilter={
              filters.investigador ? parseInt(filters.investigador) : null
            }
            onSelect={(value) =>
              setFilter("investigador", value ? value.toString() : null)
            }
          />
        </div>
      ),
      accessor: "nombre_investigador",
    },
    {
      header: (
        <div className="flex items-center">
          <span>Carrera</span>
          <SortButton
            field="carrera"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
          <FilterButton
            options={carreras.map((c) => ({
              value: c.id,
              label: c.nombre,
            }))}
            currentFilter={filters.carrera ? parseInt(filters.carrera) : null}
            onSelect={(value) =>
              setFilter("carrera", value ? value.toString() : null)
            }
          />
        </div>
      ),
      accessor: "nombre_carrera",
    },
    {
      header: (
        <div className="flex items-center">
          <span>Tipo Estudiante</span>
          <SortButton
            field="tipo_estudiante"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
          <FilterButton
            options={tiposEstudiante.map((t) => ({
              value: t.id,
              label: t.descripcion,
            }))}
            currentFilter={
              filters.tipo_estudiante ? parseInt(filters.tipo_estudiante) : null
            }
            onSelect={(value) =>
              setFilter("tipo_estudiante", value ? value.toString() : null)
            }
          />
        </div>
      ),
      accessor: "descripcion_tipo_estudiante",
    },
  ];

  return (
    <Layout title="Estudiantes">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Listado de Estudiantes</h2>
          <button
            onClick={handleNew}
            className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900"
          >
            Nuevo Estudiante
          </button>
        </div>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <List<Estudiante>
            columns={columns}
            data={estudiantes}
            rowKey="id"
            onEdit={(item) => {
              handleEdit(item);
              handleEditModal(item);
            }}
            onDelete={(item) => {
              if (
                window.confirm("¿Estás seguro de eliminar este estudiante?")
              ) {
                remove(item.id);
              }
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default withOrderingAndFilter(EstudiantesPageComponent, "id", {
  investigador: null,
  carrera: null,
  tipo_estudiante: null,
});
