import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import List, { Column } from "../components/List";
import useCrudActions from "../hooks/useCrudActions";
import { useModal } from "../context/ModalContext";
import InvestigadorForm from "../components/forms/InvestigadorForm";
import SortButton from "../components/SortButton";
import { withOrderingAndFilter } from "../hoc/withOrderingAndFilter";
import { buildUrl } from "../utils/buildUrl";

interface InvestigadoresPageProps {
  ordering: string;
  toggleOrdering: (field: string) => void;
  filters: { [key: string]: string | null };
  setFilter: (field: string, value: string | null) => void;
  clearFilters: () => void;
}

interface Investigador {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  sueldo: number;
}

const BASE_API_URL = "http://127.0.0.1:8000/gestion/api/investigadores/";

const InvestigadoresPage: React.FC<InvestigadoresPageProps> = ({
  ordering,
  toggleOrdering,
}) => {
  // Construimos la URL dinámica con el parámetro de ordenación
  const apiUrl = buildUrl(BASE_API_URL, { ordering: ordering });

  // Usamos el hook de CRUD pasándole la URL dinámica
  const {
    data: investigadores,
    loading,
    error,
    fetchData,
    create,
    update,
    remove,
    editingItem,
    setEditingItem,
    handleEdit,
  } = useCrudActions<Investigador>(apiUrl);

  const { openModal, closeModal } = useModal();

  // Re-fetch cada vez que cambia la ordenación
  useEffect(() => {
    fetchData();
  }, [ordering]);

  const handleNew = () => {
    setEditingItem(null);
    openModal(
      <InvestigadorForm
        investigador={null}
        onClose={closeModal}
        onSubmit={async (data) => {
          await create(data);
          closeModal();
        }}
      />,
      "Nuevo Investigador"
    );
  };

  const handleEditModal = (item: Investigador) => {
    setEditingItem(item);
    openModal(
      <InvestigadorForm
        investigador={item}
        onClose={closeModal}
        onSubmit={async (data) => {
          await update(item.id, data);
          closeModal();
        }}
      />,
      "Editar Investigador"
    );
  };

  // Definición de columnas: en "ID" y "Sueldo" agregamos botones para ordenar
  const columns: Column<Investigador>[] = [
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
    { header: "Apellido", accessor: "apellido" },
    { header: "Teléfono", accessor: "telefono" },
    { header: "Correo", accessor: "correo" },
    {
      header: (
        <div className="flex items-center">
          <span>Sueldo</span>
          <SortButton
            field="sueldo"
            ordering={ordering}
            toggleOrdering={toggleOrdering}
          />
        </div>
      ),
      accessor: "sueldo",
    },
  ];

  return (
    <Layout title="Investigadores">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Listado de Investigadores</h2>
          <button
            onClick={handleNew}
            className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900"
          >
            Nuevo Investigador
          </button>
        </div>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <List<Investigador>
            columns={columns}
            data={investigadores}
            rowKey="id"
            onEdit={(item) => {
              handleEdit(item);
              handleEditModal(item);
            }}
            onDelete={(item) => {
              if (
                window.confirm("¿Estás seguro de eliminar este investigador?")
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

export default withOrderingAndFilter(InvestigadoresPage);
