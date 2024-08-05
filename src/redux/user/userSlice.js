import { createSlice } from '@reduxjs/toolkit';
import { registerThunk, loginThunk, logoutThunk } from './userOperations';

const initialState = {
  user: { email: '', password: '', theme: 'light', avatar: '' },
  token: null,
  isVeryfied: false,
  isLoggined: false,
  isLoading: false,
  error: false,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeTheme(state, action) {
      state.user.theme = action.payload;
    },
    changeAvatar(state, action) {
      state.user.avatar = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isLoggined = false;
        state.isLoading = false;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.accessToken;
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

export const { changeTheme, changeAvatar } = userSlice.actions;
export const userReducer = userSlice.reducer;
