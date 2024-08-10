import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskProApi } from '../../config/api';

//task-pro-backend-xdd4.onrender.com/api/board/?_id=${boardId}
export const getAllCoulumnsWithBoardIdThunk = createAsyncThunk(
  'columns/getAllColumns',
  async (boardId, thunkAPI) => {
    try {
      const data = await taskProApi.get(`/api/boards/${boardId}`);
      console.log('data', data.data.data);
      return data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//task-pro-backend-xdd4.onrender.com/api/boards/:${boardid}/columns
export const createNewColumnThunk = createAsyncThunk(
  'columns/createColumn',
  async (id, newColumn, thunkAPI) => {
    try {
      const data = await taskProApi.post(
        `/api/boards/${id}/columns`,
        newColumn
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
        `api/boards/:${board.id}/columns/:${column.id}`,
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
      await taskProApi.delete(`api/boards/:${board.id}/columns/:${column.id}`);
      return column.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
