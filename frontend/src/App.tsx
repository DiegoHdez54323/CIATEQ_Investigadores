import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ArticulosPage from "./pages/ArticulosPage";
import ProyectosPage from "./pages/ProyectosPage";
import HerramientasPage from "./pages/HerramientasPage";
import LineasPage from "./pages/LineasPage";
import TipoEventosPage from "./pages/TipoEventosPage";
import CarrerasPage from "./pages/CarrerasPage";
import NivelSniiPage from "./pages/NivelSniiPage";
import TipoEstudiantePage from "./pages/TipoEstudiantesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/articulos" element={<ArticulosPage />} />
        <Route path="/proyectos" element={<ProyectosPage />} />
        <Route path="/herramientas" element={<HerramientasPage />} />
        <Route path="/lineas" element={<LineasPage />} />
        <Route path="/tipoeventos" element={<TipoEventosPage />} />
        <Route path="/carreras" element={<CarrerasPage />} />
        <Route path="/nivelsnii" element={<NivelSniiPage />} />
        <Route path="/tipoestudiante" element={<TipoEstudiantePage />} />
        <Route path="*" element={<Navigate to="/articulos" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
