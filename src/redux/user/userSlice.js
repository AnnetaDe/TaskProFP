import { createSlice } from '@reduxjs/toolkit';
import {
  loginThunk,
  logoutThunk,
  refreshUserThunk,
  refreshTokensThunk,
} from './userOperations';

const initialState = {
  login: { avatarUrl: '', email: '', username: '', theme: '' },
  accessToken: null,
  refreshToken: null,
  userTheme: 'dark',
  userAvatar: '',
  isLoggined: false,
  isLoading: false,
  isRefreshing: false,
  error: false,
};
const userSlice = createSlice({
  name: 'user',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.login = payload.data.user;
        state.accessToken = payload.data.accessToken;
        state.refreshToken = payload.data.refreshToken;
        state.userTheme = payload.data.user.theme;
        state.userAvatar = payload.data.user.avatarUrl;
        state.isLoggined = true;
        state.isLoading = false;
      })
      .addCase(logoutThunk.fulfilled, state => {
        state.login = { email: '', password: '', theme: '', avatar: '' };

        state.accessToken = null;
        state.refreshToken = null;
        state.isLoggined = false;
      })
      .addCase(loginThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginThunk.rejected, state => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(refreshTokensThunk.fulfilled, (state, { payload }) => {
        state.accessToken = payload.data.accessToken;
        state.refreshToken = payload.data.refreshToken;
      })

      .addCase(refreshUserThunk.fulfilled, (state, { payload }) => {
        state.login = payload.data;
        state.userTheme = payload.data.theme;
        state.userAvatar = payload.data.avatarUrl;
        state.isLoggined = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUserThunk.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUserThunk.rejected, state => {
        state.error = true;
        state.isRefreshing = false;
        state.isLoggined = false;
      });
  },
});

export const userReducer = userSlice.reducer;
