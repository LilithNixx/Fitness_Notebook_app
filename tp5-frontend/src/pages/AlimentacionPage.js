import React, { useState, useEffect } from "react";
import AlimentacionForm from "../components/AlimentacionForm";
import AlimentacionList from "../components/AlimentacionList";

function AlimentacionPage() {
  const [registros, setRegistros] = useState([]);
  const [registroEditando, setRegistroEditando] = useState(null);

  const token = localStorage.getItem("token");

  const fetchRegistros = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/alimentacion/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setRegistros(data);
  };

  useEffect(() => {
    fetchRegistros();
  }, []);

  const handleGuardar = async (registro) => {
    const url = registro.id
      ? `${process.env.REACT_APP_API_BASE_URL}/api/alimentacion/${registro.id}/`
      : `${process.env.REACT_APP_API_BASE_URL}/api/alimentacion/`;

    const method = registro.id ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(registro),
    });

    if (response.ok) {
      setRegistroEditando(null);
      fetchRegistros();
    } else {
      alert("Error al guardar el registro");
    }
  };

  const handleEliminar = async (id) => {
    const confirmacion = window.confirm("¿Seguro que querés eliminar este registro?");
    if (!confirmacion) return;

  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/alimentacion/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      fetchRegistros();
    } else {
      alert("Error al eliminar el registro");
    }
  };

  const handleEditar = (registro) => {
    setRegistroEditando(registro);
  };

  return (
    <div className="container mt-4">
      <h2>Alimentación</h2>
      <AlimentacionForm onGuardar={handleGuardar} registro={registroEditando} />
      <AlimentacionList registros={registros} onEditar={handleEditar} onEliminar={handleEliminar} />
    </div>
  );
}

export default AlimentacionPage;
