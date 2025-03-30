// src/pages/NivelSniiPage.tsx
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import List, { Column } from "../components/List";
import useCrudActions from "../hooks/useCrudActions";
import { useModal } from "../context/ModalContext";
import NivelSniiForm from "../components/forms/NivelSniiForm";

interface NivelSnii {
  id: number;
  descripcion: string;
}

const API_URL = "http://127.0.0.1:8000/gestion/api/nivelsnii/";

const NivelSniiPage: React.FC = () => {
  const {
    data: niveles,
    loading,
    error,
    fetchData,
    create,
    update,
    remove,
    editingItem,
    setEditingItem,
    handleEdit,
  } = useCrudActions<NivelSnii>(API_URL);

  const { openModal, closeModal } = useModal();

  useEffect(() => {
    fetchData();
  }, []);

  const handleNew = () => {
    setEditingItem(null);
    openModal(
      <NivelSniiForm
        nivelSnii={null}
        onClose={closeModal}
        onSubmit={async (data) => {
          await create(data);
          closeModal();
        }}
      />,
      "Nuevo Nivel Snii"
    );
  };

  const handleEditModal = (item: NivelSnii) => {
    setEditingItem(item);
    openModal(
      <NivelSniiForm
        nivelSnii={item}
        onClose={closeModal}
        onSubmit={async (data) => {
          await update(item.id, data);
          closeModal();
        }}
      />,
      "Editar Nivel Snii"
    );
  };

  const columns: Column<NivelSnii>[] = [
    { header: "ID", accessor: "id" },
    { header: "Descripción", accessor: "descripcion" },
  ];

  return (
    <Layout title="Nivel Snii">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Listado de Niveles Snii</h2>
          <button
            onClick={handleNew}
            className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900"
          >
            Nuevo Nivel Snii
          </button>
        </div>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <List<NivelSnii>
            columns={columns}
            data={niveles}
            rowKey="id"
            onEdit={(item) => {
              handleEdit(item);
              handleEditModal(item);
            }}
            onDelete={(item) => {
              if (window.confirm("¿Estás seguro de eliminar este nivel?")) {
                remove(item.id);
              }
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default NivelSniiPage;
