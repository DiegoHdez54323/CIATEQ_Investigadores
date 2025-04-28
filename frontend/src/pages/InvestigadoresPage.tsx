import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  // verifica si la sesion está iniciada, si no redirige a login
  const isLoggedIn =
    localStorage.getItem("loggedUser") || sessionStorage.getItem("tempUser");
  if (!isLoggedIn) {
    alert("Inicia sesión para acceder a esta página.");
    window.location.href = "/login";
  }

  // Estado admin
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const role =
      localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
    setIsAdmin(role === "admin");
  }, []);

  const apiUrl = buildUrl(BASE_API_URL, { ordering });
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

  useEffect(() => {
    fetchData();
  }, [ordering]);

  const handleNew = () => {
    if (!isAdmin) return;
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
    if (!isAdmin) return;
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
          {isAdmin && (
            <button
              onClick={handleNew}
              className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900"
            >
              Nuevo Investigador
            </button>
          )}
        </div>

        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {investigadores.map((inv) => (
              <div
                key={inv.id}
                className="bg-white shadow-md rounded-lg p-4 flex items-start space-x-4 transform transition-transform duration-200 hover:scale-105 cursor-pointer"
                onClick={() => navigate(`/investigadores/${inv.id}`)}
              >
                <img
                  src="https://www.gravatar.com/avatar/?d=mp&s=64"
                  alt="Foto de perfil"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <h3
                    className="text-lg font-bold text-gray-900 mb-1 truncate"
                    title={`${inv.nombre} ${inv.apellido}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(
                        `${inv.nombre} ${inv.apellido}`
                      );
                    }}
                  >
                    {`${inv.nombre} ${inv.apellido}`}
                  </h3>
                  <p
                    className="text-sm text-gray-600 truncate"
                    title={inv.telefono}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(inv.telefono);
                    }}
                  >
                    <span className="font-medium">Teléfono:</span>{" "}
                    {inv.telefono}
                  </p>
                  <p
                    className="text-sm text-gray-600 truncate"
                    title={inv.correo}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(inv.correo);
                    }}
                  >
                    <span className="font-medium">Correo:</span> {inv.correo}
                  </p>
                  <p
                    className="text-sm text-gray-600 truncate"
                    title={inv.sueldo.toString()}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(inv.sueldo.toString());
                    }}
                  >
                    <span className="font-medium">Sueldo:</span> ${inv.sueldo}
                  </p>

                  {isAdmin && (
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(inv);
                          handleEditModal(inv);
                        }}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            window.confirm(
                              "¿Estás seguro de eliminar este investigador?"
                            )
                          ) {
                            remove(inv.id);
                          }
                        }}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withOrderingAndFilter(InvestigadoresPage);
