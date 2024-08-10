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
      console.log('data', data.data.accessToken);
      setToken(data.data.accessToken);
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

export const refreshTokensThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const refreshToken = thunkAPI.getState().user.refreshToken;
    if (!refreshToken) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    try {
      const { data } = await taskProApi.post('api/auth/refresh', {
        refreshToken,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  'auth/currentUser',
  async (_, thunkAPI) => {
    try {
      await thunkAPI.dispatch(refreshTokensThunk());
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }

    const accessToken = thunkAPI.getState().user.accessToken;
    setToken(accessToken);
    if (!accessToken) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    try {
      const { data } = await taskProApi.get('api/auth/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// email: 'heidie@modulesdsh.com';
// name: 'ann';
// password: 'aaAA1111';

export const updateUserPreferencesThunk = createAsyncThunk(
  'auth/updateUserPreferences',
  async (preferences, thunkAPI) => {
    console.log(preferences);
    
    try {
      const { data } = await taskProApi.patch('api/auth/update', preferences);
      console.log('data', data.data);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
