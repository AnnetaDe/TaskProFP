import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, logoutThunk, refreshUserThunk } from './userOperations';

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
  // reducers: {
  //   changeTheme(state, action) {
  //     state.user.theme = action.payload;
  //   },
  //   changeAvatar(state, action) {
  //     state.user.avatar = action.payload;
  //   },
  // },
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
        state.isLoggined = false;
      })
      .addCase(loginThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginThunk.rejected, state => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(refreshUserThunk.fulfilled, (state, { payload }) => {
        state.login = payload.data.user;

        state.isLoggined = true;
        state.isRefreshing = false;
      });
  },
});

// export const { changeTheme, changeAvatar } = userSlice.actions;
export const userReducer = userSlice.reducer;
