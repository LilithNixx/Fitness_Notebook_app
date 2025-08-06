// src/api.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

export async function fetchUsuarios() {
  const response = await fetch(`${API_BASE_URL}/usuarios/`);
  if (!response.ok) {
    throw new Error('Error al obtener usuarios');
  }
  return response.json();
}
