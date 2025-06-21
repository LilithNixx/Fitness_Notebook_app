// src/pages/Entrenamientos.jsx
import EntrenamientoList from "../components/EntrenamientoList";
import EntrenamientoForm from "../components/EntrenamientoForm";
import { useState } from "react";
import "../styles/custom.css"; // Importamos los estilos personalizados

export default function Entrenamientos() {
  const [entrenamientoEditar, setEntrenamientoEditar] = useState(null);
  const [actualizar, setActualizar] = useState(false);

  const recargar = () => {
    setActualizar(!actualizar);
    setEntrenamientoEditar(null);
  };

  return (
    <div className="container mt-4" style={{ backgroundColor: "var(--color-gris-claro)", padding: "20px", borderRadius: "8px" }}>
      {/* Título principal con texto amarillo y centrado */}
      <h1 className="text-center text-amarillo mb-4">Registro de Entrenamientos</h1>

      {/* Formulario para crear/editar entrenamientos */}
      <EntrenamientoForm
        entrenamientoEnEdicion={entrenamientoEditar}
        onGuardado={recargar}
      />

      {/* Lista de entrenamientos con botón de editar */}
      <EntrenamientoList key={actualizar} onEdit={setEntrenamientoEditar} />
    </div>
  );
}
