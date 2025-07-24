import React, { useEffect, useState } from "react";

function AlimentacionForm({ onGuardar, registro }) {
  const [fecha, setFecha] = useState("");
  const [calorias, setCalorias] = useState("");
  const [proteinas, setProteinas] = useState("");
  const [agua_litros, setAguaLitros] = useState("");

  useEffect(() => {
    if (registro) {
      setFecha(registro.fecha || "");
      setCalorias(registro.calorias || "");
      setProteinas(registro.proteinas || "");
      setAguaLitros(registro.agua_litros || "");
    } else {
      setFecha("");
      setCalorias("");
      setProteinas("");
      setAguaLitros("");
    }
  }, [registro]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que fecha no esté vacía y que los números sean positivos si querés

    onGuardar({
      id: registro?.id_alimentacion,  // Asegurate que es id_alimentacion o id según tu API
      fecha,
      calorias: Number(calorias),
      proteinas: Number(proteinas),
      agua_litros: Number(agua_litros),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        required
        className="form-control mb-2"
      />
      <input
        type="number"
        value={calorias}
        onChange={(e) => setCalorias(e.target.value)}
        placeholder="Calorías"
        min="0"
        required
        className="form-control mb-2"
      />
      <input
        type="number"
        value={proteinas}
        onChange={(e) => setProteinas(e.target.value)}
        placeholder="Proteínas (g)"
        min="0"
        required
        className="form-control mb-2"
      />
      <input
        type="number"
        value={agua_litros}
        onChange={(e) => setAguaLitros(e.target.value)}
        placeholder="Agua (L)"
        step="0.01"
        min="0"
        required
        className="form-control mb-2"
      />
      <button type="submit" className="btn btn-success">
        {registro ? "Actualizar" : "Agregar"}
      </button>
      {registro && (
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => onGuardar(null)}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}

export default AlimentacionForm;
