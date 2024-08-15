import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskProApi } from '../../config/api';
//https://task-pro-backend-xdd4.onrender.com/api/boards/:boardId/columns/:columnId/tasks
export const createNewTaskThunk = createAsyncThunk(
  'tasks/createTask',
  async ({ boardId, columnId, task }, thunkAPI) => {
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
    try {
      const res = await taskProApi.patch(
        `api/boards/${data.boardId}/columns/${data.columnId}/tasks/${data.taskId}`,
        {
          columnId: data.columnId,
          title: data.task.title,
          description: data.task.description,
          priority: data.task.priority,
          deadline: data.task.deadline,
        }
      );

      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//task-pro-backend-xdd4.onrender.com/api/boards/:boardId/columns/:columnId/tasks/:taskId

export const deleteTaskThunk = createAsyncThunk(
  'tasks/deleteTask',
  async (data, thunkAPI) => {
    try {
      await taskProApi.delete(
        `api/boards/${data.boardId}/columns/${data.columnId}/tasks/${data.taskId}`
      );
      console.log(data);
      return data.taskId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
