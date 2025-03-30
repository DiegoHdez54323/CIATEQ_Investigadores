import React, { useEffect } from "react";
import Layout from "../components/Layout";
import List, { Column } from "../components/List";
import useCrudActions from "../hooks/useCrudActions";
import { useModal } from "../context/ModalContext";
import DetProyForm from "../components/forms/DetProyForm";
import SortButton from "../components/SortButton";
import FilterButton from "../components/FilterButton";
import { buildUrl } from "../utils/buildUrl";
import { withOrderingAndFilter } from "../hoc/withOrderingAndFilter";

interface DetProy {
  id: number;
  investigador: number;
  proyecto: number;
  es_principal?: boolean;
  nombre_investigador: string;
  nombre_proyecto: string;
}

interface Investigador {
  id: number;
  nombre: string;
}

interface Proyecto {
  id: number;
  nombre: string;
}

// Endpoints base
const BASE_API_URL = "http://127.0.0.1:8000/gestion/api/detproy/";
const INVESTIGADORES_API = "http://127.0.0.1:8000/gestion/api/investigadores/";
const PROYECTOS_API = "http://127.0.0.1:8000/gestion/api/proyectos/";

// Props inyectadas por withOrderingAndMultiFilter
interface DetProyPageProps {
  ordering: string;
  toggleOrdering: (field: string) => void;
  filters: { [key: string]: string | null };
  setFilter: (field: string, value: string | null) => void;
  clearFilters: () => void;
}

const DetProyPageComponent: React.FC<DetProyPageProps> = ({
  ordering,
  toggleOrdering,
  filters,
  setFilter,
  clearFilters,
}) => {
  // Construir la URL combinando ordering y los filtros "investigador", "proyecto" y "es_principal"
  const apiUrl = buildUrl(BASE_API_URL, {
    ordering,
    investigador: filters.investigador,
    proyecto: filters.proyecto,
    es_principal: filters.es_principal,
  });

  const {
    data: detProyList,
    loading,
    error,
    fetchData,
    create,
    update,
    remove,
    editingItem,
    setEditingItem,
    handleEdit,
  } = useCrudActions<DetProy>(apiUrl);

  const { openModal, closeModal } = useModal();

  // Estados locales para obtener las listas de opciones (se mantienen porque son datos para dropdowns)
  const [investigadores, setInvestigadores] = React.useState<Investigador[]>(
    []
  );
  const [proyectos, setProyectos] = React.useState<Proyecto[]>([]);

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

  useEffect(() => {
    fetchData();
    fetchInvestigadores();
    fetchProyectos();
  }, [ordering, filters]);

  const handleNew = () => {
    setEditingItem(null);
    openModal(
      <DetProyForm
        detProy={null}
        onClose={closeModal}
        onSubmit={async (data) => {
          await create(data);
          closeModal();
        }}
        investigadores={investigadores}
        proyectos={proyectos}
      />,
      "Nuevo DetProy"
    );
  };

  const handleEditModal = (item: DetProy) => {
    setEditingItem(item);
    openModal(
      <DetProyForm
        detProy={item}
        onClose={closeModal}
        onSubmit={async (data) => {
          await update(item.id, data);
          closeModal();
        }}
        investigadores={investigadores}
        proyectos={proyectos}
      />,
      "Editar DetProy"
    );
  };

  // Opciones para filtrar "es_principal": asumimos 1 = Sí, 0 = No
  const principalOptions = [
    { value: 1, label: "Sí" },
    { value: 0, label: "No" },
  ];

  const columns: Column<DetProy>[] = [
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
          <span>Proyecto</span>
          <SortButton
            field="proyecto"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
          <FilterButton
            options={proyectos.map((p) => ({
              value: p.id,
              label: p.nombre,
            }))}
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
          <span>Principal</span>
          <SortButton
            field="es_principal"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
          <FilterButton
            options={principalOptions}
            currentFilter={
              filters.es_principal ? parseInt(filters.es_principal) : null
            }
            onSelect={(value) =>
              setFilter("es_principal", value ? value.toString() : null)
            }
          />
        </div>
      ),
      accessor: (item: DetProy) => (item.es_principal ? "Sí" : "No"),
    },
  ];

  return (
    <Layout title="Asignación de Proyectos - Investigador">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Listado de asignaciones Proyectos - Investigador
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
          <List<DetProy>
            columns={columns}
            data={detProyList}
            rowKey="id"
            onEdit={(item) => {
              handleEdit(item);
              handleEditModal(item);
            }}
            onDelete={(item) => {
              if (window.confirm("¿Estás seguro de eliminar este DetProy?")) {
                remove(item.id);
              }
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default withOrderingAndFilter(DetProyPageComponent, "id", {
  investigador: null,
  proyecto: null,
  es_principal: null,
});
