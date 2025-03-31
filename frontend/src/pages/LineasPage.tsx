import React, { useEffect } from "react";
import Layout from "../components/Layout";
import List, { Column } from "../components/List";
import useCrudActions from "../hooks/useCrudActions";
import { useModal } from "../context/ModalContext";
import LineaForm from "../components/forms/LineaForm";

interface Linea {
  id: number;
  descripcion: string;
}

const API_URL = "http://127.0.0.1:8000/gestion/api/lineas/";

const LineasPage: React.FC = () => {
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
  
  const {
    data: lineas,
    loading,
    error,
    fetchData,
    create,
    update,
    remove,
    editingItem,
    setEditingItem,
    handleEdit,
  } = useCrudActions<Linea>(API_URL);

  const { openModal, closeModal } = useModal();

  useEffect(() => {
    fetchData();
  }, []);

  const handleNew = () => {
    setEditingItem(null);
    openModal(
      <LineaForm
        linea={null}
        onClose={closeModal}
        onSubmit={async (data) => {
          await create(data);
          closeModal();
        }}
      />,
      "Nueva Línea"
    );
  };

  const handleEditModal = (item: Linea) => {
    setEditingItem(item);
    openModal(
      <LineaForm
        linea={item}
        onClose={closeModal}
        onSubmit={async (data) => {
          await update(item.id, data);
          closeModal();
        }}
      />,
      "Editar Línea"
    );
  };

  const columns: Column<Linea>[] = [
    { header: "ID", accessor: "id" },
    { header: "Descripción", accessor: "descripcion" },
  ];

  return (
    <Layout title="Líneas">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Listado de Líneas</h2>
          <button
            onClick={handleNew}
            className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900"
          >
            Nueva Línea
          </button>
        </div>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <List<Linea>
            columns={columns}
            data={lineas}
            rowKey="id"
            onEdit={(item) => {
              handleEdit(item);
              handleEditModal(item);
            }}
            onDelete={(item) => {
              if (window.confirm("¿Estás seguro de eliminar esta línea?")) {
                remove(item.id);
              }
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default LineasPage;
