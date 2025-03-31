import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import List, { Column } from "../components/List";
import ProyectoForm from "../components/forms/ProyectoForm";
import { useModal } from "../context/ModalContext";
import useCrudActions from "../hooks/useCrudActions";
import SortButton from "../components/SortButton";
import { withOrderingAndFilter } from "../hoc/withOrderingAndFilter";
import { buildUrl } from "../utils/buildUrl";

interface Proyecto {
  id: number;
  nombre: string;
  fecha_inicio: string;
  fecha_termino: string;
  ingresos: number;
}

interface ProyectosPageProps {
  ordering: string;
  toggleOrdering: (field: string) => void;
  filters: { [key: string]: string | null };
  setFilter: (field: string, value: string | null) => void;
  clearFilters: () => void;
}

const BASE_API_URL = "http://127.0.0.1:8000/gestion/api/proyectos/";

const ProyectosPage: React.FC<ProyectosPageProps> = ({
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
    setIsAdmin(userRole === "admin" || sesionRole == "admin");
  }, []);

  // Construimos la URL usando buildUrl; en este caso, solo se utiliza ordering.
  const API_URL = buildUrl(BASE_API_URL, { ordering: ordering });

  const {
    data: proyectos,
    loading,
    error,
    fetchData,
    create,
    update,
    remove,
    editingItem,
    setEditingItem,
    handleEdit,
  } = useCrudActions<Proyecto>(API_URL);

  const { openModal, closeModal } = useModal();

  // Vuelve a obtener los datos cada vez que cambia la ordenación
  useEffect(() => {
    fetchData();
  }, [ordering]);

  const handleNew = () => {
    // Solo permitir si el usuario es admin
    if (!isAdmin) return;
    
    setEditingItem(null);
    openModal(
      <ProyectoForm
        proyecto={null}
        onClose={closeModal}
        onSubmit={async (data) => {
          await create(data);
          closeModal();
        }}
      />,
      "Nuevo Proyecto"
    );
  };

  const handleEditModal = (item: Proyecto) => {
    // Solo permitir si el usuario es admin
    if (!isAdmin) return;
    
    setEditingItem(item);
    openModal(
      <ProyectoForm
        proyecto={item}
        onClose={closeModal}
        onSubmit={async (data) => {
          await update(item.id, data);
          closeModal();
        }}
      />,
      "Editar Proyecto"
    );
  };

  const columns: Column<Proyecto>[] = [
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
          <span>Ingresos</span>
          <SortButton
            field="ingresos"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
        </div>
      ),
      accessor: "ingresos",
    },
  ];

  return (
    <Layout title="Proyectos">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Listado de Proyectos</h2>
          {isAdmin && (
            <button
              onClick={handleNew}
              className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900"
            >
              Nuevo Proyecto
            </button>
          )}
        </div>

        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <List<Proyecto>
            columns={columns}
            data={proyectos}
            rowKey="id"
            onEdit={isAdmin ? (item) => {
              handleEdit(item);
              handleEditModal(item);
            } : undefined}
            onDelete={isAdmin ? (item) => {
              if (window.confirm("¿Estás seguro de eliminar este proyecto?")) {
                remove(item.id);
              }
            } : undefined}
          />
        )}
      </div>
    </Layout>
  );
};

export default withOrderingAndFilter(ProyectosPage);