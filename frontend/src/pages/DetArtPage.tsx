// src/pages/DetArtPage.tsx
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import List, { Column } from "../components/List";
import useCrudActions from "../hooks/useCrudActions";
import { useModal } from "../context/ModalContext";
import DetArtForm from "../components/forms/DetArtForm";
import SortButton from "../components/SortButton";
import FilterButton from "../components/FilterButton";
import { buildUrl } from "../utils/buildUrl";
import { withOrderingAndFilter } from "../hoc/withOrderingAndFilter";

interface DetArt {
  id: number;
  investigador: number;
  articulo: number;
  es_principal: boolean;
  nombre_investigador: string;
  nombre_articulo: string;
}

interface Investigador {
  id: number;
  nombre: string;
}

interface Articulo {
  id: number;
  nombre: string;
}

// Endpoints base
const BASE_API_URL = "http://127.0.0.1:8000/gestion/api/detart/";
const INVESTIGADORES_API = "http://127.0.0.1:8000/gestion/api/investigadores/";
const ARTICULOS_API = "http://127.0.0.1:8000/gestion/api/articulos/";

// Props inyectadas por el HOC withOrderingAndFilter
interface DetArtPageProps {
  ordering: string;
  toggleOrdering: (field: string) => void;
  filters: { [key: string]: string | null };
  setFilter: (field: string, value: string | null) => void;
  clearFilters: () => void;
}

const DetArtPageComponent: React.FC<DetArtPageProps> = ({
  ordering,
  toggleOrdering,
  filters,
  setFilter,
  clearFilters,
}) => {
  // Construir la URL combinando ordering y los filtros desde el objeto filters
  const apiUrl = buildUrl(BASE_API_URL, {
    ordering,
    investigador: filters.investigador,
    articulo: filters.articulo,
    es_principal: filters.es_principal,
  });

  const {
    data: detArts,
    loading,
    error,
    fetchData,
    create,
    update,
    remove,
    editingItem,
    setEditingItem,
    handleEdit,
  } = useCrudActions<DetArt>(apiUrl);

  const { openModal, closeModal } = useModal();

  // Para las listas de opciones en el formulario y para los filtros
  const [investigadores, setInvestigadores] = useState<Investigador[]>([]);
  const [articulos, setArticulos] = useState<Articulo[]>([]);

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

  const fetchArticulos = async () => {
    try {
      const res = await fetch(ARTICULOS_API);
      if (!res.ok) throw new Error("Error al obtener artículos");
      const data = await res.json();
      setArticulos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchInvestigadores();
    fetchArticulos();
  }, [ordering, filters]);

  const handleNew = () => {
    setEditingItem(null);
    openModal(
      <DetArtForm
        detArt={null}
        onClose={closeModal}
        onSubmit={async (data) => {
          await create(data);
          closeModal();
        }}
        investigadores={investigadores}
        articulos={articulos}
      />,
      "Nueva asignación"
    );
  };

  const handleEditModal = (item: DetArt) => {
    setEditingItem(item);
    openModal(
      <DetArtForm
        detArt={item}
        onClose={closeModal}
        onSubmit={async (data) => {
          await update(item.id, data);
          closeModal();
        }}
        investigadores={investigadores}
        articulos={articulos}
      />,
      "Editar asignación"
    );
  };

  // Opciones para filtrar es_principal: usamos valores "1" para Sí y "0" para No
  const principalOptions = [
    { value: 1, label: "Sí" },
    { value: 0, label: "No" },
  ];

  const columns: Column<DetArt>[] = [
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
          <span>Artículo</span>
          <SortButton
            field="articulo"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
          <FilterButton
            options={articulos.map((art) => ({
              value: art.id,
              label: art.nombre,
            }))}
            currentFilter={filters.articulo ? parseInt(filters.articulo) : null}
            onSelect={(value) =>
              setFilter("articulo", value ? value.toString() : null)
            }
          />
        </div>
      ),
      accessor: "nombre_articulo",
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
      accessor: (item: DetArt) => (item.es_principal ? "Sí" : "No"),
    },
  ];

  return (
    <Layout title="Asignación de Artículos - Investigador">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Listado de asignaciones Artículos - Investigador
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
          <List<DetArt>
            columns={columns}
            data={detArts}
            rowKey="id"
            onEdit={(item) => {
              handleEdit(item);
              handleEditModal(item);
            }}
            onDelete={(item) => {
              if (window.confirm("¿Estás seguro de eliminar este DetArt?")) {
                remove(item.id);
              }
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default withOrderingAndFilter(DetArtPageComponent);
