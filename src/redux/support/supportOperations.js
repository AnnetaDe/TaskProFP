import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskProApi } from '../../config/api';

export const contactSupportThunk = createAsyncThunk(
  'support/contactSupport',
  async (body, thunkApi) => {
    try {
      const { data } = await taskProApi.post('api/support', body);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
