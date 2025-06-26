import React from 'react';
import ProgresoPesoChart from '../components/ProgresoPesoChart';
import VolumenChart from '../components/VolumenChart';

export default function AnalisisEntrenamientosPage() {
  return (
    <div className="page-background">
      <h1 className="page-title">Análisis de Entrenamientos</h1>
      <p className="page-description">
        Visualizá tu progreso en el tiempo. A medida que registres tus entrenamientos, vas a ver cómo aumentás la carga en cada ejercicio.
      </p>

      <ProgresoPesoChart />
      <VolumenChart />
    </div>
  );
}
