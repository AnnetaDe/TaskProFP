import axios from 'axios';

export const taskProApi = axios.create({
  baseURL: 'https://task-pro-backend-xdd4.onrender.com/',
});

// https://task-pro-backend-xdd4.onrender.com/api/auth/register
// https://task-pro-backend-xdd4.onrender.com/api/auth/login
