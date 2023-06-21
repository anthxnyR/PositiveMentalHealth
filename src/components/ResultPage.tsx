import React from 'react';
import GaugeChart from 'react-gauge-chart';
import './styles/ResultPage.css';
import esaEs from './images/boton_esaes.png';
import dece from './images/dece.png';
import cpsa from './images/cpsa.jpg';
import GoToMenuButton from './MenuButton';
import axios from '../config/axiosConfig';

const ResultPage: React.FC = () => {

  const [puntaje, setPuntaje] = React.useState<number>(0);

  const id = localStorage.getItem('testId');
  axios.get(`/api/test/${id}`).then((response) => {
    setPuntaje(response.data.test.score)
  }).catch((error) => {
    console.log(error);
  });
  let resultado = '';
  let porcentaje = 0;
  let nivel = 0;
  let colores = ['#ff0000', '#ffff00', '#00ff00'];

  if (puntaje) {
    const puntajeNum = puntaje;
    if (puntajeNum >= 35 && puntajeNum <= 50) {
      resultado = 'Autoestima elevada';
      porcentaje = (puntajeNum / 50) * 100;
      nivel = 3;
    } else if (puntajeNum >= 19 && puntajeNum <= 34) {
      resultado = 'Autoestima media';
      porcentaje = (puntajeNum / 50) * 100;
      nivel = 2;
    } else if (puntajeNum <= 18) {
      resultado = 'Autoestima baja';
      porcentaje = (puntajeNum / 50) * 100;
      nivel = 1;
    }
  }

  let mensaje = '';
  let mensajeAlto = '';
  let recursos = null;
  let recursosMedio = null;
  let mensajeAyuda = null;
  let submit = false;

  if (nivel === 3) {
    mensajeAlto = '¡Felicidades! Tienes una autoestima elevada. Recuerd seguir así y no bajar la guardia. \n Mantén esos buenos hábitos.';
  } else if (nivel === 2) {
    mensaje = 'Tienes una autoestima media.';
    recursosMedio = (
      <div className="recursosMed">
        <p>Aquí tienes algunos recursos para mejorar tu autoestima:</p>
        <ul>
          <li>
            <a href="https://drive.google.com/file/d/1s5czDxVFs6UtDZp6KsUiAGnPZtZRdYhy/view?usp=sharing" target="_blank" rel="noopener noreferrer">
              Walter Riso – Enamórate de ti 
            </a>
          </li>
          <li>
            <a href="https://drive.google.com/file/d/1aNvI0zvgRZDomXVawa5Ht3YEd2Jv0PDi/view?usp=sharing" target="_blank" rel="noopener noreferrer">
              Brene Brow - Los Dones de la imperfección
            </a>
          </li>
          <li>
            <a href="https://drive.google.com/folderview?id=12E8nZ2FiIbLnwYY7KGhHWxiav2BP8NUM" target="_blank" rel="noopener noreferrer">
              Sarah Knight – Arregla tu desmadre 
            </a>
          </li>
        </ul>
      </div>
    );
  } else if (nivel === 1) {
    mensaje = 'Tu autoestima es baja. No estás solo, ¡pide ayuda!';
    recursos = (
    <div className="recursos">
      <div className="resource-card">
        <img src= {esaEs} alt="Esa Es" />
        <p>Servicios de Salud Amigables para Adolescentes</p>
      </div>
      <div className="resource-card">
        <img src={dece} alt="DECE" />
        <p>Departamento de Consejería Estudiantil</p>
      </div>
      <div className="resource-card">
        <img src={cpsa} alt="CPSA" />
        <p>Centro de psicología aplicada de la Universidad Católica del Ecuador</p>
      </div>
    </div>
    );

    const handlePedirAyuda = () => {
      if (submit) {
        alert('Ya has pedido ayuda. Un profesional se pondrá en contacto contigo pronto.')
        return;
      }
      submit = true;
      axios.post('/api/help', {
        email: localStorage.getItem('email'),
        selfSteemLevel: puntaje
      }).then((response) => {
        console.log(response);
        alert('Gracias por pedir ayuda. Un profesional se pondrá en contacto contigo pronto.')
      }).catch((error) => {
        console.log(error);
      });
    }

    mensajeAyuda = (
      <div className="message-container">
        <p className="mensaje">{mensaje}</p>
        {recursos}
        <p><br></br>Sabemos que no es fácil todo el tiempo. <br></br>Si deseas pedir ayuda, puedes hacerlo aquí:</p>
        <button className="btn-ayuda" onClick={handlePedirAyuda}>
          Pedir Ayuda
        </button>
      </div>
    );    
  }


  return (
    <div className="result-page">
      <h2>Resultado del cuestionario</h2>
      <p>Tu puntaje es: {puntaje}</p>
      <div className="result-indicator">
        {/* <div className="result-image">
          <img src={resultImage} alt="Resultado" />
        </div> */}
        <div className="gauge-chart">
          <GaugeChart
            id="gauge-chart1"
            nrOfLevels={3} // Número de niveles del Gauge Chart
            percent={porcentaje / 100} // Porcentaje dividido por 100
            hideText={true}
            arcWidth={0.3} // Ancho del arco
            colors={colores} // Colores del Gauge Chart
            needleColor='#333'
            needleBaseColor='#333'
          />
          <br></br>
          <span className="percentage">{`${porcentaje}%`}</span>
          <span className="nivel">
            {porcentaje >= 70 ? "Autoestima Alta" : porcentaje >= 38 ? "Autoestima Media" : "Autoestima Baja"}
          </span>
        </div>
          <br></br>{mensajeAlto}<br></br>
          {recursosMedio}<br></br>
          {mensajeAyuda} <br></br>
          <GoToMenuButton />
      </div>
    </div>
  );
};

export default ResultPage;
