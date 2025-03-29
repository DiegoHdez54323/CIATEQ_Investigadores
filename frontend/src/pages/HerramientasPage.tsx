import React, { useEffect } from "react";
import Layout from "../components/Layout";
import List, { Column } from "../components/List";
import useCrudActions from "../hooks/useCrudActions";
import { useModal } from "../context/ModalContext";
import HerramientaForm from "../components/forms/HerramientaForm";

interface Herramienta {
  id: number;
  descripcion: string;
}

const API_URL = "http://127.0.0.1:8000/gestion/api/herramientas/";

const HerramientasPage: React.FC = () => {
  const {
    data: herramientas,
    loading,
    error,
    fetchData,
    create,
    update,
    remove,
    editingItem,
    setEditingItem,
    handleEdit,
  } = useCrudActions<Herramienta>(API_URL);

  const { openModal, closeModal } = useModal();

  useEffect(() => {
    fetchData();
  }, []);

  const handleNew = () => {
    setEditingItem(null);
    openModal(
      <HerramientaForm
        herramienta={null}
        onClose={closeModal}
        onSubmit={async (data) => {
          await create(data);
          closeModal();
        }}
      />,
      "Nueva Herramienta"
    );
  };

  const handleEditModal = (item: Herramienta) => {
    setEditingItem(item);
    openModal(
      <HerramientaForm
        herramienta={item}
        onClose={closeModal}
        onSubmit={async (data) => {
          await update(item.id, data);
          closeModal();
        }}
      />,
      "Editar Herramienta"
    );
  };

  const columns: Column<Herramienta>[] = [
    { header: "ID", accessor: "id" },
    { header: "Descripción", accessor: "descripcion" },
  ];

  return (
    <Layout title="Herramientas">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Listado de Herramientas</h2>
          <button
            onClick={handleNew}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Nueva Herramienta
          </button>
        </div>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <List<Herramienta>
            columns={columns}
            data={herramientas}
            rowKey="id"
            onEdit={(item) => {
              handleEdit(item);
              handleEditModal(item);
            }}
            onDelete={(item) => {
              if (
                window.confirm("¿Estás seguro de eliminar esta herramienta?")
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

export default HerramientasPage;
