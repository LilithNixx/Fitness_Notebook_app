// src/pages/EstadoAnimoPage.js
import React, { useState, useEffect } from 'react';
import './EstadoAnimoPage.css';

function EstadoAnimoPage() {
  const [estados, setEstados] = useState([]);
  const [formData, setFormData] = useState({
    fecha: '',
    estado_animo: '',
    siente_progreso: false,
    motivacion: 5,
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEstados();
  }, []);

  const fetchEstados = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://127.0.0.1:8000/api/estadoanimo/', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        console.error('Error al cargar estados:', res.statusText);
        return;
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        console.error('Datos recibidos no son un array:', data);
        return;
      }

      setEstados(data); // ✅ ahora sí dentro de la función
    } catch (error) {
      console.error('Error al hacer fetch de estados:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editId
      ? `http://127.0.0.1:8000/api/estadoanimo/${editId}`
      : 'http://127.0.0.1:8000/api/estadoanimo/';
    const method = editId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        console.error('Error al guardar el estado:', res.statusText);
        return;
      }

      setFormData({ fecha: '', estado_animo: '', siente_progreso: false, motivacion: 5 });
      setEditId(null);
      fetchEstados();
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/estadoanimo/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        console.error('Error al eliminar el estado:', res.statusText);
        return;
      }

      fetchEstados();
    } catch (error) {
      console.error('Error al eliminar estado:', error);
    }
  };

  const handleEdit = (estado) => {
    setEditId(estado.id_estado);
    setFormData({
      fecha: estado.fecha,
      estado_animo: estado.estado_animo,
      siente_progreso: estado.siente_progreso,
      motivacion: estado.motivacion,
    });
  };

  return (
    <div className="estado-container">
      <h2>Estado de Ánimo</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="estado_animo"
          placeholder="Estado de ánimo"
          value={formData.estado_animo}
          onChange={handleChange}
          required
        />
        <label>
          <input
            type="checkbox"
            name="siente_progreso"
            checked={formData.siente_progreso}
            onChange={handleChange}
          />
          Siente progreso
        </label>
        <label>
          Motivación:
          <input
            type="number"
            name="motivacion"
            min="1"
            max="10"
            value={formData.motivacion}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">{editId ? 'Actualizar' : 'Agregar'} estado</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Siente progreso</th>
            <th>Motivación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estados.map((e) => (
            <tr key={e.id_estado}>
              <td>{e.fecha}</td>
              <td>{e.estado_animo}</td>
              <td>{e.siente_progreso ? 'Sí' : 'No'}</td>
              <td>{e.motivacion}</td>
              <td>
                <button onClick={() => handleEdit(e)}>✏️</button>
                <button onClick={() => handleDelete(e.id_estado)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EstadoAnimoPage;
