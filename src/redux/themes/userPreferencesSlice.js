import { createSlice } from '@reduxjs/toolkit';
import { updateUserPreferencesThunk } from '../user/userOperations';

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState: {
    userTheme: 'dark',
    userAvatar: '',
  },

  extraReducers: builder => {
    builder.addCase(updateUserPreferencesThunk.fulfilled, (state, action) => {
      state.userTheme = action.payload.userTheme;
      state.userAvatar = action.payload.userAvatar;
    });
  },
});
export const { changeColorScheme, changeAvatar } = userPreferencesSlice.actions;
export const userPreferencesReducer = userPreferencesSlice.reducer;
