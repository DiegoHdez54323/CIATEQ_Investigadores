import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import List, { Column } from "../components/List";
import ArticuloForm from "../components/forms/ArticuloForm";
import { useModal } from "../context/ModalContext";
import useCrudActions from "../hooks/useCrudActions";
import SortButton from "../components/SortButton";
import { buildUrl } from "../utils/buildUrl";
import { withOrderingAndFilter } from "../hoc/withOrderingAndFilter";

interface Articulo {
  id: number;
  fecha_publicacion: string;
  doi: string | null;
  url: string;
  nombre: string;
  nombre_revista: string;
  pais_publicacion: string | null;
  anio_publicacion: number | null;
}

const BASE_API_URL = "http://127.0.0.1:8000/gestion/api/articulos/";

// Las props inyectadas por el HOC withOrderingAndMultiFilter
interface ArticulosPageProps {
  ordering: string;
  toggleOrdering: (field: string) => void;
  filters: { [key: string]: string | null };
  setFilter: (field: string, value: string | null) => void;
  clearFilters: () => void;
}

const ArticulosPageComponent: React.FC<ArticulosPageProps> = ({
  ordering,
  toggleOrdering,
}) => {
  // verifica si la sesion está iniciada, si no redirige a login
  const isLoggedIn = localStorage.getItem("loggedUser") || sessionStorage.getItem("tempUser");
  if (!isLoggedIn) {
    alert("Inicia sesión para acceder a esta página.");
    window.location.href = "/login"; // Redirigir a otra página
  }
  
  // Estado para controlar si el usuario es administrador
  const [isAdmin, setIsAdmin] = useState(false);

  // Verificar el rol del usuario cuando el componente se monta
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const sesionRole = sessionStorage.getItem("userRole");
    setIsAdmin(userRole === "admin" || sesionRole === "admin");
  }, []);

  // Construir la URL combinando ordering; no usamos filtros, así que se dejan vacíos.
  const apiUrl = buildUrl(BASE_API_URL, { ordering });

  const {
    data: articulos,
    loading,
    error,
    fetchData,
    create,
    update,
    remove,
    editingItem,
    setEditingItem,
    handleEdit,
  } = useCrudActions<Articulo>(apiUrl);

  const { openModal, closeModal } = useModal();

  useEffect(() => {
    fetchData();
  }, [ordering]);

  const handleNew = () => {
    if (!isAdmin) return;
    setEditingItem(null);
    openModal(
      <ArticuloForm
        article={null}
        onClose={closeModal}
        onSubmit={async (data) => {
          await create(data);
          closeModal();
        }}
      />,
      "Nuevo Artículo"
    );
  };

  const handleEditModal = (item: Articulo) => {
    if (!isAdmin) return;
    setEditingItem(item);
    openModal(
      <ArticuloForm
        article={item}
        onClose={closeModal}
        onSubmit={async (data) => {
          await update(item.id, data);
          closeModal();
        }}
      />,
      "Editar Artículo"
    );
  };

  const columns: Column<Articulo>[] = [
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
    { header: "Nombre", accessor: "nombre" },
    {
      header: (
        <div className="flex items-center">
          <span>Fecha Publicación</span>
          <SortButton
            field="fecha_publicacion"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
        </div>
      ),
      accessor: "fecha_publicacion",
    },
    { header: "DOI", accessor: "doi" },
    { header: "URL", accessor: "url" },
    {
      header: (
        <div className="flex items-center">
          <span>Nombre Revista</span>
          <SortButton
            field="nombre_revista"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
        </div>
      ),
      accessor: "nombre_revista",
    },
    {
      header: (
        <div className="flex items-center">
          <span>País Publicación</span>
          <SortButton
            field="pais_publicacion"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
        </div>
      ),
      accessor: "pais_publicacion",
    },
    {
      header: (
        <div className="flex items-center">
          <span>Año Publicación</span>
          <SortButton
            field="anio_publicacion"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
        </div>
      ),
      accessor: "anio_publicacion",
    },
  ];

  return (
    <Layout title="Artículos">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Listado de Artículos</h2>
          {isAdmin && (
            <button
              onClick={handleNew}
              className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900"
            >
              Nuevo Artículo
            </button>
          )}
        </div>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <List<Articulo>
            columns={columns}
            data={articulos}
            rowKey="id"
            onEdit={isAdmin ? (item) => {
              handleEdit(item);
              handleEditModal(item);
            } : undefined}
            onDelete={isAdmin ? (item) => {
              if (window.confirm("¿Estás seguro de eliminar este artículo?"))
                remove(item.id);
            } : undefined}
          />
        )}
      </div>
    </Layout>
  );
};

export default withOrderingAndFilter(ArticulosPageComponent, "id", {});
