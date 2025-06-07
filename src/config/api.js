import axios from 'axios';


export const taskProApi = axios.create({
  baseURL: 'https://taskproback-production.up.railway.app/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  },
});

export const taskProApiFormData = axios.create({
  baseURL: 'https://taskproback-production.up.railway.app/',
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Cache-Control': 'no-store',
  },
});


