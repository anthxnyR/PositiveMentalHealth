import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // URL base de tu API
  headers: {
    'Content-Type': 'application/json',
    // Aquí puedes agregar cualquier encabezado personalizado que necesites
  },
});

export default instance;
