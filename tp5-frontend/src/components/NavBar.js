// src/components/NavBar.jsx
import { Link, NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    // navbar con expansión en lg, fondo oscuro personalizado y texto claro
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#2c2c2c" }}>
      <div className="container">
        {/* Marca / Logo con texto amarillo */}
        <Link
          className="navbar-brand"
          to="/inicio"
          style={{ color: "#ffd700", fontWeight: "bold" }} // amarillo dorado
        >
          Fitness Notebook
        </Link>

        {/* Botón para colapsar navbar en móviles */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: "#ffd700" }} // borde amarillo
        >
          {/* Icono hamburguesa, con color amarillo */}
          <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
        </button>

        {/* Links de navegación, colapsables */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Cada NavLink cambia su estilo activo para resaltar */}
            <li className="nav-item">
              <NavLink
                to="/inicio"
                className={({ isActive }) =>
                  "nav-link " + (isActive ? "text-warning fw-bold" : "text-white")
                }
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/entrenamientos"
                className={({ isActive }) =>
                  "nav-link " + (isActive ? "text-warning fw-bold" : "text-white")
                }
              >
                Entrenamientos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/medidas-corporales"
                className={({ isActive }) =>
                  "nav-link " + (isActive ? "text-warning fw-bold" : "text-white")
                }
              >
                Medidas Corporales
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/estado-animo"
                className={({ isActive }) =>
                  "nav-link " + (isActive ? "text-warning fw-bold" : "text-white")
                }
              >
                Estado de Ánimo
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/alimentacion"
                className={({ isActive }) =>
                  "nav-link " + (isActive ? "text-warning fw-bold" : "text-white")
                }
              >
                Alimentación
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
