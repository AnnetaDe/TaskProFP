import { createSlice } from '@reduxjs/toolkit';
import { updateUserPreferencesThunk } from '../user/userOperations';

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState: {
    userTheme: 'dark',
    userAvatar: '',
    userName: '',
  },
  reducers: {
    changeColorScheme: (state, action) => {
      state.userTheme = action.payload;
    },
    changeAvatar: (state, action) => {
      state.userAvatar = action.payload;
    },
    changeUserName: (state, action) => {
      state.userName = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(updateUserPreferencesThunk.fulfilled, (state, action) => {
        state.userTheme = action.payload.theme;
        state.userAvatar = action.payload.avatarUrl;
        state.userName = action.payload.username;
      })
      .addCase(updateUserPreferencesThunk.rejected, (state, action) => {
        console.error('Error updating user preferences:', action.payload);
      });
  },
});
export const { changeColorScheme, changeAvatar, changeUserName } =
  userPreferencesSlice.actions;
export const userPreferencesReducer = userPreferencesSlice.reducer;
