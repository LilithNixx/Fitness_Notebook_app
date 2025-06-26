// ✅ VolumenChart.jsx
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function VolumenChart() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://127.0.0.1:8000/api/entrenamientos/volumen', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Error al obtener datos de volumen');

        const json = await res.json();
        setData(json);
      } catch (e) {
        setError(e.message);
      }
    }

    fetchData();
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!data.length) return <p>Cargando volumen...</p>;

  const etiquetas = data.map((_, i) => `Semana ${i + 1}`);
  const valores = data.map(d => d.volumen);

  const chartData = {
    labels: etiquetas,
    datasets: [
      {
        label: 'Volumen semanal (kg)',
        data: valores,
        backgroundColor: '#4f8df7',
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        title: { display: true, text: 'Semana' },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Volumen (series × repeticiones × kg)' },
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">📊 Volumen de entrenamiento por semana</h2>
      <p className="chart-description">
        Este gráfico muestra la carga total semanal. El volumen se calcula como:
        <strong> series × repeticiones × peso</strong>, sumado para todos los ejercicios de cada semana.
        Te ayuda a ver cómo evoluciona la intensidad de tus entrenamientos.
      </p>
      <div className="chart-wrapper">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}