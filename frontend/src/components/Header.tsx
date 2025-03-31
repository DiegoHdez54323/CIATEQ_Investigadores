import React from "react";
import { Menu } from "lucide-react";

interface HeaderProps {
  title: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center bg-white px-6 shadow-sm ">
      <div className="flex w-full items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mr-4 rounded-md p-1 text-slate-600 hover:bg-slate-100 "
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="relative">
          <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
          <div className="absolute -bottom-2 left-0 h-1 w-12 rounded-full bg-red-800"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
