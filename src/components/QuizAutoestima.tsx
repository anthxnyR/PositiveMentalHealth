import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/QuizAutoestima.css';
import QuizQuestion1 from './Quiz/pregunta1';
import QuizQuestion2 from './Quiz/pregunta2';
import QuizQuestion3 from './Quiz/pregunta3';
import QuizQuestion4 from './Quiz/pregunta4';
import QuizQuestion5 from './Quiz/pregunta5';
import QuizQuestion6 from './Quiz/pregunta6';
import QuizQuestion7 from './Quiz/pregunta7';
import QuizQuestion8 from './Quiz/pregunta8';
import QuizQuestion9 from './Quiz/pregunta9';
import QuizQuestion10 from './Quiz/pregunta10';
import axios from '../config/axiosConfig';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    axios.post('/api/test', {
      email : localStorage.getItem('email'),
    })
    .then((response) => {
      console.log(response.data);
      localStorage.setItem('testId', response.data.test._id);
      navigate('/QuizAutoestima/pregunta1');
    })
    .catch((error) => {
      console.log(error);
    });

    // Aquí puedes agregar lógica adicional antes de redirigir a la primera pregunta del quiz
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

export { QuizPage, QuizQuestion1, QuizQuestion2, QuizQuestion3, QuizQuestion4, QuizQuestion5, QuizQuestion6, QuizQuestion7, QuizQuestion8, QuizQuestion9, QuizQuestion10}
