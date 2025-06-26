import React, { useState } from "react";
import { crearUsuario } from "../services/api";
import './Register.css';

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    contraseña: "",
    genero: "femenino",
    fecha_nacimiento: "",
    peso_inicial: "",
    altura_cm: "",
    objetivo: "mantenerse",
    nivel_entrenamiento: "principiante",
  });

  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    try {
      // Preparamos datos con tipos correctos para opcionales
      const payload = {
        ...form,
        peso_inicial: form.peso_inicial ? parseFloat(form.peso_inicial) : undefined,
        altura_cm: form.altura_cm ? parseInt(form.altura_cm) : undefined,
        fecha_nacimiento: form.fecha_nacimiento || undefined,
      };
      await crearUsuario(payload);
      setExito("Usuario creado correctamente. Ya podés iniciar sesión.");
      setForm({
        nombre: "",
        email: "",
        contraseña: "",
        genero: "femenino",
        fecha_nacimiento: "",
        peso_inicial: "",
        altura_cm: "",
        objetivo: "mantenerse",
        nivel_entrenamiento: "principiante",
      });
    } catch (e) {
      setError(e.message || "Error al crear usuario");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Crear nuevo usuario</h2>

      {error && <p className="register-error">{error}</p>}
      {exito && <p className="register-success">{exito}</p>}

      <form className="register-form" onSubmit={handleSubmit}>

        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Contraseña:
          <input
            type="password"
            name="contraseña"
            value={form.contraseña}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Género:
          <select name="genero" value={form.genero} onChange={handleChange}>
            <option value="femenino">Femenino</option>
            <option value="masculino">Masculino</option>
            <option value="otro">Otro</option>
          </select>
        </label>

        <label>
          Fecha de nacimiento:
          <input
            type="date"
            name="fecha_nacimiento"
            value={form.fecha_nacimiento}
            onChange={handleChange}
          />
        </label>

        <label>
          Peso inicial (kg):
          <input
            type="number"
            step="0.1"
            name="peso_inicial"
            value={form.peso_inicial}
            onChange={handleChange}
          />
        </label>

        <label>
          Altura (cm):
          <input
            type="number"
            name="altura_cm"
            value={form.altura_cm}
            onChange={handleChange}
          />
        </label>

        <label>
          Objetivo:
          <select name="objetivo" value={form.objetivo} onChange={handleChange}>
            <option value="ganar_masa">Ganar masa</option>
            <option value="perder_grasa">Perder grasa</option>
            <option value="mantenerse">Mantenerse</option>
            <option value="otro">Otro</option>
          </select>
        </label>

        <label>
          Nivel de entrenamiento:
          <select
            name="nivel_entrenamiento"
            value={form.nivel_entrenamiento}
            onChange={handleChange}
          >
            <option value="principiante">Principiante</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>
        </label>

        <button className="register-button" type="submit">Crear usuario</button>
      </form>
    </div>
  );
}
