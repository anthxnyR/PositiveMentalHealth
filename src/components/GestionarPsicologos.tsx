import React, { useState } from 'react';
import axios from '../config/axiosConfig';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { CheckCircleOutline } from '@material-ui/icons';
import './styles/GestionarPsicologos.css';

interface Psicologo {
  _id: string;
  name: string;
  gender: string;
  region: string;
  email: string;
  contraseña: string;
}

const GestionarPsicologos = () => {
  const [nombre, setNombre] = useState('');
  const [genero, setGenero] = useState('');
  const [region, setRegion] = useState('');
  const [emailRegistro, setEmailRegistro] = useState('');
  const [contraseñaRegistro, setContraseñaRegistro] = useState('');
  const [emailEliminacion, setEmailEliminacion] = useState('');
  const [psicologoEliminado, setPsicologoEliminado] = useState<Psicologo | null>(null);
  const [error, setError] = useState('');
  const [confirmacionVisible, setConfirmacionVisible] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleRegistroPsicologo = async () => {
    try {
      const response = await axios.post('/api/users/psychologist', {
        name: nombre,
        password: contraseñaRegistro,
        email: emailRegistro,
        gender: genero,
        region: region,
        role: 'P'
      });
      console.log(response.data);
      setOpenDialog(true);
      setNombre('');
      setGenero('');
      setRegion('');
      setEmailRegistro('');
      setContraseñaRegistro('');
    } catch (error) {
      console.log(error);
      // Manejar errores de registro
    }
  };

  const handleMostrarPsicologo = async () => {
    setConfirmacionVisible(false);
    try {
      const email = emailEliminacion;
      const response = await axios.get(`/api/users/${email}`);
      const psicologo = response.data;
      console.log(psicologo.body.role);
      if (psicologo && psicologo.body.role === 'P') {
        setError('');
        setPsicologoEliminado(psicologo.body);
        setConfirmacionVisible(true);
      } else {
        setPsicologoEliminado(null);
        setConfirmacionVisible(false); 
      }
    } catch (error) {
      console.log(error);
      setError('No se encontró ningún psicólogo con ese correo electrónico.');
    }
  };

  const handleEliminarPsicologo = async () => {
    try {
      const response = await axios.delete(`/api/users/${psicologoEliminado?.email}`);
      console.log(response.data);
      alert('El psicólogo ha sido eliminado con éxito.');
      setConfirmacionVisible(false);
      setError('');
      // Realizar acciones adicionales después de la eliminación exitosa
    } catch (error) {
      console.log(error);
      // Manejar errores de eliminación
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Realizar acciones adicionales después de cerrar el diálogo
  };

  return (
    <div className="container">
      <h1>Gestionar Psicólogos</h1>
      <div className="registro-psicologo">
        <h2>Registrar Psicólogo</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <label htmlFor="genero">Género:</label>
        <select id="genero" value={genero} onChange={(e) => setGenero(e.target.value)}>
          <option value="">Seleccionar</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro (Especificar)</option>
        </select>
        {genero === 'otro' && (
          <input
            type="text"
            placeholder="Especificar género"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          />
        )}
        <label htmlFor="region">Región:</label>
        <select id="region" value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="">Seleccionar</option>
          <option value="costa">Costa</option>
          <option value="sierra">Sierra</option>
          <option value="oriente">Oriente</option>
          <option value="galapagos">Galápagos</option>
          <option value="otro">Otro (Especificar)</option>
        </select>
        {region === 'otro' && (
          <input
            type="text"
            placeholder="Especificar región"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        )}
        <input
          type="text"
          placeholder="Correo Electrónico"
          value={emailRegistro}
          onChange={(e) => setEmailRegistro(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseñaRegistro}
          onChange={(e) => setContraseñaRegistro(e.target.value)}
        />
        <button onClick={handleRegistroPsicologo}>Registrar</button>
      </div>
      <div className="eliminar-psicologo">
        <h2>Eliminar Psicólogo</h2>
        <input
          type="text"
          placeholder="Correo Electrónico del Psicólogo"
          value={emailEliminacion}
          onChange={(e) => setEmailEliminacion(e.target.value)}
        />
        <button onClick={handleMostrarPsicologo}>Mostrar</button>
        {confirmacionVisible && psicologoEliminado && (
          <div className="confirmacion-eliminacion">
            <h3>Confirmar eliminación de psicólogo:</h3>
            <p>Nombre: {psicologoEliminado.name}</p>
            <p>Género: {psicologoEliminado.gender}</p>
            <p>Región: {psicologoEliminado.region}</p>
            <p>Email: {psicologoEliminado.email}</p>
            <button onClick={handleEliminarPsicologo}>Confirmar</button>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>¡Registro exitoso!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            El psicólogo ha sido registrado con éxito.
          </DialogContentText>
          <CheckCircleOutline
            color="primary"
            style={{ fontSize: 48, margin: '0 auto' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GestionarPsicologos;
