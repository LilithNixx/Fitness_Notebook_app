// src/components/NavBar.jsx
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function NavBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    /* 
      - navbar-dark: indica que el texto será claro (ideal para fondos oscuros)
      - bg-dark: color de fondo gris oscuro de Bootstrap
      Si querés tu color #2c2c2c en vez de bg-dark, puedes usar:
      className="navbar navbar-expand-lg navbar-dark" 
      style={{ backgroundColor: "#2c2c2c" }}
    */
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Logo / marca */}
        <Link
          className="navbar-brand"
          to="/inicio"
          // color dorado y negrita
          style={{ color: "#ffd700", fontWeight: "bold" }}
          onClick={() => setIsCollapsed(true)}
        >
          Fitness Notebook
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Menú colapsable */}
        <div
          className={`collapse navbar-collapse${isCollapsed ? "" : " show"}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            {[
              { to: "/inicio", label: "Inicio" },
              { to: "/entrenamientos", label: "Entrenamientos" },
              { to: "/medidas-corporales", label: "Medidas Corporales" },
              { to: "/estado-animo", label: "Estado de Ánimo" },
              { to: "/alimentacion", label: "Alimentación" },
              { to: "/analisis-entrenamientos", label: "Análisis" },
            ].map(({ to, label }) => (
              <li className="nav-item" key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    /* text-white por defecto, text-warning + bold si activo */
                    "nav-link " +
                    (isActive ? "text-warning fw-bold" : "text-white")
                  }
                  onClick={() => setIsCollapsed(true)}
                >
                  {label}
                </NavLink>
              </li>
            ))}

            {/* Botón cerrar sesión estilo nav-link */}
            <li className="nav-item">
              <button
                className="nav-link"
                onClick={handleLogout}
                // estilo inline para remover bordes y fondo
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1rem",
                  fontWeight: 400,
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                }}
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
