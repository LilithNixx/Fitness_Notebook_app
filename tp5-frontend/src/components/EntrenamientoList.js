// src/components/EntrenamientoList.jsx
import { useEffect, useState } from "react";
import { getEntrenamientos, eliminarEntrenamiento } from "../services/api";

export default function EntrenamientoList({ onEdit }) {
  const [entrenamientos, setEntrenamientos] = useState([]);

  // Al montar el componente, cargamos los entrenamientos
  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const datos = await getEntrenamientos();
    setEntrenamientos(datos);
  };

  const eliminar = async (id) => {
    await eliminarEntrenamiento(id);
    cargar();
  };

  return (
    <div className="container mt-4">

      {/* Título con fondo gris oscuro y letra amarilla */}
      <div style={{ backgroundColor: "#343a40", padding: "10px", borderRadius: "5px" }}>
        <h3
          className="text-center"
          style={{
            color: "#FFD700", // amarillo fuerte
            fontFamily: "'Orbitron', sans-serif", // estilo deportivo
            margin: 0
          }}
        >
          Entrenamientos
        </h3>
      </div>

      {/* Tabla de entrenamientos */}
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Ejercicios</th>
            <th>Series</th>
            <th>Reps</th>
            <th>Peso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {entrenamientos.map((e) => (
            <tr key={e.id_entrenamiento}>
              <td>{e.fecha}</td>
              <td>{e.ejercicios}</td>
              <td>{e.series}</td>
              <td>{e.repeticiones}</td>
              <td>{e.peso}</td>
              <td>
                <button className="btn btn-sm btn-editar me-2" onClick={() => onEdit(e)}>
                <i className="bi bi-pencil-fill me-1"></i> Editar
              </button>
              <button className="btn btn-sm btn-eliminar" onClick={() => eliminar(e.id_entrenamiento)}>
                <i className="bi bi-trash-fill me-1"></i> Eliminar
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
