import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function EvolucionPesoChart() {
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
      setData(medidas.reverse()); // Fechas más antiguas primero
    };

    fetchMedidas();
  }, []);

  return (
    <div className="chart-card">
      <h3 className="chart-title">Evolución del Peso Corporal</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="peso_kg" stroke="#ff7300" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
