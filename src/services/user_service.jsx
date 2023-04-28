import axios from 'axios';

export const getUser = async (userId) => {
  return await axios.get(`http://localhost:8000/users/${userId}`);
};
