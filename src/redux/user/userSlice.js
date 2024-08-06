import { createSlice } from '@reduxjs/toolkit';
import { registerThunk, loginThunk, logoutThunk } from './userOperations';

const initialState = {
  user: { email: '', password: '', theme: '', avatar: '' },
  accessToken: null,
  refreshToken: null,
  userTheme: 'dark',
  userAvatar: '',
  isVeryfied: false,
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
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isLoggined = false;
        state.isLoading = false;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.user = payload.data.user;
        state.accessToken = payload.data.accessToken;
        state.refreshToken = payload.data.refreshToken;
        state.userTheme = payload.data.user.theme;
        state.userAvatar = payload.data.user.avatar;
        state.isLoggined = true;
        state.isLoading = false;
      })
      .addCase(logoutThunk.fulfilled, state => {
        state.user = { email: '', password: '', theme: 'light', avatar: '' };
        state.token = null;
        state.isLoggined = false;
      });
  },
});

// export const { changeTheme, changeAvatar } = userSlice.actions;
export const userReducer = userSlice.reducer;
