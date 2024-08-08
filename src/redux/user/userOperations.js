import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskProApi } from '../../config/api';
import axios from 'axios';

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

export const fetchBoards = createAsyncThunk(
  'user/boards',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/boards');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addBoard = createAsyncThunk(
  'boards/addBoard',
  async ({ title, currentBg, icon }, thunkAPI) => {
    try {
      const response = await axios.post('/api/boards', {
        title,
        currentBg,
        icon,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editBoard = createAsyncThunk(
  'boards/editBoard',
  async ({ title, currentBg, icon, id }, thunkAPI) => {
    try {
      const response = await axios.put(`/api/boards/${id}`, {
        title,
        currentBg,
        icon,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/boards/${id}`);

      if (response.status === 204) {
        return id;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const updateUserPreferencesThunk = createAsyncThunk(
  'auth/updateUserPreferences',
  async (preferences, thunkAPI) => {
    try {
      const { data } = await taskProApi.patch('api/auth/update', preferences);
      console.log('data', data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const changeTheme = createAsyncThunk(
  'auth/theme',
  async (changeTheme, thunkAPI) => {
    try {
      const response = await axios.patch('/users/theme', changeTheme);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);