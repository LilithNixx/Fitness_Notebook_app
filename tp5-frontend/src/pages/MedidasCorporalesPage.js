// src/pages/MedidasCorporalesPage.js
import React, { useEffect, useState } from 'react';
import './MedidasCorporalesPage.css';

function MedidasCorporalesPage() {
  const [medidas, setMedidas] = useState([]);
  const [formData, setFormData] = useState({
    id_fecha: '',
    peso_kg: '',
    brazo_cm: '',
    pierna_cm: '',
    cintura_cm: '',
    cadera_cm: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMedidas();
  }, []);

  const fetchMedidas = async () => {
    const token = localStorage.getItem('token');
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/medidas/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    setMedidas(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editId
      ? `${process.env.REACT_APP_API_BASE_URL}/api/medidas/${editId}`
      : `${process.env.REACT_APP_API_BASE_URL}/api/medidas/`;
    const method = editId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    setFormData({
      id_fecha: '',
      peso_kg: '',
      brazo_cm: '',
      pierna_cm: '',
      cintura_cm: '',
      cadera_cm: ''
    });
    setEditId(null);
    fetchMedidas();
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
  await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/medidas/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    fetchMedidas();
  };

  const handleEdit = (medida) => {
    setEditId(medida.id_medida);
    setFormData({
      id_fecha: medida.fecha,
      peso_kg: medida.peso_kg,
      brazo_cm: medida.brazo_cm,
      pierna_cm: medida.pierna_cm,
      cintura_cm: medida.cintura_cm,
      cadera_cm: medida.cadera_cm
    });
  };

  return (
    <div className="medidas-container">
      <h2 className="medidas-title">Medidas Corporales</h2>
      <form onSubmit={handleSubmit} className="medidas-form">
        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
        <input type="number" step="any" name="peso_kg" placeholder="Peso (kg)" value={formData.peso_kg} onChange={handleChange} />
        <input type="number" step="any" name="brazo_cm" placeholder="Brazo (cm)" value={formData.brazo_cm} onChange={handleChange} />
        <input type="number" step="any" name="pierna_cm" placeholder="Pierna (cm)" value={formData.pierna_cm} onChange={handleChange} />
        <input type="number" step="any" name="cintura_cm" placeholder="Cintura (cm)" value={formData.cintura_cm} onChange={handleChange} />
        <input type="number" step="any" name="cadera_cm" placeholder="Cadera (cm)" value={formData.cadera_cm} onChange={handleChange} />
        <button type="submit">
          {editId ? 'Actualizar' : 'Agregar'} medida
        </button>
      </form>

      <div className="medidas-list">
        <table className="medidas-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Peso</th>
              <th>Brazo</th>
              <th>Pierna</th>
              <th>Cintura</th>
              <th>Cadera</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medidas.map((m) => (
              <tr key={m.id_medida} className="medidas-item">
                <td>{m.fecha}</td>
                <td>{m.peso_kg}</td>
                <td>{m.brazo_cm}</td>
                <td>{m.pierna_cm}</td>
                <td>{m.cintura_cm}</td>
                <td>{m.cadera_cm}</td>
                <td>
                  <button onClick={() => handleEdit(m)}>✏️</button>
                  <button onClick={() => handleDelete(m.id_medida)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MedidasCorporalesPage;
