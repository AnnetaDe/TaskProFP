import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskProApi } from '../../config/api';

export const createNewTaskThunk = createAsyncThunk(
  'tasks/createTask',
  async (board, column, task, thunkAPI) => {
    try {
      const { data } = await taskProApi.post(
        `api/boards/${board.id}/columns/${column.id}/tasks`,
        task
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTaskThunk = createAsyncThunk(
  'tasks/updateTask',
  async (board, column, task, thunkAPI) => {
    try {
      const { data } = await taskProApi.patch(
        `api/boards/${board.id}/columns/${column.id}/tasks/${task.id}`,
        task
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteTaskThunk = createAsyncThunk(
  'tasks/deleteTask',
  async (board, column, task, thunkAPI) => {
    try {
      await taskProApi.delete(
        `api/boards/${board.id}/columns/${column.id}/tasks/${task.id}`
      );
      return task.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
