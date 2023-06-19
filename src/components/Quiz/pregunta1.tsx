import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/QuizAutoestima.css';

const QuizQuestion1: React.FC = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('');

  const handleNextQuestion = () => {
    // Aquí puedes agregar lógica adicional para manejar la respuesta antes de pasar a la siguiente pregunta
    navigate('/QuizAutoestima/pregunta2');
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div className="quiz-page">
      <div className="quiz-content">
        <h2>Pregunta 1</h2>
        <p>
          Siento que soy una persona digna de aprecio, al menos en igual medida que los demás.
        </p>
        <div className="likert-scale">
        <label>
          <input type="radio" name="answer" value="1" />
          <br></br>Muy en desacuerdo
        </label>
        <label>
          <input type="radio" name="answer" value="2" />
          <br></br>En desacuerdo
        </label>
        <label>
          <input type="radio" name="answer" value="3" />
          <br></br>Neutral
        </label>
        <label>
          <input type="radio" name="answer" value="4" />
          <br></br>De acuerdo
        </label>
        <label>
          <input type="radio" name="answer" value="5" />
          <br></br>Muy de acuerdo
        </label>
      </div>
        <button className="next-button" onClick={handleNextQuestion}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion1;
