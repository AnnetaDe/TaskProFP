import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskProApi, taskProApiFormData } from '../../config/api';
export const setToken = (token) => {
  taskProApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
export const clearToken = () => {
  taskProApi.defaults.headers.common['Authorization'] = ``;
  localStorage.removeItem('user');
  
};

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (credentials, thunkApi) => {
    try {
      const { data } = await taskProApi.post(
        'api/auth/register',
        credentials
      );
      console.log('Register response:', data);

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
      const  res  = await taskProApi.post('api/auth/login', credentials);
      if (res.data.status === 'error') {
        return thunkApi.rejectWithValue({
          message: res.data.message,
          status: res.data.statusCode,
        });
      }

      console.log('Login response:', res.data, 'token:', res.data.data.token);
      setToken(res.data.data.token);
      return res.data;

    } catch (error) {
      if (error.response) {
        return thunkApi.rejectWithValue({
          message: error.response.data.message,
          status: error.response.status,
        });
      }
      return thunkApi.rejectWithValue('Network Error');
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
  async (_, thunkApi) => {
    const sid = thunkApi.getState().user.sid;
    const refreshToken = thunkApi.getState().user.refreshToken;
    if (refreshToken && sid) {
      try {
        setToken(refreshToken);
        const { data } = await taskProApi.post('api/auth/refresh', {
          sid: sid,
        });
        console.log('Refresh response:', data);

        return data;
      } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message);
      }
    }
    return thunkApi.rejectWithValue('No refresh token or sid');
  }
);

export const refreshUserThunk = createAsyncThunk(
  'auth/currentUser',
  async (_, thunkAPI) => {
    try {
      const { data } = await taskProApi.get('api/auth/current');
      console.log('Current user response:', data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateUserPreferencesThunk = createAsyncThunk(
  'auth/updateUserPreferences',
  async (preferences, thunkAPI) => {
    try {
      const { data } = await taskProApiFormData.patch('api/auth/update', preferences, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Update user preferences response:', data);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resendVerificationEmailThunk = createAsyncThunk(
  'auth/resendVerificationEmail',
  async (body, thunkAPI) => {
    try {
      const { data } = await taskProApi.post('api/auth/verify', {
        email: body,
      });

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
