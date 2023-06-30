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
  const [fechaNacimiento, setFechaNacimiento] = useState('');
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
      tipoInstitucion.trim() === '' ||
      fechaNacimiento.trim() === ''
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
    axios
      .post('/api/auth/signup', {
        name: nombre,
        email: email,
        password: password,
        birthdate: fechaNacimiento,
        gender: genero,
        ethnicity: etnia,
        region: region,
        education: nivelEducativo,
        institution: tipoInstitucion,
        dateOfBirth: fechaNacimiento,
        role: 'U'
      })
      .then((response) => {
        console.log(fechaNacimiento);
        localStorage.setItem('email', email);
        console.log(response.data);
        if (response.status === 409) {
          setError('El correo electrónico ingresado ya está registrado.');
          console.log(error);
          return;
        }
        setOpenDialog(true);
      })
      .catch((error) => {
        alert('El correo electrónico ingresado ya está registrado. Intente iniciar sesión o pruebe con otro correo electrónico.');
        setEmail('');
        console.log(error);
      });
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

          {/* New field for date of birth */}
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="fechaNacimiento"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
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
            <option value="Educación Básica">Educación Básica</option>
            <option value="Educación Media">Educación Media</option>
            <option value="Educación Superior">Educación Superior</option>
          </select>

          <label htmlFor="tipoInstitucion">Tipo de Institución:</label>
          <select
            id="tipoInstitucion"
            value={tipoInstitucion}
            onChange={(e) => setTipoInstitucion(e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value="Pública">Pública</option>
            <option value="Privada">Privada</option>
          </select>

          {error && <p className="error-message">{error}</p>}

          <Button type="submit" variant="contained" color="primary">
            Registrarse
          </Button>
        </form>
      </div>

      <Dialog className='dialogRegistro' open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          Registro Exitoso
        </DialogTitle>
        <DialogContent className='registroMessage'>
          <CheckCircleOutline fontSize="large" color="primary" />
          <DialogContentText >
            <br></br>¡Te has registrado exitosamente! <br></br> Ahora puedes comenzar a utilizar nuestra plataforma.
          </DialogContentText>
        </DialogContent>
        <DialogActions className='finalDialog'>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RegistroPage;
