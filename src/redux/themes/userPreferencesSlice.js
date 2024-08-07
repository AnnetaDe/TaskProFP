import { createSlice } from '@reduxjs/toolkit';

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState: {
    userTheme: 'light',
    userAvatar: '',
  },
  reducers: {
    changeColorScheme(state, action) {
      state.userTheme = action.payload;
    },
    changeAvatar(state, action) {
      state.userAvatar = action.payload;
    },
  },
});
export const { changeColorScheme, changeAvatar } = userPreferencesSlice.actions;
export const userPreferencesReducer = userPreferencesSlice.reducer;
