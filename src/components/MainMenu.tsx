import React from 'react';
import axios from '../config/axiosConfig';
import background from './images/menuBackground.jpg';
import './styles/MainMenu.css';
import { useNavigate } from 'react-router-dom';

const MainMenu: React.FC = () => {
  const [userType, setUserType] = React.useState<string>('');
  const navigate = useNavigate();

  const email = localStorage.getItem('email');
  axios
    .get(`api/Users/${email}`)
    .then((response) => {
      setUserType(response.data.body.role);
    })
    .catch((error) => {
      console.log(error);
    });

  const handleNewTestClick = () => {
    navigate('/QuizAutoestima');
  };

  const handleDiario = () => {
    navigate('/Diario');
  };

  const handleHistory = () => {
    navigate('/UserHistoryPage');
  };

  const handlePacientes = () => {
    navigate('/Ayudas');
  };

  const handleUsuarios = () => {
    navigate('/Usuarios');
  };

  const handleGestionar = () => {
    navigate('/GestionarPsicologos');
  };

  const handleLogout = () => {
    navigate('/'); 
  };

  const renderUserOptions = () => {
    if (userType === 'U') {
      return (
        <div className="MenuButtons">
          <button onClick={handleNewTestClick}>Realizar test otra vez</button>
          <button onClick={handleDiario}>Diario</button>
          <button onClick={handleHistory}>Historial de test</button>
        </div>
      );
    } else if (userType === 'P' || userType === 'A') {
      return (
        <div className="MenuButtons">
          <button onClick={handlePacientes}>Ver pacientes</button>
          <button onClick={handleUsuarios}>Ver historial de test</button>
          {userType === 'A' && <button onClick={handleGestionar}>Gestionar Psicólogo</button>}
        </div>
      );
    } else {
      return null; // Opción por defecto si el tipo de U no coincide
    }
  };

  return (
    <div className="main-menu">
      <div className="menu">
        <h1>Menú</h1>
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
        {renderUserOptions()}
      </div>
      {/* <img src={background} alt="background" className="background" /> */}
    </div>
  );
};

export default MainMenu;
