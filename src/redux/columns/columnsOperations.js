import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskProApi } from '../../config/api';

export const getAllCoulumnsWithBoardIdThunk = createAsyncThunk(
  'columns/getAllColumns',
  async (boardId, thunkAPI) => {
    try {
      const { data } = await taskProApi.get(`/api/board/?_id=${boardId}`);
      console.log('data', data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//task-pro-backend-xdd4.onrender.com/api/board/?_id=66b5d1bdd1439e984624d4b0

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
