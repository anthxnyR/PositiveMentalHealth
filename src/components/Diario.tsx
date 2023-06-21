import React, { useState } from 'react';
import './styles/Diario.css';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';

const DiaryPage: React.FC = () => {
  const [emotion, setEmotion] = useState('');
  const [entry, setEntry] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMainMenuButton, setShowMainMenuButton] = useState(false);
  const navigate = useNavigate();

  const emotions = [
    { label: 'Muy feliz', emoji: '😄' },
    { label: 'Contento', emoji: '😊' },
    { label: 'Animado', emoji: '🤩' },
    { label: 'Tranquilo', emoji: '😌' },
    { label: 'Preocupado', emoji: '😟' },
    { label: 'Enojado', emoji: '😡' },
    { label: 'Triste', emoji: '😢' },
    { label: 'Decepcionado', emoji: '😞' },
  ];

  const handleEmotionSelection = (selectedEmotion: string) => {
    setEmotion(selectedEmotion);
  };

  const handleEntryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEntry(event.target.value);
  };

  const navigateToMainMenu = () => {
    navigate('/MainMenu');
    };


  const email = localStorage.getItem('email');
  const handleSubmit = () => {
    axios.post('api/notes', {
        email: email,
        emotion: emotion,
        content: entry
    }).then((response) => {
        console.log(response);
        setIsSubmitted(true);
        setShowMainMenuButton(true);

    }
    ).catch((error) => {
        console.log(error);
    });
  };

  return (
    <div className='container'>
      <h1>Diario de emociones</h1>
      {isSubmitted ? (
        <div>
          <p>Tu entrada ha sido registrada. Gracias por compartir tus emociones.</p>
          {showMainMenuButton && (
            <button className="main-menu-button" onClick={() => navigateToMainMenu()}>Volver al menú principal</button>
          )}
        </div>
      ) : (
        <div>
          <h2>¿Cómo te sientes hoy?</h2>
          <div>
            {emotions.map((emotionItem) => (
              <button
                key={emotionItem.label}
                className={`emotion-button ${emotion === emotionItem.label ? 'selected' : ''}`}
                onClick={() => handleEmotionSelection(emotionItem.label)}
              >
                {emotionItem.emoji}
              </button>
            ))}
          </div>
          <h2>Cuéntanos más</h2>
          <textarea
            value={entry}
            onChange={handleEntryChange}
            placeholder="Escribe tus pensamientos y emociones aquí..."
          ></textarea>
          <button className='Submit' onClick={handleSubmit} disabled={!emotion || !entry}>
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};

export default DiaryPage;
