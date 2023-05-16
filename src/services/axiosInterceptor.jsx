import axios from 'axios';

const securedApi = axios.create({
  baseURL: 'http://localhost:5000/',
  widthCredentials: true,
  timeout: 2000,
});

export default securedApi;
