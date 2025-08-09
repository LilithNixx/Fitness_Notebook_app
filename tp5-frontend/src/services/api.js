const API_BASE = process.env.production.REACT_APP_API_BASE_URL || '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function crearUsuario(data) {
  const res = await fetch(`${API_BASE}/usuarios/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Error al crear usuario');
  }
  return res.json();
}

export async function getEntrenamientos() {
  const response = await fetch(`${API_BASE}/entrenamientos/`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }

  return await response.json();
}

export async function crearEntrenamiento(data) {
  const res = await fetch(`${API_BASE}/entrenamientos/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Error al crear entrenamiento');
  }
  return res.json();
}

export async function eliminarEntrenamiento(id) {
  const res = await fetch(`${API_BASE}/entrenamientos/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al eliminar: ${errorText}`);
  }
}

export async function editarEntrenamiento(id, data) {
  const res = await fetch(`${API_BASE}/entrenamientos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Error al editar entrenamiento');
  }
  return res.json();
}
