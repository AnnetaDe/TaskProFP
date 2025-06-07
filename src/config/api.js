import axios from 'axios';


export const taskProApi = axios.create({
  baseURL: 'https://taskproback-production.up.railway.app/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskProApiFormData = axios.create({
  baseURL: 'https://taskproback-production.up.railway.app/',
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});


