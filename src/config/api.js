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

// export const taskProApi = axios.create({
//   baseURL: 'http://192.168.1.73:3000/',
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
// 
// 
// export const taskProApiFormData = axios.create({
//   baseURL: 'http://192.168.1.73:3000/',
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
// });
