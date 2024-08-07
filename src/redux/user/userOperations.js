import { useSelector } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskProApi } from '../../config/api';
import { selectRefreshToken } from './userSelectors';
import { set } from 'react-hook-form';

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
      setToken(data.data.accessToken);
      console.log('data', data.data.accessToken);

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

export const refreshUserThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const accessToken = thunkAPI.getState().user.accessToken;
    setToken(accessToken);
    console.log('acc', accessToken);

    if (!accessToken) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    try {
      const { data } = await taskProApi.get('api/auth/current');
      console.log('data', data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// email: 'heidie@modulesdsh.com';
// name: 'ann';
// password: 'aaAA1111';
