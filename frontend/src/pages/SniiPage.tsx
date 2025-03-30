// src/pages/SniiPage.tsx
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import List, { Column } from "../components/List";
import useCrudActions from "../hooks/useCrudActions";
import { useModal } from "../context/ModalContext";
import SniiForm from "../components/forms/SNIIForm";
import SortButton from "../components/SortButton";
import FilterButton from "../components/FilterButton";
import { buildUrl } from "../utils/buildUrl";
import { withOrderingAndFilter } from "../hoc/withOrderingAndFilter";

interface Snii {
  id: number;
  fecha_asignacion: string;
  investigador: number;
  nivel: number;
  nombre_investigador: string;
  nivel_descripcion: string;
}

interface Investigator {
  id: number;
  nombre: string;
}

interface Nivel {
  id: number;
  descripcion: string;
}

// URL base para SNII y endpoints para opciones
const BASE_API_URL = "http://127.0.0.1:8000/gestion/api/snii/";
const INVESTIGADORES_API = "http://127.0.0.1:8000/gestion/api/investigadores/";
const NIVELES_API = "http://127.0.0.1:8000/gestion/api/nivelsnii/";

// Props inyectadas por withOrderingAndMultiFilter
interface SniiPageProps {
  ordering: string;
  toggleOrdering: (field: string) => void;
  filters: { [key: string]: string | null };
  setFilter: (field: string, value: string | null) => void;
  clearFilters: () => void;
}

const SniiPageComponent: React.FC<SniiPageProps> = ({
  ordering,
  toggleOrdering,
  filters,
  setFilter,
  clearFilters,
}) => {
  // Construir la URL combinando ordenación y el filtro "nivel"
  const apiUrl = buildUrl(BASE_API_URL, { ordering, nivel: filters.nivel });

  // Hook CRUD para SNII
  const {
    data: sniiList,
    loading,
    error,
    fetchData,
    create,
    update,
    remove,
    editingItem,
    setEditingItem,
    handleEdit,
  } = useCrudActions<Snii>(apiUrl);

  const { openModal, closeModal } = useModal();

  // Estados para las listas de opciones (se mantienen locales, ya que estos datos se usan para dropdowns)
  const [investigators, setInvestigators] = React.useState<Investigator[]>([]);
  const [niveles, setNiveles] = React.useState<Nivel[]>([]);

  const fetchInvestigators = async () => {
    try {
      const res = await fetch(INVESTIGADORES_API);
      if (!res.ok) throw new Error("Error al obtener investigadores");
      const data = await res.json();
      setInvestigators(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNiveles = async () => {
    try {
      const res = await fetch(NIVELES_API);
      if (!res.ok) throw new Error("Error al obtener niveles");
      const data = await res.json();
      setNiveles(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchInvestigators();
    fetchNiveles();
  }, [ordering, filters]);

  const handleNew = () => {
    setEditingItem(null);
    openModal(
      <SniiForm
        snii={null}
        onClose={closeModal}
        onSubmit={async (data) => {
          await create(data);
          closeModal();
        }}
        investigators={investigators}
        niveles={niveles}
      />,
      "Nuevo SNII"
    );
  };

  const handleEditModal = (item: Snii) => {
    setEditingItem(item);
    openModal(
      <SniiForm
        snii={item}
        onClose={closeModal}
        onSubmit={async (data) => {
          await update(item.id, data);
          closeModal();
        }}
        investigators={investigators}
        niveles={niveles}
      />,
      "Editar SNII"
    );
  };

  const columns: Column<Snii>[] = [
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
    { header: "Fecha Asignación", accessor: "fecha_asignacion" },
    { header: "Investigador", accessor: "nombre_investigador" },
    {
      header: (
        <div className="flex items-center">
          <span>Nivel SNII</span>
          <SortButton
            field="nivel"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
          <FilterButton
            options={niveles.map((n) => ({
              value: n.id,
              label: n.descripcion,
            }))}
            currentFilter={filters.nivel ? parseInt(filters.nivel) : null}
            onSelect={(value) =>
              setFilter("nivel", value ? value.toString() : null)
            }
          />
        </div>
      ),
      accessor: "nivel_descripcion",
    },
  ];

  return (
    <Layout title="Registros SNII">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Listado de registros SNII</h2>
          <button
            onClick={handleNew}
            className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900"
          >
            Nuevo SNII
          </button>
        </div>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <List<Snii>
            columns={columns}
            data={sniiList}
            rowKey="id"
            onEdit={(item) => {
              handleEdit(item);
              handleEditModal(item);
            }}
            onDelete={(item) => {
              if (window.confirm("¿Estás seguro de eliminar este SNII?")) {
                remove(item.id);
              }
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default withOrderingAndFilter(SniiPageComponent, "id", {
  nivel: null,
});
