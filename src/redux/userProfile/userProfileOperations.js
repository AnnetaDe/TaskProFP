import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskProApi } from '../../config/api';

export const editProfile = createAsyncThunk(
  'auth/edit-profile',
  async (preferences, thunkAPI) => {
    try {
      const { data } = await taskProApi.patch(
        'api/auth/edit-profile',
        preferences
      );
      console.log('data', data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
