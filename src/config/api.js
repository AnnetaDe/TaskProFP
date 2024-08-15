import axios from 'axios';
export const taskProApiUnAutorized = axios.create({
  baseURL: 'https://task-pro-backend-xdd4.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskProApi = axios.create({
  baseURL: 'https://task-pro-backend-xdd4.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskProApiFormData = axios.create({
  baseURL: 'https://task-pro-backend-xdd4.onrender.com/',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
