import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskProApi } from '../../config/api';
import { taskProApiUnAutorized } from '../../config/api';

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
      const { data } = await taskProApiUnAutorized.post(
        'api/auth/register',
        credentials
      );

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
      return data;
    } catch (error) {
      if (error.response) {
        const errorResponse = error.response;
        return thunkApi.rejectWithValue({
          message: errorResponse.data.message,
          status: errorResponse.status,
        });
      } else {
        return thunkApi.rejectWithValue('Network Error');
      }
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
        const { accessToken} = data.data;
        setToken(accessToken);

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
    await thunkAPI.dispatch(refreshTokensThunk());

    const accessToken = thunkAPI.getState().user.accessToken;

    if (!accessToken) {
      return thunkAPI.rejectWithValue(
        'Unable to fetch user, missing access token'
      );
    }
    setToken(accessToken);
    try {
      const { data } = await taskProApi.get('api/auth/current');
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
      const { data } = await taskProApi.patch('api/auth/update', preferences, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
