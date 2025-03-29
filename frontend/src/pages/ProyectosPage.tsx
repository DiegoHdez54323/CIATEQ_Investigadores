import React, { useEffect } from "react";
import Layout from "../components/Layout";
import List, { Column } from "../components/List";
import ProyectoForm from "../components/forms/ProyectoForm";
import { useModal } from "../context/ModalContext";
import useCrudActions from "../hooks/useCrudActions";

interface Proyecto {
  id: number;
  nombre: string;
  fecha_inicio: string;
  fecha_termino: string;
  ingresos: number;
}

const API_URL = "http://127.0.0.1:8000/gestion/api/proyectos/";

const ProyectosPage: React.FC = () => {
  // Hook CRUD para proyectos
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

  // Hook para abrir/cerrar el modal global
  const { openModal, closeModal } = useModal();

  // Al montar el componente, cargamos la lista de proyectos
  useEffect(() => {
    fetchData();
  }, []);

  // Crear un proyecto nuevo
  const handleNew = () => {
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

  // Editar un proyecto existente
  const handleEditModal = (item: Proyecto) => {
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

  // Definición de columnas para la lista
  const columns: Column<Proyecto>[] = [
    { header: "ID", accessor: "id" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Fecha Inicio", accessor: "fecha_inicio" },
    { header: "Fecha Término", accessor: "fecha_termino" },
    { header: "Ingresos", accessor: "ingresos" },
  ];

  return (
    <Layout title="Proyectos">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Listado de Proyectos</h2>
          <button
            onClick={handleNew}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Nuevo Proyecto
          </button>
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
            onEdit={(item) => {
              handleEdit(item); // por si usas la misma lógica que en Articulos
              handleEditModal(item);
            }}
            onDelete={(item) => {
              if (window.confirm("¿Estás seguro de eliminar este proyecto?")) {
                remove(item.id);
              }
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default ProyectosPage;
