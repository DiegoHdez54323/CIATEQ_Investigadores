// src/pages/DetEventosPage.tsx
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import List, { Column } from "../components/List";
import useCrudActions from "../hooks/useCrudActions";
import { useModal } from "../context/ModalContext";
import DetEventosForm from "../components/forms/DetEventosForm";
import SortButton from "../components/SortButton";
import FilterButton from "../components/FilterButton";
import { buildUrl } from "../utils/buildUrl";
import { withOrderingAndFilter } from "../hoc/withOrderingAndFilter";

interface DetEventos {
  id: number;
  investigador: number;
  evento: number;
  es_principal?: boolean;
  nombre_investigador: string;
  nombre_evento: string;
}

interface Investigador {
  id: number;
  nombre: string;
}

interface Evento {
  id: number;
  nombre: string;
}

// Endpoints base
const BASE_API_URL = "http://127.0.0.1:8000/gestion/api/deteventos/";
const INVESTIGADORES_API = "http://127.0.0.1:8000/gestion/api/investigadores/";
const EVENTOS_API = "http://127.0.0.1:8000/gestion/api/eventos/";

// Props inyectadas por withOrderingAndMultiFilter
interface DetEventosPageProps {
  ordering: string;
  toggleOrdering: (field: string) => void;
  filters: { [key: string]: string | null };
  setFilter: (field: string, value: string | null) => void;
  clearFilters: () => void;
}

const DetEventosPageComponent: React.FC<DetEventosPageProps> = ({
  ordering,
  toggleOrdering,
  filters,
  setFilter,
  clearFilters,
}) => {
  // Construir la URL combinando ordering y filtros "investigador" y "evento"
  const apiUrl = buildUrl(BASE_API_URL, {
    ordering,
    investigador: filters.investigador,
    evento: filters.evento,
  });

  const {
    data: detEventosList,
    loading,
    error,
    fetchData,
    create,
    update,
    remove,
    editingItem,
    setEditingItem,
    handleEdit,
  } = useCrudActions<DetEventos>(apiUrl);

  const { openModal, closeModal } = useModal();

  // Estados para las listas de opciones (usados para el formulario y filtros)
  const [investigadores, setInvestigadores] = useState<Investigador[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);

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

  const fetchEventos = async () => {
    try {
      const res = await fetch(EVENTOS_API);
      if (!res.ok) throw new Error("Error al obtener eventos");
      const data = await res.json();
      setEventos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchInvestigadores();
    fetchEventos();
  }, [ordering, filters]);

  const handleNew = () => {
    setEditingItem(null);
    openModal(
      <DetEventosForm
        detEventos={null}
        onClose={closeModal}
        onSubmit={async (data) => {
          await create(data);
          closeModal();
        }}
        investigadores={investigadores}
        eventos={eventos}
      />,
      "Nuevo DetEventos"
    );
  };

  const handleEditModal = (item: DetEventos) => {
    setEditingItem(item);
    openModal(
      <DetEventosForm
        detEventos={item}
        onClose={closeModal}
        onSubmit={async (data) => {
          await update(item.id, data);
          closeModal();
        }}
        investigadores={investigadores}
        eventos={eventos}
      />,
      "Editar DetEventos"
    );
  };

  const columns: Column<DetEventos>[] = [
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
          <span>Evento</span>
          <SortButton
            field="evento"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
          <FilterButton
            options={eventos.map((e) => ({
              value: e.id,
              label: e.nombre,
            }))}
            currentFilter={filters.evento ? parseInt(filters.evento) : null}
            onSelect={(value) =>
              setFilter("evento", value ? value.toString() : null)
            }
          />
        </div>
      ),
      accessor: "nombre_evento",
    },
  ];

  return (
    <Layout title="Asignación de Eventos - Investigador">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Listado de asignaciones Eventos - Investigador
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
          <List<DetEventos>
            columns={columns}
            data={detEventosList}
            rowKey="id"
            onEdit={(item) => {
              handleEdit(item);
              handleEditModal(item);
            }}
            onDelete={(item) => {
              if (
                window.confirm("¿Estás seguro de eliminar este DetEventos?")
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

export default withOrderingAndFilter(DetEventosPageComponent);
