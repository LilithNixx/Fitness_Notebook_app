import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "chartjs-adapter-date-fns";

export default function ProgresoPesoChart() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No hay token de autenticación. Por favor, inicia sesión.");
          return;
        }

        const response = await fetch("http://127.0.0.1:8000/api/entrenamientos/progreso-peso", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error al obtener datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        setData(json);
      } catch (e) {
        setError(e.message);
      }
    }

    fetchData();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!data) return <p>Cargando datos...</p>;

  const datasets = Object.entries(data).map(([ejercicio, puntos], i) => ({
    label: ejercicio,
    data: puntos.map((p) => ({ x: p.fecha, y: p.peso })),
    borderColor: `hsl(${(i * 60) % 360}, 100%, 50%)`,
    backgroundColor: "transparent",
    tension: 0.3,
  }));

  const chartData = { datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
    },
    scales: {
      x: {
        type: "time",
        time: {
          parser: "yyyy-MM-dd",
          tooltipFormat: "dd MMM yyyy",
          unit: "day",
          displayFormats: { day: "dd/MM" },
        },
        title: { display: true, text: "Fecha" },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Peso (kg)" },
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">Progreso de peso por ejercicio</h2>
      <p className="chart-description">
        Esta visualización muestra cómo evolucionó el peso que levantaste en cada ejercicio con el tiempo.
      </p>
      <div className="chart-wrapper">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
