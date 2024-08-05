import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskProApi } from '../../config/api';

export const setToken = accessToken => {
  taskProApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};
export const clearToken = () => {
  taskProApi.defaults.headers.common.Authorization = ``;
};
export const registerThunk = createAsyncThunk(
  'auth/register',
  async (credentials, thunkApi) => {
    try {
      const { data } = await taskProApi.post('api/auth/register', credentials);
      console.log(data);
      setToken(data.accessToken);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, thunkApi) => {
    try {
      const { data } = await taskProApi.post('api/auth/login', credentials);
      setToken(data.accessToken);
      console.log(data);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      await taskProApi.post('api/auth/logout');
      clearToken();
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// {
//     "username":"ann",
//     "email": "tipike6101@almaxen.com",
//     "password": "12345678"
// }

// email: 'tyquon.f1@oabibleh.com';
// name: 'Ann';
// password: 'aaAA1111';
