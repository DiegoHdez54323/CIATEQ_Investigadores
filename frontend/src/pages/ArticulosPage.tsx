import React from "react";
import Layout from "../components/Layout";
import List, { Column } from "../components/List";
import ArticuloForm from "../components/forms/ArticuloForm";
import { useModal } from "../context/ModalContext";
import useCrudActions from "../hooks/useCrudActions";

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

const API_URL = "http://127.0.0.1:8000/gestion/api/articulos/";

const ArticulosPage: React.FC = () => {
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
  } = useCrudActions<Articulo>(API_URL);

  const { openModal, closeModal } = useModal();

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleNew = () => {
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
    { header: "Nombre", accessor: "nombre" },
    { header: "Fecha Publicación", accessor: "fecha_publicacion" },
    { header: "DOI", accessor: "doi" },
    { header: "URL", accessor: "url" },
    { header: "Nombre Revista", accessor: "nombre_revista" },
    { header: "País Publicación", accessor: "pais_publicacion" },
    { header: "Año Publicación", accessor: "anio_publicacion" },
  ];

  return (
    <Layout title="Artículos">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Listado de Artículos</h2>
          <button
            onClick={handleNew}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Nuevo Artículo
          </button>
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
            onEdit={(item) => {
              handleEdit(item);
              handleEditModal(item);
            }}
            onDelete={(item) => {
              if (window.confirm("¿Estás seguro de eliminar este artículo?"))
                remove(item.id);
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default ArticulosPage;
