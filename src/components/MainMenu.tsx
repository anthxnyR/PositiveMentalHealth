import React from 'react';
import axios from '../config/axiosConfig';
import background from './images/menuBackground.jpg';
import './styles/MainMenu.css'
import { useNavigate } from 'react-router-dom';

const MainMenu: React.FC = () => {
    const [userType, setUserType] = React.useState<string>('');
    const navigate = useNavigate();

    const email = localStorage.getItem('email');
    axios.get(`api/Users/${email}`).then((response) => {
        //setUserType(response.data.body.role);
        setUserType("U");
        console.log(userType);
    }
    ).catch((error) => {
        console.log(error);
    }
    );

    const handleNewTestClick = () => {
        navigate('/QuizAutoestima');
    };

    const handleHistory = () => {
        navigate('/UserHistoryPage');
    };

  const renderUserOptions = () => {
    if (userType === 'U') {
      return (
        <div className='MenuButtons'>
          <button onClick={handleNewTestClick}>Realizar test otra vez</button>
          <button>Diario</button>
          <button onClick={handleHistory}>Historial de test</button>
        </div>
      );
    } else if (userType === 'P' || userType === 'A') {
      return (
        <div className='MenuButtons'>
          <button>Ver pacientes</button>
          <button>Ver historial de test</button>
          {userType === 'A' && <button>Gestionar Psicólogo</button>}
        </div>
      );
    } else {
      return null; // Opción por defecto si el tipo de U no coincide
    }
  };

  return (
    <div className='main-menu'>
        <div className='menu'>
        <h1>Menú</h1>
        {renderUserOptions()}
        </div>
        {/* <img src={background} alt="background" className="background" /> */}
    </div>
  );
};

export default MainMenu;
