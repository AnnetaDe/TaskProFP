import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskProApi } from '../../config/api';

export const createNewColumnThunk = createAsyncThunk(
  'columns/createColumn',
  async (board, column, thunkAPI) => {
    try {
      const { data } = await taskProApi.post(
        `/api/boards/${board.id}/${column.id}`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateColumnThunk = createAsyncThunk(
  'columns/updateColumn',
  async (board, column, thunkAPI) => {
    try {
      const { data } = await taskProApi.patch(
        `api/boards/${board.id}/columns/${column.id}`,
        column
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteColumnThunk = createAsyncThunk(
  'columns/deleteColumn',
  async (board, column, thunkAPI) => {
    try {
      await taskProApi.delete(`api/boards/${board.id}/columns/${column.id}`);
      return column.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
