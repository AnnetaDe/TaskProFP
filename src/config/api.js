import axios from 'axios';
import { store } from '../redux/store';
import { refreshTokensThunk } from '../redux/user/userOperations';
export const taskProApi = axios.create({
  baseURL: 'https://task-pro-backend-xdd4.onrender.com/',
});

taskProApi.interceptors.response.use(
  response => response,
  async error => {
    const { status } = error.response || {};
    if (status === 403) {
      try {
        // Call the refreshThunk action to refresh tokens
        await store.dispatch(refreshTokensThunk());

        // Retry the original request after refreshing the token
        const retryOriginalRequest = new Promise((resolve, reject) => {
          const originalRequest = error.config;
          taskProApi(originalRequest).then(resolve).catch(reject);
        });

        return retryOriginalRequest;
      } catch (refreshError) {
        // Handle token refresh errors if necessary
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const taskProApiFormData = axios.create({
  baseURL: 'https://task-pro-backend-xdd4.onrender.com/',
});

taskProApiFormData.interceptors.response.use(
  response => response,
  async error => {
    const { status } = error.response || {};
    if (status === 403) {
      try {
        // Call the refreshThunk action to refresh tokens
        await store.dispatch(refreshTokensThunk());

        // Retry the original request after refreshing the token
        const retryOriginalRequest = new Promise((resolve, reject) => {
          const originalRequest = error.config;
          taskProApi(originalRequest).then(resolve).catch(reject);
        });

        return retryOriginalRequest;
      } catch (refreshError) {
        // Handle token refresh errors if necessary
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
