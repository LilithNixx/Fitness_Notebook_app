import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

export default function CircunferenciasChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMedidas = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://127.0.0.1:8000/api/medidas/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const medidas = await res.json();
      setData(medidas.reverse());
    };

    fetchMedidas();
  }, []);

  return (
    <div className="chart-card">
      <h3 className="chart-title">Evolución de Circunferencias</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="brazo_cm" stroke="#8884d8" />
          <Line type="monotone" dataKey="pierna_cm" stroke="#82ca9d" />
          <Line type="monotone" dataKey="cintura_cm" stroke="#ffc658" />
          <Line type="monotone" dataKey="cadera_cm" stroke="#ff8042" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
