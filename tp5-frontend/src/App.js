// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import EntrenamientosPage from "./pages/EntrenamientosPage";
import NavBar from "./components/NavBar"; 
import MedidasCorporalesPage from './pages/MedidasCorporalesPage';
import EstadoAnimoPage from './pages/EstadoAnimoPage';
import AlimentacionPage from './pages/AlimentacionPage';

function App() {
  return (
     <div style={{ backgroundColor: "#cccccc", minHeight: "100vh" }}>
      <Router>
        {/* Navbar siempre visible */}
        <NavBar />

        <Routes>
          {/* Ruta para login, que es la página raíz '/' */}
          <Route path="/" element={<Login />} />

          {/* Ruta para la página principal /inicio */}
          <Route path="/inicio" element={<Home />} />

          {/* Ruta para entrenamientos */}
          <Route path="/entrenamientos" element={<EntrenamientosPage />} />

          {/* Ruta para bienvenida */}
          <Route path="/bienvenida" element={
            <h1 className="text-center mt-5">Bienvenido/a a tu Fitness Notebook 🧠🏋️</h1>
          } />

          {/* Ruta para medidas corporales */}
          <Route path="/medidas-corporales" element={<MedidasCorporalesPage />} />

          {/* Rutas para estado de animo */}
          <Route path="/estado-animo" element={<EstadoAnimoPage />} />

          {/* Ruta para alimentación */}
          <Route path="/alimentacion" element={<AlimentacionPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
