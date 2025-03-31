import React, { useEffect } from "react";
import Layout from "../components/Layout";
import List, { Column } from "../components/List";
import useCrudActions from "../hooks/useCrudActions";
import { useModal } from "../context/ModalContext";
import DetLineasForm from "../components/forms/DetLineasForm";
import SortButton from "../components/SortButton";
import FilterButton from "../components/FilterButton";
import { buildUrl } from "../utils/buildUrl";
import { withOrderingAndFilter } from "../hoc/withOrderingAndFilter";

interface DetLineas {
  id: number;
  investigador: number;
  linea: number;
  // Campos read-only devueltos por la API:
  nombre_investigador: string;
  descripcion_linea: string;
}

interface Investigador {
  id: number;
  nombre: string;
}

interface Linea {
  id: number;
  descripcion: string;
}

// Endpoints base
const BASE_API_URL = "http://127.0.0.1:8000/gestion/api/detlineas/";
const INVESTIGADORES_API = "http://127.0.0.1:8000/gestion/api/investigadores/";
const LINEAS_API = "http://127.0.0.1:8000/gestion/api/lineas/";

// Props inyectadas por withOrderingAndMultiFilter
interface DetLineasPageProps {
  ordering: string;
  toggleOrdering: (field: string) => void;
  filters: { [key: string]: string | null };
  setFilter: (field: string, value: string | null) => void;
  clearFilters: () => void;
}

const DetLineasPageComponent: React.FC<DetLineasPageProps> = ({
  ordering,
  toggleOrdering,
  filters,
  setFilter,
  clearFilters,
}) => {
  // verifica si la sesion está iniciada, si no redirige a login
  const isLoggedIn = localStorage.getItem("loggedUser") || sessionStorage.getItem("tempUser");
  if (!isLoggedIn) {
    alert("Inicia sesión para acceder a esta página.");
    window.location.href = "/login"; // Redirigir a otra página
  }
  
  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
  if (userRole !== "admin") {
    alert("No tienes permiso para acceder a esta página.");
    window.location.href = "/dashboard"; // Redirigir a otra página
  }
  
  // Construir la URL combinando ordering y los filtros "investigador" y "linea"
  const apiUrl = buildUrl(BASE_API_URL, {
    ordering,
    investigador: filters.investigador,
    linea: filters.linea,
  });

  const {
    data: detLineasList,
    loading,
    error,
    fetchData,
    create,
    update,
    remove,
    editingItem,
    setEditingItem,
    handleEdit,
  } = useCrudActions<DetLineas>(apiUrl);

  const { openModal, closeModal } = useModal();

  // Estados locales para obtener las listas de opciones para filtros y formulario
  const [investigadores, setInvestigadores] = React.useState<Investigador[]>(
    []
  );
  const [lineas, setLineas] = React.useState<Linea[]>([]);

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

  const fetchLineas = async () => {
    try {
      const res = await fetch(LINEAS_API);
      if (!res.ok) throw new Error("Error al obtener líneas");
      const data = await res.json();
      setLineas(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchInvestigadores();
    fetchLineas();
  }, [ordering, filters]);

  const handleNew = () => {
    setEditingItem(null);
    openModal(
      <DetLineasForm
        detLineas={null}
        onClose={closeModal}
        onSubmit={async (data) => {
          await create(data);
          closeModal();
        }}
        investigadores={investigadores}
        lineas={lineas}
      />,
      "Nueva asignación"
    );
  };

  const handleEditModal = (item: DetLineas) => {
    setEditingItem(item);
    openModal(
      <DetLineasForm
        detLineas={item}
        onClose={closeModal}
        onSubmit={async (data) => {
          await update(item.id, data);
          closeModal();
        }}
        investigadores={investigadores}
        lineas={lineas}
      />,
      "Editar asignación"
    );
  };

  const columns: Column<DetLineas>[] = [
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
          <span>Investigador</span>
          <SortButton
            field="investigador"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
          <FilterButton
            options={investigadores.map((inv) => ({
              value: inv.id,
              label: inv.nombre,
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
          <span>Línea</span>
          <SortButton
            field="linea"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
          <FilterButton
            options={lineas.map((l) => ({
              value: l.id,
              label: l.descripcion,
            }))}
            currentFilter={filters.linea ? parseInt(filters.linea) : null}
            onSelect={(value) =>
              setFilter("linea", value ? value.toString() : null)
            }
          />
        </div>
      ),
      accessor: "descripcion_linea",
    },
  ];

  return (
    <Layout title="Asignación de Líneas - Investigador">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Listado de asignaciones Líneas - Investigador
          </h2>
          <button
            onClick={handleNew}
            className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900"
          >
            Nueva asignación
          </button>
        </div>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <List<DetLineas>
            columns={columns}
            data={detLineasList}
            rowKey="id"
            onEdit={(item) => {
              handleEdit(item);
              handleEditModal(item);
            }}
            onDelete={(item) => {
              if (window.confirm("¿Estás seguro de eliminar este DetLineas?")) {
                remove(item.id);
              }
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default withOrderingAndFilter(DetLineasPageComponent, "id", {
  investigador: null,
  linea: null,
});
