import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Verificar las credenciales
    if (username === 'usuario' && password === 'contraseña') {
      // Credenciales válidas, realizar la acción deseada (por ejemplo, redirigir a la página principal)
      console.log('Inicio de sesión exitoso');
      navigate('/MainMenu');
    } else {
      // Credenciales inválidas, mostrar mensaje de error
      setErrorMessage('Credenciales inválidas. Por favor, inténtalo nuevamente.');
    }
  };

  return (
    <div className="login-page">
      <h2>Iniciar Sesión</h2>
      <div className="login-content">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
    </div>
  );
};

export default LoginPage;
