import React, { useState, useEffect } from 'react';
import axios from '../config/axiosConfig';
import {useNavigate} from 'react-router-dom';
import './styles/SolicitudAyudas.css';

interface Patient {
  _id: number;
  name: string;
  email: string;
  age: number;
  gender: 'M' | 'F' | 'otros';
  ethnicity: string;
  region: string;
  education: string;
  institution: string;
  selfSteemLevel: number;
  lastTestDate: string;
}

const PatientListPage = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('/api/help');
      const uniquePatients = response.data.filter(
        (patient: Patient, index: number, self: Patient[]) =>
          self.findIndex((p) => p.email === patient.email) === index
      );
      setPatients(uniquePatients);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPatientDetails = async (helpId: number) => {
    try {
      const response = await axios.get(`/api/help/helpInfo/${helpId}`);
      setSelectedPatient(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePatientClick = (patient: Patient) => {
    if (patient._id) {
      fetchPatientDetails(patient._id);
    }
  };

  const getGenderLabel = (gender: 'M' | 'F' | 'otros') => {
    if (gender === 'M') {
      return 'masculino';
    } else if (gender === 'F') {
      return 'femenino';
    } else {
      return gender;
    }
  };

  const formatTestDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleBackToMenu = () => {
    navigate('/MainMenu');
  };

  return (
    <div className='container'>
      <h1>Listado de Pacientes que han solicitado ayuda</h1>
      <div className='patient-list'>
        {patients.map((patient) => (
          <div
            key={patient._id}
            className={`patient-item ${selectedPatient === patient ? 'selected' : ''}`}
            onClick={() => handlePatientClick(patient)}
          >
            <h2>{patient.name}</h2>
            <p>{patient.email}</p>
          </div>
        ))}
      </div>
      {selectedPatient && (
        <div className='patient-details'>
          <h2>Detalles del Paciente</h2>
          <p>Nombre: {selectedPatient.name}</p>
          <p>Email: {selectedPatient.email}</p>
          <p>Edad: {selectedPatient.age}</p>
          <p>Género: {getGenderLabel(selectedPatient.gender)}</p>
          <p>Etnicidad: {selectedPatient.ethnicity}</p>
          <p>Región: {selectedPatient.region}</p>
          <p>Educación: {selectedPatient.education}</p>
          <p>Institución: {selectedPatient.institution}</p>
          <p>Nivel de autoestima: {selectedPatient.selfSteemLevel}</p>
          <p>Última fecha del test: {formatTestDate(selectedPatient.lastTestDate)}</p>
        </div>
      )}
      <button className = 'botonMenuAyudas'onClick={handleBackToMenu}>Volver al Menú</button>
    </div>
  );
};

export default PatientListPage;
