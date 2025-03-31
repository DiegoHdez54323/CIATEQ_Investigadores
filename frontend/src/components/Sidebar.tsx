import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Settings,
  User,
  ChevronLeft,
  GraduationCap,
  FileType,
  IdCard,
  Hammer,
  Binoculars,
  Gem,
  Calendar,
  School,
  Newspaper,
  MailPlus,
} from "lucide-react";
import classNames from "classnames";
import ciateqLogo from "../assets/ciateqLogo.png";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [userName, setUserName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("Usuario");

  const location = useLocation();
  const navigate = useNavigate(); // Usamos useNavigate en lugar de useHistory

  useEffect(() => {
    // Obtener el usuario y su rol desde localStorage o sessionStorage
    const storedUser = localStorage.getItem("loggedUser") || sessionStorage.getItem("tempUser");
    const storedRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

    if (storedUser) {
      setUserName(storedUser);
    }

    if (storedRole) {
      setUserRole(storedRole === "admin" ? "Administrador" : "Usuario");
    }
  }, []);

  // Elementos de la navegación
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
    { name: "Investigadores", icon: Users, to: "/investigadores" },
    { name: "Proyectos", icon: BarChart3, to: "/proyectos" },
    { name: "Snii Registros", icon: Gem, to: "/snii" },
    { name: "Eventos", icon: Calendar, to: "/eventos" },
    { name: "Artículos", icon: Newspaper, to: "/articulos" },
    { name: "Estudiantes", icon: GraduationCap, to: "/estudiantes" },
    { name: "Carreras", icon: School, to: "/carreras" },
    { name: "Nivel Snii", icon: IdCard, to: "/nivelsnii" },
    { name: "Líneas", icon: Binoculars, to: "/lineas" },
    { name: "Herramientas", icon: Hammer, to: "/herramientas" },
    { name: "Tipo Estudiante", icon: FileType, to: "/tipoestudiante" },
    { name: "Tipo Evento", icon: FileType, to: "/tipoeventos" },
    // Elementos solo para administradores
    { name: "Asignación de Artículos", icon: MailPlus, to: "/detart" },
    { name: "Asignación de Eventos", icon: MailPlus, to: "/deteventos" },
    { name: "Asignación de Herramientas", icon: MailPlus, to: "/detherr" },
    { name: "Asignación de Líneas", icon: MailPlus, to: "/detlineas" },
    { name: "Asignación de Proyectos", icon: MailPlus, to: "/detproy" },
  ];

  const handleLogout = () => {
    // Borrar datos del usuario y redirigir a login
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("remindMe");
    localStorage.removeItem("userRole");
    sessionStorage.removeItem("tempUser");
    sessionStorage.removeItem("userRole");

    navigate("/login"); // Redirigir a la página de login
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={classNames(
          "flex-shrink-0 fixed inset-y-0 left-0 z-30 w-64 transform shadow-lg transition-all duration-300 ease-in-out lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
          userRole === "Administrador"
            ? "bg-gradient-to-b from-red-900 to-indigo-800" // Si es admin, degradado rojo a azul
            : "bg-gradient-to-b from-red-700 to-red-900" // Si no es admin, degradado rojo a rojo más oscuro
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo y botón de colapso */}
          <div className="flex h-16 items-center justify-between border-b border-indigo-500/30 px-4">
            <div className="flex items-center">
              <div className="h-13 w-13  flex items-center justify-center">
                <img src={ciateqLogo} alt="Logo" />
              </div>
              <span className="ml-2 text-xl font-semibold text-white">
                {userRole === "Administrador" ? "Admin Panel" : "User Panel"}
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md p-1 text-indigo-200 hover:bg-indigo-700/50 lg:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
          {/* Navegación */}
          <nav className="flex-1 overflow-y-auto p-4 hide-scrollbar">
            <ul className="space-y-2">
              {navItems.map((item) => (
                // Mostrar solo los elementos que son permitidos para el usuario
                (userRole === "Administrador" || (!item.name.includes("Tipo") && !item.name.includes("Asignación") && !["Nivel Snii", "Carreras", "Herramientas", "Líneas"].includes(item.name))) && (
                  <li key={item.name}>
                    <Link
                      to={item.to}
                      className={classNames(
                        "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        location.pathname === item.to
                          ? userRole === "Administrador" // Si es admin, se mantiene morado
                            ? "bg-indigo-700/50 text-white"
                            : "bg-red-500/50 text-white" // Si no es admin, se cambia a rojo
                          : "text-indigo-100 hover:bg-red-600/50"
                      )}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                )
              ))}
            </ul>
          </nav>
          {/* Perfil del usuario */}
          <div className="border-t border-indigo-500/30 p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-300"></div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{userName}</p>
                <p className="text-xs text-gray-300">{userRole}</p>
              </div>
            </div>
            {/* Botón de cerrar sesión */}
            <button
              onClick={handleLogout}
              className="mt-4 w-full py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;