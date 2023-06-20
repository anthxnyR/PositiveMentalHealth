import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';
import axios from '../config/axiosConfig';

const LoginPage = () => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios.post('/api/auth/login',{
      email : Email,
      password : password
    }).then((response) => {
      console.log(response.data);
      if (response.status === 409) {
        setErrorMessage('Credenciales inválidas. Por favor, inténtalo nuevamente.');
      } else if (response.status === 200) {
        console.log('Inicio de sesión exitoso');
        navigate('/MainMenu');
      }
    } ).catch((error) => {
      console.log(error);
      setErrorMessage('Credenciales inválidas. Por favor, inténtalo nuevamente.');
    }
    );
  };

  return (
    <div className="login-page">
      <h2>Iniciar Sesión</h2>
      <div className="login-content">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Email">Email:</label>
          <input
            type="text"
            id="Email"
            value={Email}
            onChange={handleEmailChange}
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
