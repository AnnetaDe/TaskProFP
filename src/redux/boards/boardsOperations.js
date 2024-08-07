import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskProApi } from '../../config/api';

export const fetchBoardsThunk = createAsyncThunk(
  'boards/fetchBoards',
  async (_, thunkAPI) => {
    try {
      const { data } = await taskProApi.get('api/boards');
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const createBoardThunk = createAsyncThunk(
  'boards/createBoard',
  async (boardData, thunkAPI) => {
    try {
      const { data } = await taskProApi.post('api/boards', boardData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
