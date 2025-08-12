// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_BASE_URL;


function Login() {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔍 Se presionó el botón y se disparó handleSubmit");

    try {
  const response = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, contraseña }),
      });

      console.log("📡 Respuesta del servidor:", response);

      if (response.ok) {

        const data = await response.json();
        console.log("🎉 Login exitoso:", data);

        localStorage.setItem('token', data.access_token);
        navigate('/inicio');

      } else {
       
        const errorData = await response.json();
        console.error("⚠️ Error desde el backend:", errorData);

        setError(errorData.detail);
      }
    } catch (error) {
      
      console.error("🛑 Error de red:", error);
      setError('Error de red o del servidor');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <div style={styles.motivationalText}>
          Registra, analiza y mejora tu progreso
        </div>
      </div>

      <div style={styles.formContainer}>
        <h2 style={styles.title}>Iniciar sesión</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            placeholder="tuemail@ejemplo.com"
          />

          <label style={styles.label}>Contraseña</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
            style={styles.input}
            placeholder="********"
          />

          {error && (
            <div style={styles.error}>
              {typeof error === 'string'
                ? error
                : Array.isArray(error)
                ? error.map((e, i) => <p key={i}>{e.msg}</p>)
                : 'Error desconocido'}
            </div>
          )}

          <button type="submit" style={styles.button}>
            Entrar
          </button>
          <p style={{ marginTop: '1rem', color: '#555' }}>
            ¿No tenés cuenta?{' '}
            <span
              style={{ color: '#4f8df7', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => navigate('/registro')}
            >
              Registrate aquí
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#2f2f2f',
    color: '#FFD700',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    position: 'relative',
  },
  motivationalText: {
    marginTop: '1.5rem',
    fontSize: '1.3rem',
    fontWeight: '600',
    textAlign: 'center',
    maxWidth: '80%',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '3rem',
  },
  title: {
    color: '#333',
    marginBottom: '1.5rem',
    fontWeight: '700',
    fontSize: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '0.3rem',
    fontWeight: '600',
    color: '#555',
  },
  input: {
    padding: '0.8rem',
    marginBottom: '1.2rem',
    borderRadius: '6px',
    border: '2px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    backgroundColor: '#FFD700',
    color: '#2f2f2f',
    fontWeight: '700',
    fontSize: '1.1rem',
    padding: '0.9rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
    fontWeight: '600',
  },
};

export default Login;
