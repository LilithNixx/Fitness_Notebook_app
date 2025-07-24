import React from "react";

function AlimentacionList({ registros, onEditar, onEliminar }) {
  if (registros.length === 0) return <p>No hay registros.</p>;

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Calorías</th>
          <th>Proteínas (g)</th>
          <th>Agua (L)</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {registros.map((registro) => (
          <tr key={registro.id}>
            <td>{registro.fecha}</td>
            <td>{registro.calorias}</td>
            <td>{registro.proteinas}</td>
            <td>{registro.agua_litros}</td>
            <td>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => onEditar(registro)}
              >
                <i className="bi bi-pencil-fill me-1"></i> Editar
                
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onEliminar(registro.id)}
              >
                <i className="bi bi-trash-fill me-1"></i> Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AlimentacionList;
