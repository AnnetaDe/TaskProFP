import { createSlice } from '@reduxjs/toolkit';
import {
  loginThunk,
  logoutThunk,
  refreshUserThunk,
  refreshTokensThunk,
  updateUserPreferencesThunk,
} from './userOperations';

const initialState = {
  login: { avatarUrl: '', email: '', username: '', theme: '' },
  accessToken: null,
  refreshToken: null,
  isNotVerified: null,
  userTheme: 'dark',
  userAvatar: '',
  userName: '',
  isLoggined: false,
  isLoading: false,
  isRefreshing: false,
  error: false,
  notification: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearNotification(state) {
      state.notification = '';
    },
    setTheme(state, { payload }) {
      state.userTheme = payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.login = payload.data.user;
        state.email = payload.data.email;
        state.accessToken = payload.data.token;
        state.refreshToken = payload.data.refreshToken;
        state.sid = payload.data.sid;
        state.userTheme = payload.data.user.theme;
        state.userAvatar = payload.data.user.avatarUrl;
        state.isLoggined = true;
        state.isLoading = false;
        state.error = false;
        state.notification = 'You are logged in';
      })
      .addCase(loginThunk.pending, state => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.isLoading = false;

        state.error = payload.message;
        if (payload.status === 403) {
          state.isNotVerified = true;
          state.notification = state.error;
        }

        state.notification = state.error
          ? state.error
          : 'Something went wrong, please try again';
      })
      .addCase(logoutThunk.fulfilled, state => {
        state.login = { email: '', password: '', theme: 'dark', avatar: '' };
        state.accessToken = null;
        state.refreshToken = null;
        state.sid = null;
        state.isLoggined = false;
        state.error = false;
        state.notification = 'You are logged out';
      })
      .addCase(refreshTokensThunk.fulfilled, (state, { payload }) => {
        state.accessToken = payload.data.accessToken;
        state.refreshToken = payload.data.refreshToken;
        state.sid = payload.data.sid;
        state.error = false;
        state.isLoading = false;
        state.notification = '';
      })

      .addCase(refreshUserThunk.fulfilled, (state, { payload }) => {
        state.login = payload.data;
        state.userTheme = payload.data.theme;
        state.userAvatar = payload.data.avatarUrl;
        state.isLoggined = true;
        state.isRefreshing = false;
        state.error = false;
        state.isLoading = false;
      })
      .addCase(refreshUserThunk.pending, state => {
        state.isRefreshing = true;
        state.error = false;
        state.isLoading = true;
      })
      .addCase(refreshUserThunk.rejected, (state, { payload }) => {
        state.error = payload;
        state.isRefreshing = false;
        state.isLoggined = false;
        state.error = payload.message;
        state.isLoading = false;
        state.notification = 'Error refreshing user, please log in again';
      })
      .addCase(updateUserPreferencesThunk.pending, state => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(updateUserPreferencesThunk.fulfilled, (state, { payload }) => {
        state.userTheme = payload.theme;
        state.userAvatar = payload.avatarUrl;
        state.userName = payload.username;
        state.login.username = payload.username;
        state.error = false;
        state.isLoading = false;
        state.notification = 'User preferences updated';
      })
      .addCase(updateUserPreferencesThunk.rejected, (state, { payload }) => {
        console.error('Error updating user preferences:', payload);
        state.error = payload.message;
        state.isLoading = false;
        // state.notification =
        //   state.error?.error || 'Error updating user preferences';
      });
  },
});

export const { clearNotification, setTheme } = userSlice.actions;
export const userReducer = userSlice.reducer;
