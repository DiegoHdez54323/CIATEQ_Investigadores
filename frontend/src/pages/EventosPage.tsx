import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import List, { Column } from "../components/List";
import useCrudActions from "../hooks/useCrudActions";
import { useModal } from "../context/ModalContext";
import EventoForm from "../components/forms/EventoForm";
import SortButton from "../components/SortButton";
import FilterButton from "../components/FilterButton";
import { buildUrl } from "../utils/buildUrl";
import { withOrderingAndFilter } from "../hoc/withOrderingAndFilter";

interface Evento {
  id: number;
  tipo_evento: number;
  nombre: string;
  lugar: string;
  fecha: string;
  duracion: number;
  empresa_invita: string;
  tipo_evento_descripcion: string;
}

interface TipoEvento {
  id: number;
  descripcion: string;
}

const BASE_API_URL = "http://127.0.0.1:8000/gestion/api/eventos/";
const TIPO_EVENTO_API = "http://127.0.0.1:8000/gestion/api/tipoevento/";

interface EventosPageProps {
  ordering: string;
  toggleOrdering: (field: string) => void;
  filters: { [key: string]: string | null };
  setFilter: (field: string, value: string | null) => void;
  clearFilters: () => void;
}

const EventosPageComponent: React.FC<EventosPageProps> = ({
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
  
  // Estado para verificar si el usuario es admin
  const [isAdmin, setIsAdmin] = useState(false);

  // Verificar el rol del usuario
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const sesionRole = sessionStorage.getItem("userRole");
    setIsAdmin(userRole === "admin" || sesionRole === "admin");
  }, []);

  const apiUrl = buildUrl(BASE_API_URL, {
    ordering,
    tipo_evento: filters.tipo_evento,
  });

  const {
    data: eventos,
    loading,
    error,
    fetchData,
    create,
    update,
    remove,
    editingItem,
    setEditingItem,
    handleEdit,
  } = useCrudActions<Evento>(apiUrl);

  const { openModal, closeModal } = useModal();

  const [tipoEventos, setTipoEventos] = React.useState<TipoEvento[]>([]);

  const fetchTipoEventos = async () => {
    try {
      const res = await fetch(TIPO_EVENTO_API);
      if (!res.ok) throw new Error("Error al obtener los tipos de evento");
      const data = await res.json();
      setTipoEventos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTipoEventos();
  }, [ordering, filters]);

  const handleNew = () => {
    if (!isAdmin) return;

    setEditingItem(null);
    openModal(
      <EventoForm
        evento={null}
        onClose={closeModal}
        onSubmit={async (data) => {
          await create(data);
          closeModal();
        }}
        tipoEventos={tipoEventos}
      />,
      "Nuevo Evento"
    );
  };

  const handleEditModal = (item: Evento) => {
    if (!isAdmin) return;

    setEditingItem(item);
    openModal(
      <EventoForm
        evento={item}
        onClose={closeModal}
        onSubmit={async (data) => {
          await update(item.id, data);
          closeModal();
        }}
        tipoEventos={tipoEventos}
      />,
      "Editar Evento"
    );
  };

  const columns: Column<Evento>[] = [
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
          <span>Fecha</span>
          <SortButton
            field="fecha"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
        </div>
      ),
      accessor: "fecha",
    },
    {
      header: (
        <div className="flex items-center">
          <span>Duración</span>
          <SortButton
            field="duracion"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
        </div>
      ),
      accessor: "duracion",
    },
    {
      header: (
        <div className="flex items-center">
          <span>Tipo Evento</span>
          <SortButton
            field="tipo_evento"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
          <FilterButton
            options={tipoEventos.map((t) => ({
              value: t.id,
              label: t.descripcion,
            }))}
            currentFilter={filters.tipo_evento ? parseInt(filters.tipo_evento) : null}
            onSelect={(value) =>
              setFilter("tipo_evento", value ? value.toString() : null)
            }
          />
        </div>
      ),
      accessor: "tipo_evento_descripcion",
    },
    {
      header: (
        <div className="flex items-center">
          <span>Lugar</span>
          <SortButton
            field="lugar"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
        </div>
      ),
      accessor: "lugar",
    },
    {
      header: (
        <div className="flex items-center">
          <span>Empresa Invita</span>
          <SortButton
            field="empresa_invita"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
        </div>
      ),
      accessor: "empresa_invita",
    },
    { header: "Nombre", accessor: "nombre" },
  ];

  return (
    <Layout title="Eventos">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Listado de Eventos</h2>
          {isAdmin && (
            <button
              onClick={handleNew}
              className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900"
            >
              Nuevo Evento
            </button>
          )}
        </div>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <List<Evento>
            columns={columns}
            data={eventos}
            rowKey="id"
            onEdit={isAdmin ? (item) => handleEditModal(item) : undefined}
            onDelete={isAdmin ? (item) => {
              if (window.confirm("¿Estás seguro de eliminar este evento?")) {
                remove(item.id);
              }
            } : undefined}
          />
        )}
      </div>
    </Layout>
  );
};

export default withOrderingAndFilter(EventosPageComponent, "id", {
  tipo_evento: null,
});
