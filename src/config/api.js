import axios from 'axios';

export const taskProApi = axios.create({
  baseURL: 'https://task-pro-backend-xdd4.onrender.com/',
});
