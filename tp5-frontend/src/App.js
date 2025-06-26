// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import EntrenamientosPage from "./pages/EntrenamientosPage";
import NavBar from "./components/NavBar"; 
import MedidasCorporalesPage from './pages/MedidasCorporalesPage';
import EstadoAnimoPage from './pages/EstadoAnimoPage';
import AlimentacionPage from './pages/AlimentacionPage';
import AnalisisEntrenamientosPage from './pages/AnalisisEntrenamientosPage';
import Register from "./pages/Register";

function AppContent() {
  const location = useLocation();

  // Ocultar navbar si estamos en "/" (login)
  const hideNavbarPaths = ['/'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <NavBar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/entrenamientos" element={<EntrenamientosPage />} />
        <Route path="/bienvenida" element={
          <h1 className="text-center mt-5">Bienvenido/a a tu Fitness Notebook 🧠🏋️</h1>
        } />
        <Route path="/medidas-corporales" element={<MedidasCorporalesPage />} />
        <Route path="/estado-animo" element={<EstadoAnimoPage />} />
        <Route path="/alimentacion" element={<AlimentacionPage />} />
        <Route path="/analisis-entrenamientos" element={<AnalisisEntrenamientosPage />} />
        <Route path="/registro" element={<Register />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <div style={{ backgroundColor: "#cccccc", minHeight: "100vh" }}>
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

export default App;
