// src/services/api.js

const API_BASE = "http://127.0.0.1:8000/api";

export async function getEntrenamientos() {
  const res = await fetch(`${API_BASE}/entrenamientos/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
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
