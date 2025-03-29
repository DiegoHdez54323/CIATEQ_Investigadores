// src/pages/CarrerasPage.tsx
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import List, { Column } from "../components/List";
import useCrudActions from "../hooks/useCrudActions";
import { useModal } from "../context/ModalContext";
import CarreraForm from "../components/forms/CarreraForm";

interface Carrera {
  id: number;
  nombre: string;
}

const API_URL = "http://127.0.0.1:8000/gestion/api/carreras/";

const CarrerasPage: React.FC = () => {
  const {
    data: carreras,
    loading,
    error,
    fetchData,
    create,
    update,
    remove,
    editingItem,
    setEditingItem,
    handleEdit,
  } = useCrudActions<Carrera>(API_URL);

  const { openModal, closeModal } = useModal();

  useEffect(() => {
    fetchData();
  }, []);

  const handleNew = () => {
    setEditingItem(null);
    openModal(
      <CarreraForm
        carrera={null}
        onClose={closeModal}
        onSubmit={async (data) => {
          await create(data);
          closeModal();
        }}
      />,
      "Nueva Carrera"
    );
  };

  const handleEditModal = (item: Carrera) => {
    setEditingItem(item);
    openModal(
      <CarreraForm
        carrera={item}
        onClose={closeModal}
        onSubmit={async (data) => {
          await update(item.id, data);
          closeModal();
        }}
      />,
      "Editar Carrera"
    );
  };

  const columns: Column<Carrera>[] = [
    { header: "ID", accessor: "id" },
    { header: "Nombre", accessor: "nombre" },
  ];

  return (
    <Layout title="Carreras">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Listado de Carreras</h2>
          <button
            onClick={handleNew}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Nueva Carrera
          </button>
        </div>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <List<Carrera>
            columns={columns}
            data={carreras}
            rowKey="id"
            onEdit={(item) => {
              handleEdit(item);
              handleEditModal(item);
            }}
            onDelete={(item) => {
              if (window.confirm("¿Estás seguro de eliminar esta carrera?")) {
                remove(item.id);
              }
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default CarrerasPage;
