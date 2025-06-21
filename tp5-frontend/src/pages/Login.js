// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Enviando login con:', email, contraseña); // <--- DEPURACIÓN

  try {
    const response = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, contraseña }),
    });

    console.log('Respuesta:', response);

    if (response.ok) {
      const data = await response.json();
      console.log('Token recibido:', data.access_token); // <--- DEPURACIÓN
      localStorage.setItem('token', data.access_token);
      navigate('/inicio');
    } else {
      const errorData = await response.json();
      console.error('Error de login:', errorData);
      setError(errorData.detail);
    }
  } catch (error) {
    console.error('Error en el fetch:', error);
    setError('Error de red o del servidor');
  }
};


  return (
    <div style={{ padding: '2rem' }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña: </label>
          <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />
        </div>
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;