import React from 'react';
import { Link } from 'react-router-dom';

const InicioPage = () => {
  return (
    <div className="container mt-4 mb-5"> {/* Agregamos margen inferior */}
      {/* Bienvenida */}
      <div className="text-center mb-4">
        <h1>Bienvenido/a a tu Fitness Notebook 💪</h1>
        <p className="lead">Controlá tu progreso físico, tu alimentación y tu bienestar emocional.</p>
      </div>

      {/* Accesos rápidos */}
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="card h-100 text-center">
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title">Entrenamiento</h5>
                <p className="card-text">Registrá tus ejercicios diarios.</p>
              </div>
              <Link to="/entrenamientos" className="btn btn-primary mt-2">Ir</Link>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card h-100 text-center">
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title">Alimentación</h5>
                <p className="card-text">Llevá el control de tu dieta.</p>
              </div>
              <Link to="/alimentacion" className="btn btn-success mt-2">Ir</Link>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card h-100 text-center">
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title">Medidas Corporales</h5>
                <p className="card-text">Seguimiento de tu cuerpo.</p>
              </div>
              <Link to="/medidas-corporales" className="btn btn-warning mt-2">Ir</Link>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card h-100 text-center">
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title">Estado de Ánimo</h5>
                <p className="card-text">Cómo te sentís día a día.</p>
              </div>
              <Link to="/estado-animo" className="btn btn-info mt-2">Ir</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Frase motivacional */}
      <div className="text-center mt-5 pb-5">
        <blockquote className="blockquote">
          <p className="mb-0">"El progreso no es lineal, pero cada paso cuenta."</p>
          <footer className="blockquote-footer">¡Seguí adelante!</footer>
        </blockquote>
      </div>
    </div>
  );
};

export default InicioPage;
