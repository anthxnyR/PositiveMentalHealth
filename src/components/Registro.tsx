import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Registro.css';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { CheckCircleOutline } from '@material-ui/icons';
import axios from '../config/axiosConfig';

const RegistroPage: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [genero, setGenero] = useState('');
  const [etnia, setEtnia] = useState('');
  const [region, setRegion] = useState('');
  const [nivelEducativo, setNivelEducativo] = useState('');
  const [tipoInstitucion, setTipoInstitucion] = useState('');
  const [otroGenero, setOtroGenero] = useState('');
  const [otraEtnia, setOtraEtnia] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      nombre.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      genero.trim() === '' ||
      etnia.trim() === '' ||
      region.trim() === '' ||
      nivelEducativo.trim() === '' ||
      tipoInstitucion.trim() === ''
    ) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    setError('');

    // Aquí puedes realizar las acciones necesarias con los datos del formulario
    axios.post('/api/auth/signup',{
      name : nombre,
      email : email,
      password : password,
      gender : genero,
      ethnicity : etnia,
      region : region,
      education : nivelEducativo,
      institution : tipoInstitucion,
      role: "U"
    }).then((response) => {
      console.log(response.data);
      if (response.status === 409) {
        setError('El correo electrónico ingresado ya está registrado.');
        console.log(error);
        return;
      }
      setOpenDialog(true);
    }
    ).catch((error) => {
      alert('El correo electrónico ingresado ya está registrado. Intente iniciar sesión o pruebe con otro correo electrónico.');
      setEmail('');
      console.log(error);
    }
    );
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate('/QuizAutoestima');
  };

  const handleGeneroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenero(e.target.value);
    if (e.target.value !== 'Otro') {
      setOtroGenero('');
    }
  };

  const handleEtniaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEtnia(e.target.value);
    if (e.target.value !== 'Otro') {
      setOtraEtnia('');
    }
  };

  const isValidEmail = (value: string) => {
    // Validar el formato del correo electrónico utilizando una expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  return (
    <div className="registro-page">
      <div className="registro-content">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="genero">Género:</label>
          <select id="genero" value={genero} onChange={handleGeneroChange}>
            <option value="">Seleccionar</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
          {genero === 'Otro' && (
            <input
              type="text"
              placeholder="Especificar género"
              value={otroGenero}
              onChange={(e) => setOtroGenero(e.target.value)}
            />
          )}

          <label htmlFor="etnia">Etnia:</label>
          <select id="etnia" value={etnia} onChange={handleEtniaChange}>
            <option value="">Seleccionar</option>
            <option value="Mestizo">Mestizo</option>
            <option value="Blanco">Blanco</option>
            <option value="Afrodescendiente">Afrodescendiente</option>
            <option value="Indígena">Indígena</option>
            <option value="Otro">Otro</option>
          </select>
          {etnia === 'Otro' && (
            <input
              type="text"
              placeholder="Especificar etnia"
              value={otraEtnia}
              onChange={(e) => setOtraEtnia(e.target.value)}
            />
          )}

          <label htmlFor="region">Región:</label>
          <select id="region" value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="">Seleccionar</option>
            <option value="Costa">Costa</option>
            <option value="Sierra">Sierra</option>
            <option value="Oriente">Oriente</option>
            <option value="Galápagos">Galápagos</option>
          </select>

          <label htmlFor="nivelEducativo">Nivel Educativo:</label>
          <select
            id="nivelEducativo"
            value={nivelEducativo}
            onChange={(e) => setNivelEducativo(e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value="10mo BGU">10mo BGU</option>
            <option value="1ero bachillerato">1ero bachillerato</option>
            <option value="2do de bachillerato">2do de bachillerato</option>
            <option value="3ro de bachillerato">3ro de bachillerato</option>
          </select>

          <label htmlFor="tipoInstitucion">Tipo Institución:</label>
          <select
            id="tipoInstitucion"
            value={tipoInstitucion}
            onChange={(e) => setTipoInstitucion(e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value="Privado">Privado</option>
            <option value="Fiscomisional">Fiscomisional</option>
            <option value="Municipal">Municipal</option>
          </select>


        </form>
        <div className="disclaimer-container">
            <p className="disclaimer-message">
            Esta aplicación no sustituye la atención de un profesional de la salud mental. Para obtener
            información más adecuada a su situación, le recomendamos consultar a un psicólogo en su
            área.
            </p>
            <p className="terms-message">
                Al hacer click en Registrar, acepta nuestros términos y condiciones.
            </p>
        </div>
        <form onSubmit={handleSubmit}>
            {/* ...contenido del formulario... */}
            <button className="registro-button" type="submit">
                Registrarse
            </button>
        </form>

        {/* Cuadro de diálogo de registro exitoso */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>¡Registro exitoso!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                El usuario ha sido registrado con éxito.
                </DialogContentText>
                <CheckCircleOutline color="primary" style={{ fontSize: 48, margin: '0 auto' }} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                Cerrar
                </Button>
            </DialogActions>
        </Dialog>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default RegistroPage;
