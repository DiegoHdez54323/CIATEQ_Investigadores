import React, { useEffect } from "react";
import Layout from "../components/Layout";
import List, { Column } from "../components/List";
import useCrudActions from "../hooks/useCrudActions";
import { useModal } from "../context/ModalContext";
import TipoEventoForm from "../components/forms/TipoEventoForm";

interface TipoEvento {
  id: number;
  descripcion: string;
}

const API_URL = "http://127.0.0.1:8000/gestion/api/tipoevento/";

const TipoEventosPage: React.FC = () => {
  const {
    data: tipoEventos,
    loading,
    error,
    fetchData,
    create,
    update,
    remove,
    editingItem,
    setEditingItem,
    handleEdit,
  } = useCrudActions<TipoEvento>(API_URL);

  const { openModal, closeModal } = useModal();

  useEffect(() => {
    fetchData();
  }, []);

  const handleNew = () => {
    setEditingItem(null);
    openModal(
      <TipoEventoForm
        tipoevento={null}
        onClose={closeModal}
        onSubmit={async (data) => {
          await create(data);
          closeModal();
        }}
      />,
      "Nuevo Tipo de Evento"
    );
  };

  const handleEditModal = (item: TipoEvento) => {
    setEditingItem(item);
    openModal(
      <TipoEventoForm
        tipoevento={item}
        onClose={closeModal}
        onSubmit={async (data) => {
          await update(item.id, data);
          closeModal();
        }}
      />,
      "Editar Tipo de Evento"
    );
  };

  const columns: Column<TipoEvento>[] = [
    { header: "ID", accessor: "id" },
    { header: "Descripción", accessor: "descripcion" },
  ];

  return (
    <Layout title="Tipo Eventos">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Listado de Tipos de Eventos</h2>
          <button
            onClick={handleNew}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Nuevo Tipo Evento
          </button>
        </div>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <List<TipoEvento>
            columns={columns}
            data={tipoEventos}
            rowKey="id"
            onEdit={(item) => {
              handleEdit(item);
              handleEditModal(item);
            }}
            onDelete={(item) => {
              if (
                window.confirm("¿Estás seguro de eliminar este tipo de evento?")
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

export default TipoEventosPage;
