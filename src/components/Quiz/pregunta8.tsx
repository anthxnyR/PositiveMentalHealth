import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/QuizAutoestima.css';

const QuizQuestion8: React.FC = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('');

  const handleNextQuestion = () => {
    // Aquí puedes agregar lógica adicional para manejar la respuesta antes de pasar a la siguiente pregunta
    if(!selectedValue) {
      alert('Por favor selecciona una respuesta');
      return;
    }
    const storedValue = localStorage.getItem('totalPoints');
    const totalPoints = storedValue ? parseInt(storedValue) + parseInt(selectedValue) : parseInt(selectedValue);
    localStorage.setItem('totalPoints', totalPoints.toString());
    navigate('/QuizAutoestima/pregunta9');
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div className="quiz-page">
      <div className="quiz-content">
        <h2>Pregunta 8</h2>
        <p>
            Desearía valorarme más a mí mismo/a.
        </p>
        <div className="likert-scale">
        <label>
          <input type="radio" name="answer" value="1" onChange={handleValueChange} />
          <br />Muy en desacuerdo
        </label>
        <label>
          <input type="radio" name="answer" value="2" onChange={handleValueChange} />
          <br />En desacuerdo
        </label>
        <label>
          <input type="radio" name="answer" value="3" onChange={handleValueChange} />
          <br />Neutral
        </label>
        <label>
          <input type="radio" name="answer" value="4" onChange={handleValueChange} />
          <br />De acuerdo
        </label>
        <label>
          <input type="radio" name="answer" value="5" onChange={handleValueChange} />
          <br />Muy de acuerdo
        </label>
      </div>
        <button className="next-button" onClick={handleNextQuestion}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion8;