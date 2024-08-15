import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskProApi } from '../../config/api';
//https://task-pro-backend-xdd4.onrender.com/api/boards/:boardId/columns/:columnId/tasks
export const createNewTaskThunk = createAsyncThunk(
  'tasks/createTask',
  async ({boardId, columnId, task}, thunkAPI) => {
    try {
      const { data } = await taskProApi.post(
        `api/boards/${boardId}/columns/${columnId}/tasks`,
        task
      );
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//task-pro-backend-xdd4.onrender.com/api/boards/:boardId/columns/:columnId/tasks/:taskId
export const updateTaskThunk = createAsyncThunk(
  'tasks/updateTask',
  async (data, thunkAPI) => {
    const { boardId, columnId, taskId, task } = data;


    try {
      const { data } = await taskProApi.patch(
        `api/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        task
      );
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//task-pro-backend-xdd4.onrender.com/api/boards/:boardId/columns/:columnId/tasks/:taskId

export const deleteTaskThunk = createAsyncThunk(
  'tasks/deleteTask',
  async ({boardId, columnId, taskId}, thunkAPI) => {
    try {
      await taskProApi.delete(
        `api/boards/${boardId}/columns/${columnId}/tasks/${taskId}`
      );
      return taskId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
