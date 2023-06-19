import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage.tsx';
import RegistroPage from './components/Registro.tsx';
import {QuizPage, QuizQuestion1, QuizQuestion2} from './components/QuizAutoestima.tsx';
import Q1 from './components/Quiz/pregunta1.tsx';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/QuizAutoestima" element={<QuizPage/>} /> 
        <Route path ="/QuizAutoestima/pregunta1" element={<QuizQuestion1/>} />
        <Route path ="/QuizAutoestima/pregunta2" element={<QuizQuestion2/>} />
        

      </Routes>
    </Router>
  );
};

export default App;