// src/pages/TipoEstudiantePage.tsx
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import List, { Column } from "../components/List";
import useCrudActions from "../hooks/useCrudActions";
import { useModal } from "../context/ModalContext";
import TipoEstudianteForm from "../components/forms/TIpoEstudianteForm";

interface TipoEstudiante {
  id: number;
  descripcion: string;
}

const API_URL = "http://127.0.0.1:8000/gestion/api/tipoestudiante/";

const TipoEstudiantePage: React.FC = () => {
  const {
    data: tipos,
    loading,
    error,
    fetchData,
    create,
    update,
    remove,
    editingItem,
    setEditingItem,
    handleEdit,
  } = useCrudActions<TipoEstudiante>(API_URL);

  const { openModal, closeModal } = useModal();

  useEffect(() => {
    fetchData();
  }, []);

  const handleNew = () => {
    setEditingItem(null);
    openModal(
      <TipoEstudianteForm
        tipoEstudiante={null}
        onClose={closeModal}
        onSubmit={async (data) => {
          await create(data);
          closeModal();
        }}
      />,
      "Nuevo Tipo Estudiante"
    );
  };

  const handleEditModal = (item: TipoEstudiante) => {
    setEditingItem(item);
    openModal(
      <TipoEstudianteForm
        tipoEstudiante={item}
        onClose={closeModal}
        onSubmit={async (data) => {
          await update(item.id, data);
          closeModal();
        }}
      />,
      "Editar Tipo Estudiante"
    );
  };

  const columns: Column<TipoEstudiante>[] = [
    { header: "ID", accessor: "id" },
    { header: "Descripción", accessor: "descripcion" },
  ];

  return (
    <Layout title="Tipo Estudiante">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Listado de Tipos de Estudiante</h2>
          <button
            onClick={handleNew}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Nuevo Tipo Estudiante
          </button>
        </div>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <List<TipoEstudiante>
            columns={columns}
            data={tipos}
            rowKey="id"
            onEdit={(item) => {
              handleEdit(item);
              handleEditModal(item);
            }}
            onDelete={(item) => {
              if (window.confirm("¿Estás seguro de eliminar este tipo?")) {
                remove(item.id);
              }
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default TipoEstudiantePage;
