// src/pages/DetHerrPage.tsx
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import List, { Column } from "../components/List";
import useCrudActions from "../hooks/useCrudActions";
import { useModal } from "../context/ModalContext";
import DetHerrForm from "../components/forms/DetHerrForm";
import SortButton from "../components/SortButton";
import FilterButton from "../components/FilterButton";
import { buildUrl } from "../utils/buildUrl";
import { withOrderingAndFilter } from "../hoc/withOrderingAndFilter";

interface DetHerr {
  id: number;
  proyecto: number;
  herramienta: number;
  nombre_proyecto: string;
  descripcion_herramienta: string;
}

interface Proyecto {
  id: number;
  nombre: string;
}

interface Herramienta {
  id: number;
  descripcion: string;
}

// Endpoints base
const BASE_API_URL = "http://127.0.0.1:8000/gestion/api/detherr/";
const PROYECTOS_API = "http://127.0.0.1:8000/gestion/api/proyectos/";
const HERRAMIENTAS_API = "http://127.0.0.1:8000/gestion/api/herramientas/";

// Props inyectadas por withOrderingAndMultiFilter
interface DetHerrPageProps {
  ordering: string;
  toggleOrdering: (field: string) => void;
  filters: { [key: string]: string | null };
  setFilter: (field: string, value: string | null) => void;
  clearFilters: () => void;
}

const DetHerrPageComponent: React.FC<DetHerrPageProps> = ({
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
  
  // Construir la URL combinando ordering y los filtros "proyecto" y "herramienta"
  const apiUrl = buildUrl(BASE_API_URL, {
    ordering,
    proyecto: filters.proyecto,
    herramienta: filters.herramienta,
  });

  const {
    data: detHerrList,
    loading,
    error,
    fetchData,
    create,
    update,
    remove,
    editingItem,
    setEditingItem,
    handleEdit,
  } = useCrudActions<DetHerr>(apiUrl);

  const { openModal, closeModal } = useModal();

  // Estados para obtener las listas de opciones para el formulario y filtros
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [herramientas, setHerramientas] = useState<Herramienta[]>([]);

  const fetchProyectos = async () => {
    try {
      const res = await fetch(PROYECTOS_API);
      if (!res.ok) throw new Error("Error al obtener proyectos");
      const data = await res.json();
      setProyectos(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHerramientas = async () => {
    try {
      const res = await fetch(HERRAMIENTAS_API);
      if (!res.ok) throw new Error("Error al obtener herramientas");
      const data = await res.json();
      setHerramientas(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchProyectos();
    fetchHerramientas();
  }, [ordering, filters]);

  const handleNew = () => {
    setEditingItem(null);
    openModal(
      <DetHerrForm
        detHerr={null}
        onClose={closeModal}
        onSubmit={async (data) => {
          await create(data);
          closeModal();
        }}
        proyectos={proyectos}
        herramientas={herramientas}
      />,
      "Nuevo DetHerr"
    );
  };

  const handleEditModal = (item: DetHerr) => {
    setEditingItem(item);
    openModal(
      <DetHerrForm
        detHerr={item}
        onClose={closeModal}
        onSubmit={async (data) => {
          await update(item.id, data);
          closeModal();
        }}
        proyectos={proyectos}
        herramientas={herramientas}
      />,
      "Editar DetHerr"
    );
  };

  const columns: Column<DetHerr>[] = [
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
          <span>Proyecto</span>
          <SortButton
            field="proyecto"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
          <FilterButton
            options={proyectos.map((p) => ({ value: p.id, label: p.nombre }))}
            currentFilter={filters.proyecto ? parseInt(filters.proyecto) : null}
            onSelect={(value) =>
              setFilter("proyecto", value ? value.toString() : null)
            }
          />
        </div>
      ),
      accessor: "nombre_proyecto",
    },
    {
      header: (
        <div className="flex items-center">
          <span>Herramienta</span>
          <SortButton
            field="herramienta"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
          <FilterButton
            options={herramientas.map((h) => ({
              value: h.id,
              label: h.descripcion,
            }))}
            currentFilter={
              filters.herramienta ? parseInt(filters.herramienta) : null
            }
            onSelect={(value) =>
              setFilter("herramienta", value ? value.toString() : null)
            }
          />
        </div>
      ),
      accessor: "descripcion_herramienta",
    },
  ];

  return (
    <Layout title="Asignación de Herramientas - Proyectos">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Listado de asignación de Herramientas - Proyectos
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
          <List<DetHerr>
            columns={columns}
            data={detHerrList}
            rowKey="id"
            onEdit={(item) => {
              handleEdit(item);
              handleEditModal(item);
            }}
            onDelete={(item) => {
              if (window.confirm("¿Estás seguro de eliminar este DetHerr?")) {
                remove(item.id);
              }
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default withOrderingAndFilter(DetHerrPageComponent);
