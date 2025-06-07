import { store } from '../redux/store';
import { logoutThunk, refreshTokensThunk } from '../redux/user/userOperations';
import { taskProApi, taskProApiFormData } from './api';

taskProApi.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    const { status } = error.response || {};
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 
      try {
        await store.dispatch(refreshTokensThunk());
        originalRequest.withCredentials = true;
        return taskProApi(originalRequest);
      } catch (refreshError) {
        store.dispatch(logoutThunk());
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


taskProApi.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    const { status } = error.response || {};
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await store.dispatch(refreshTokensThunk());
        originalRequest.withCredentials = true;
        return taskProApi(originalRequest);
      } catch (refreshError) {
        store.dispatch(logoutThunk());
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


taskProApiFormData.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    const { status } = error.response || {};
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await store.dispatch(refreshTokensThunk());
        originalRequest.withCredentials = true;
        return taskProApi(originalRequest);
      } catch (refreshError) {
        store.dispatch(logoutThunk());
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


