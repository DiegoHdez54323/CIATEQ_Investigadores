import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import ArticulosPage from "./pages/ArticulosPage";
import ProyectosPage from "./pages/ProyectosPage";
import HerramientasPage from "./pages/HerramientasPage";
import LineasPage from "./pages/LineasPage";
import TipoEventosPage from "./pages/TipoEventosPage";
import CarrerasPage from "./pages/CarrerasPage";
import NivelSniiPage from "./pages/NivelSniiPage";
import TipoEstudiantePage from "./pages/TipoEstudiantesPage";
import InvestigadoresPage from "./pages/InvestigadoresPage";
import SniiPage from "./pages/SniiPage";
import EventosPage from "./pages/EventosPage";
import EstudiantesPage from "./pages/EstudiantesPage";
import DetArtPage from "./pages/DetArtPage";
import DetEventosPage from "./pages/DetEventosPage";
import DetLineasPage from "./pages/DetLineasPage";
import DetProyPage from "./pages/DetProyPage";
import DetHerrPage from "./pages/DetHerrPage";
import Login from "./pages/Login";
import CiateqDb from "./pages/CiateqDb";

import InvestigadoresProfilePage from "./pages/InvestigadoresProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/articulos" element={<ArticulosPage />} />
        <Route path="/proyectos" element={<ProyectosPage />} />
        <Route path="/herramientas" element={<HerramientasPage />} />
        <Route path="/lineas" element={<LineasPage />} />
        <Route path="/tipoeventos" element={<TipoEventosPage />} />
        <Route path="/carreras" element={<CarrerasPage />} />
        <Route path="/nivelsnii" element={<NivelSniiPage />} />
        <Route path="/tipoestudiante" element={<TipoEstudiantePage />} />
        <Route path="/investigadores" element={<InvestigadoresPage />} />
        <Route
          path="/investigadores/:id"
          element={<InvestigadoresProfilePage />}
        />
        <Route path="/snii" element={<SniiPage />} />
        <Route path="/eventos" element={<EventosPage />} />
        <Route path="/estudiantes" element={<EstudiantesPage />} />
        <Route path="/detart" element={<DetArtPage />} />
        <Route path="/deteventos" element={<DetEventosPage />} />
        <Route path="/detlineas" element={<DetLineasPage />} />
        <Route path="/detproy" element={<DetProyPage />} />
        <Route path="/detherr" element={<DetHerrPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/ciateqdb" element={<CiateqDb />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
