import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/QuizAutoestima.css';
import QuizQuestion1 from './Quiz/pregunta1';
import QuizQuestion2 from './Quiz/pregunta2';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    // Aquí puedes agregar lógica adicional antes de redirigir a la primera pregunta del quiz
    navigate('/QuizAutoestima/pregunta1');
  };

  return (
    <div className="quiz-page">
      <div className="quiz-content">
        <h2>Quiz de Autoestima</h2>
        <p>
          Este quiz consta de 10 preguntas diseñadas para evaluar tu nivel de autoestima.
          Responde cada pregunta con sinceridad y elige la opción que mejor te represente.
        </p>
        <p>¡Descubre más sobre ti mismo y comienza ahora!</p>
        <button className="start-button" onClick={handleStartQuiz}>
          Comenzar
        </button>
      </div>
    </div>
  );
};

export { QuizPage, QuizQuestion1, QuizQuestion2}
