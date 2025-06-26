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
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#2c2c2c" }}>
      <div className="container">
        {/* Marca / Logo */}
        <Link
          className="navbar-brand"
          to="/inicio"
          style={{ color: "#ffd700", fontWeight: "bold" }}
          onClick={() => setIsCollapsed(true)} // cierra menú al click en logo
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
          style={{ borderColor: "#ffd700" }}
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
        </button>

        {/* Menú colapsable */}
        <div className={`collapse navbar-collapse${isCollapsed ? '' : ' show'}`} id="navbarNav">
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
                    "nav-link " + (isActive ? "text-warning fw-bold" : "text-white")
                  }
                  onClick={() => setIsCollapsed(true)} // cierra menú al click en link
                >
                  {label}
                </NavLink>
              </li>
            ))}

            {/* Botón Cerrar sesión */}
              <li className="nav-item">
                <button
                  className="nav-link text-white"
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1rem",
                    fontWeight: 400,
                    padding: "0.5rem 1rem",
                    cursor: "pointer"
                  }}
                  onMouseOver={(e) => e.target.classList.add("text-warning")}
                  onMouseOut={(e) => e.target.classList.remove("text-warning")}
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
