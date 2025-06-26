// src/services/api.js

const API_BASE = "http://127.0.0.1:8000/api";

export async function crearUsuario(data) {
  const res = await fetch(`${API_BASE}/usuarios/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Error al crear usuario");
  }
  return res.json();
}

export async function getEntrenamientos() {
  const token = localStorage.getItem("token");
  const response = await fetch("http://127.0.0.1:8000/api/entrenamientos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }

  return await response.json();
}

export async function crearEntrenamiento(data) {
  const res = await fetch(`${API_BASE}/entrenamientos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function eliminarEntrenamiento(id) {
  await fetch(`${API_BASE}/entrenamientos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export async function editarEntrenamiento(id, data) {
  const res = await fetch(`${API_BASE}/entrenamientos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
