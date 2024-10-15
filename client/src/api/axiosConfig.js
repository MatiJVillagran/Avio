src/api/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  //baseURL: 'https://avio-backend.vercel.app', // URL del backend
  baseURL: 'http://localhost:3001',
  withCredentials: true, // Para enviar cookies con cada solicitud si es necesario
});

export default instance;


  //http://localhost:3001
  //https://avio-backend.vercel.app
