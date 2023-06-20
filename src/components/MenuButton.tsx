import React from 'react';
import { useNavigate } from 'react-router-dom';



const GoToMenuButton = () => {
    const navigate = useNavigate();
  const handleGoToMenu = () => {
    // Lógica para redirigir al menú o realizar la acción deseada
    console.log('Redirigiendo al menú...');
    navigate('/MainMenu');
  };

  return (
    <button className="go-to-menu-button" onClick={handleGoToMenu}>
      Ir al Menú
    </button>
  );
};

export default GoToMenuButton;
