import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Settings,
  User,
  ChevronLeft,
} from "lucide-react";
import classNames from "classnames";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, to: "/" },
    { name: "Artículos", icon: FileText, to: "/articulos" },
    { name: "Proyectos", icon: BarChart3, to: "/proyectos" },
    { name: "Usuarios", icon: Users, to: "/usuarios" },
    { name: "Carreras", icon: FileText, to: "/carreras" },
    { name: "Nivel Snii", icon: FileText, to: "/nivelsnii" },
    { name: "Tipo Estudiante", icon: FileText, to: "/tipoestudiante" },
    { name: "Tipo Evento", icon: FileText, to: "/tipoeventos" },
    { name: "Herramientas", icon: FileText, to: "/herramientas" },
    { name: "Líneas", icon: FileText, to: "/lineas" },
    { name: "Investigadores", icon: Users, to: "/investigadores" },
    { name: "Snii", icon: FileText, to: "/snii" },
    { name: "Eventos", icon: FileText, to: "/eventos" },
    { name: "Estudiantes", icon: FileText, to: "/estudiantes" },
    // Tablas intermedias:
    { name: "Asignación de Artículos", icon: FileText, to: "/detart" },
    { name: "Asignación de Eventos", icon: FileText, to: "/deteventos" },
    { name: "Asignación de Herramientas", icon: FileText, to: "/detherr" },
    { name: "Asignación de Líneas", icon: FileText, to: "/detlineas" },
    { name: "Asignación de Proyectos", icon: FileText, to: "/detproy" },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={classNames(
          "fixed inset-y-0 left-0 z-30 w-64 transform bg-gradient-to-b from-indigo-600 to-indigo-800 shadow-lg transition-all duration-300 ease-in-out lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo y botón de colapso */}
          <div className="flex h-16 items-center justify-between border-b border-indigo-500/30 px-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-white text-indigo-600 flex items-center justify-center font-bold text-xl">
                A
              </div>
              <span className="ml-2 text-xl font-semibold text-white">
                AdminPanel
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
                      activeItem === item.name
                        ? "bg-indigo-700/50 text-white"
                        : "text-indigo-100 hover:bg-indigo-700/30"
                    )}
                    onClick={() => setActiveItem(item.name)}
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
                <p className="text-sm font-medium text-white">John Doe</p>
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
