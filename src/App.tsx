import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage.tsx';
import RegistroPage from './components/Registro.tsx';
import {QuizPage, QuizQuestion1, QuizQuestion2, QuizQuestion3, QuizQuestion4, QuizQuestion5, QuizQuestion6, QuizQuestion7, QuizQuestion8, QuizQuestion9, QuizQuestion10} from './components/QuizAutoestima.tsx';
import Result from './components/ResultPage.tsx';
import Login from './components/Login.tsx';
import MainMenu from './components/MainMenu.tsx';
import UserHistoryPage from './components/UserHistoryPage.tsx';
import Diario from  './components/Diario.tsx';
import Ayudas from './components/SolicitudAyudas.tsx';
import Usuarios from './components/ListaUsuarios.tsx';
import GestionarPsicologos from './components/GestionarPsicologos.tsx';

const App: React.FC = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/QuizAutoestima" element={<QuizPage/>} /> 
        <Route path ="/QuizAutoestima/pregunta1" element={<QuizQuestion1/>} />
        <Route path ="/QuizAutoestima/pregunta2" element={<QuizQuestion2/>} />
        <Route path ="/QuizAutoestima/pregunta3" element={<QuizQuestion3/>} />
        <Route path ="/QuizAutoestima/pregunta4" element={<QuizQuestion4/>} />
        <Route path ="/QuizAutoestima/pregunta5" element={<QuizQuestion5/>} />
        <Route path ="/QuizAutoestima/pregunta6" element={<QuizQuestion6/>} />
        <Route path ="/QuizAutoestima/pregunta7" element={<QuizQuestion7/>} />
        <Route path ="/QuizAutoestima/pregunta8" element={<QuizQuestion8/>} />
        <Route path ="/QuizAutoestima/pregunta9" element={<QuizQuestion9/>} />
        <Route path ="/QuizAutoestima/pregunta10" element={<QuizQuestion10/>} />
        <Route path="/ResultPage" element={<Result />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/MainMenu" element={<MainMenu />} />
        <Route path="/UserHistoryPage" element={<UserHistoryPage />} />
        <Route path="/Diario" element={<Diario />} />
        <Route path="/Ayudas" element={<Ayudas />} />
        <Route path="/Usuarios" element={<Usuarios />} />
        <Route path="/GestionarPsicologos" element={<GestionarPsicologos />} />


      </Routes>
    </Router>
  );
};

export default App;