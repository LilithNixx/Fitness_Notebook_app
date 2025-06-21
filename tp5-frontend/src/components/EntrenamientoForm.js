// src/components/EntrenamientoForm.jsx
import { useState, useEffect } from "react";
import { crearEntrenamiento, editarEntrenamiento } from "../services/api";

// IMPORTANTE: asegurate de haber incluido Orbitron en index.html o App.css
// <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap" rel="stylesheet" />

export default function EntrenamientoForm({ entrenamientoEnEdicion, onGuardado }) {
  const [form, setForm] = useState({
    fecha: "",
    ejercicio: "",
    series: 0,
    repeticiones: 0,
    peso: 0,
  });

  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

  useEffect(() => {
    if (entrenamientoEnEdicion) {
      setForm(entrenamientoEnEdicion);
    }
  }, [entrenamientoEnEdicion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validar = () => {
    const errores = {};
    if (!form.fecha) errores.fecha = "La fecha es obligatoria";
    if (!form.ejercicio.trim()) errores.ejercicio = "El ejercicio es obligatorio";
    if (form.series <= 0) errores.series = "Las series deben ser mayores que 0";
    if (form.repeticiones <= 0) errores.repeticiones = "Las repeticiones deben ser mayores que 0";
    if (form.peso <= 0) errores.peso = "El peso debe ser mayor que 0";
    return errores;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const erroresEncontrados = validar();
    if (Object.keys(erroresEncontrados).length > 0) {
      setErrores(erroresEncontrados);
      setMensaje({ texto: "", tipo: "" });
      return;
    }

    setErrores({});
    try {
      if (entrenamientoEnEdicion) {
        await editarEntrenamiento(entrenamientoEnEdicion.id_entrenamiento, form);
        setMensaje({ texto: "Entrenamiento actualizado correctamente.", tipo: "success" });
      } else {
        await crearEntrenamiento(form);
        setMensaje({ texto: "Entrenamiento creado correctamente.", tipo: "success" });
      }
      onGuardado();
      setForm({ fecha: "", ejercicio: "", series: 0, repeticiones: 0, peso: 0 });
    } catch (error) {
      console.error(error);
      setMensaje({ texto: "Ocurrió un error al guardar el entrenamiento.", tipo: "danger" });
    }
  };

  return (
    <div className="container mt-4">
      {/* Franja de título con fondo gris oscuro y fuente deportiva */}
      <div style={{ backgroundColor: "#343a40", padding: "10px", borderRadius: "5px" }}>
        <h3
          className="text-center"
          style={{
            color: "#FFD700", // amarillo
            fontFamily: "'Orbitron', sans-serif",
            margin: 0,
          }}
        >
          {entrenamientoEnEdicion ? "Editar" : "Nuevo"} Entrenamiento
        </h3>
      </div>

      {/* Mensaje de alerta */}
      {mensaje.texto && (
        <div className={`alert alert-${mensaje.tipo} mt-3`} role="alert">
          {mensaje.texto}
        </div>
      )}

      {/* Formulario con campos y validaciones */}
      <form onSubmit={handleSubmit} className="mt-3">
        {/* Campos de entrada (estándar) */}
        {["fecha", "ejercicio", "series", "repeticiones", "peso"].map((campo, i) => (
          <div className="mb-3" key={i}>
            <label className="form-label text-dark">
              {campo.charAt(0).toUpperCase() + campo.slice(1)} {campo === "peso" && "(kg)"}
            </label>
            <input
              type={campo === "fecha" ? "date" : campo === "ejercicio" ? "text" : "number"}
              name={campo}
              className={`form-control ${errores[campo] ? "is-invalid" : ""}`}
              value={form[campo]}
              onChange={handleChange}
            />
            {errores[campo] && <div className="invalid-feedback">{errores[campo]}</div>}
          </div>
        ))}

        {/* Botón de enviar: fondo gris oscuro, letras amarillas */}
        <button
          className="btn"
          style={{
            backgroundColor: "#4a4a4a",
            color: "#FFD700",
            fontWeight: "bold",
            border: "none",
          }}
          type="submit"
        >
          {entrenamientoEnEdicion ? "Actualizar" : "Crear"}
        </button>

        {/* Botón de cancelar con mismo estilo */}
        {entrenamientoEnEdicion && (
          <button
            type="button"
            className="btn ms-2"
            style={{
              backgroundColor: "#6c757d",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
            }}
            onClick={() => {
              setForm({ fecha: "", ejercicio: "", series: 0, repeticiones: 0, peso: 0 });
              setMensaje({ texto: "", tipo: "" });
            }}
          >
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
}
