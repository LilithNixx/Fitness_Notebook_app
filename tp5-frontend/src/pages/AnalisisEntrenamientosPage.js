import React from 'react';
import ProgresoPesoChart from '../components/ProgresoPesoChart';
import VolumenChart from '../components/VolumenChart';
import EvolucionPesoChart from '../components/EvolucionPesoChart';
import CircunferenciasChart from '../components/CircunferenciasChart';

export default function AnalisisEntrenamientosPage() {
   return (
    <div className="page-background">
      <h1 className="chart-title">Análisis de Entrenamientos</h1>
      <p className="chart-description">
        Visualizá tu progreso en el tiempo. A medida que registres tus entrenamientos, vas a ver cómo evolucionás tanto en fuerza como en medidas corporales.
      </p>

      <div className="chart-container">
        <ProgresoPesoChart />
      </div>

      <div className="chart-container">
        <VolumenChart />
      </div>

      <div className="chart-container">
        <EvolucionPesoChart />
      </div>

      <div className="chart-container">
        <CircunferenciasChart />
      </div>
    </div>
  );
}
