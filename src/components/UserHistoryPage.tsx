import React, { useEffect, useState, useRef } from 'react';
import axios from '../config/axiosConfig.js';
import { Chart, registerables } from 'chart.js';
import './styles/UserHistoryPage.css'
import { useNavigate } from 'react-router-dom';

// Registrar las escalas necesarias
Chart.register(...registerables);

interface TestData {
  email: string;
  answers: number[];
  score: number;
  createdAt: Date;
}

interface UserTestResultsProps {
  email: string;
}

const UserTestResultsPage: React.FC = () => {
  const [testData, setTestData] = useState<TestData[]>([]);
  const chartRef = useRef<Chart | null>(null);
  const navigate = useNavigate();

  const handleBackToMenu = () => {
    navigate('/MainMenu');
  }

  useEffect(() => {
    const email = localStorage.getItem('email');
    axios.get(`/api/testPerUser/${email}`)
      .then(response => {
        setTestData(response.data.tests);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const scores = testData.length > 0 ? testData.map(test => test.score) : [];

  const generateGeneralChart = () => { 
    const labels = testData.map((test, index) => {
        const fecha = new Date(test.createdAt);
        const fechaFormateada = fecha.toLocaleDateString('es-ES');
        return `Test ${index +1 } - ${fechaFormateada}`
    });

    const ctx = document.getElementById('generalChartCanvas') as HTMLCanvasElement;

    if (chartRef.current) {
        chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Puntajes Finales',
          data: scores,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 5
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 50
          }
        }
      }
    });
  };

  useEffect(() => {
    if (testData.length > 0) {
      generateGeneralChart();
    }
  }, [testData]);

  return (
    <div className='container'>
      <h1>Resultados de Tests</h1>
      {testData.map((test, index) => (
        <div key={index}>
        </div>
      ))}
      <h2 className='chart-title'>Gráfica General</h2>
      <canvas id="generalChartCanvas" width="400" height="200"></canvas>
      <button className="back-button" onClick={handleBackToMenu}>Volver al Menú</button>
    </div>
  );
};

export default UserTestResultsPage;
