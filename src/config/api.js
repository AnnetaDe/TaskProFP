import axios from 'axios';
export const taskProApiUnAutorized = axios.create({
  baseURL: 'https://taskproback-production.up.railway.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskProApi = axios.create({
  baseURL: 'https://taskproback-production.up.railway.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskProApiFormData = axios.create({
  baseURL: 'https://taskproback-production.up.railway.app/',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
