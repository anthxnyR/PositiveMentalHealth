import React, { useState, useEffect, useRef } from 'react';
import axios from '../config/axiosConfig';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
import './styles/ListaUsuario.css';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'U' | 'P' | 'A';
}

interface TestData {
  email: string;
  answers: number[];
  score: number;
  createdAt: Date;
}

const UsuariosTest = () => {
  Chart.register(...registerables);
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [showTestResults, setShowTestResults] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [testData, setTestData] = useState<TestData[]>([]);
  const chartRef = useRef<Chart | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      console.log(response.data.body);
      const filteredUsers = response.data.body.filter((user: User) => user.role === 'U');
      setUsers(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserProgress = async (userEmail: string) => {
    try {
      const response = await axios.get(`/api/testPerUser/${userEmail}`);
      console.log(response.data.tests);
      setTestData(response.data.tests);
      setShowTestResults(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReturnMenu = () => {
    navigate('/MainMenu');
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    fetchUserProgress(user.email);
  };

  const scores = testData.length > 0 ? testData.map((test) => test.score) : [];

  const generateChart = () => {
    const labels = testData.map((test, index) => {
      const fecha = new Date(test.createdAt);
      const fechaFormateada = fecha.toLocaleDateString('es-ES');
      return `Test ${index + 1} - ${fechaFormateada}`;
    });

    const ctx = document.getElementById('generalChartCanvas') as HTMLCanvasElement;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Puntajes Finales',
            data: scores,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 5,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false,
            min: 10,
            max: 50,
          },
        },
      },
    });
  };

  if (selectedUser && showTestResults) {
    generateChart();
  }

  return (
    <div className="container">
      <h1>Usuarios que han hecho el test</h1>
      <div className="user-list">
        {users && users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className={`user-item ${selectedUser === user ? 'selected' : ''}`}
              onClick={() => handleUserClick(user)}
            >
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          ))
        ) : (
          <p>Cargando usuarios...</p>
        )}
      </div>
      {selectedUser && showTestResults && (
        <div className="user-progress">
          <h2>Gráfico de Progreso del Usuario</h2>
          <canvas id="generalChartCanvas" width="400" height="200"></canvas>
        </div>
      )}
      <button onClick={handleReturnMenu}>Regresar al Menú</button>
    </div>
  );
};

export default UsuariosTest;
