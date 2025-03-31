import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
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

  const location = useLocation();

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
    // Tablas intermedias:
    { name: "Asignación de Artículos", icon: MailPlus, to: "/detart" },
    { name: "Asignación de Eventos", icon: MailPlus, to: "/deteventos" },
    { name: "Asignación de Herramientas", icon: MailPlus, to: "/detherr" },
    { name: "Asignación de Líneas", icon: MailPlus, to: "/detlineas" },
    { name: "Asignación de Proyectos", icon: MailPlus, to: "/detproy" },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={classNames(
          "flex-shrink-0 fixed inset-y-0 left-0 z-30 w-64 transform bg-gradient-to-b from-red-900 to-indigo-800 shadow-lg transition-all duration-300 ease-in-out lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
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
                Admin Panel
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
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className={classNames(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      location.pathname === item.to
                        ? "bg-indigo-700/50 text-white"
                        : "text-indigo-100 hover:bg-indigo-700/30"
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {/* Perfil del usuario */}
          <div className="border-t border-indigo-500/30 p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-indigo-300"></div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Admin</p>
                <p className="text-xs text-indigo-200">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
