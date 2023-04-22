import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/',
  widthCredentials: true,
  timeout: 2000,
});

export default instance;
