import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: 'http://localhost:5000/',
  widthCredentials: true,
  timeout: 2000,
});


// todo check the logic on the front width the back end logic

// axios.interceptors.request.use(config => {
//   const accessToken = Cookies.get('connect.sid');
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });

export default instance;
