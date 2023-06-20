// LandingPage.tsx
import React from 'react';
import './styles/LandingPage.css';
import mentalHealthImage from './images/MentalHealth.jpg';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <div className="landing-page-content">
        <h1>Bienvenido a Mental Health App</h1>
        <p>
          Toma el control de tu bienestar mental con nuestra aplicación que ofrece varias funciones para apoyar tu proceso.
        </p>
        <div className="objective-box">
          <p className="objective-text">
            Nuestra misión es brindarte recursos personalizados, seguimiento de emociones y un espacio para expresarte libremente, todo con el objetivo de mejorar tu salud mental.
          </p>
        </div>
        <br></br>
        <div className="cta-buttons">
          <Link to="/Login" className="cta-button register-button">Inicio de Sesion</Link>
          <Link to="/registro" className="cta-button register-button">Registro</Link>
        </div>
      </div>
      <img src={mentalHealthImage} alt="Salud Mental" className="landing-page-image" />
    </div>
  );
};

export default LandingPage;

