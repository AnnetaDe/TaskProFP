import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskProApi } from '../../config/api';
//https://task-pro-backend-xdd4.onrender.com/api/boards/:boardId/columns/:columnId/tasks
export const createNewTaskThunk = createAsyncThunk(
  'tasks/createTask',
  async (boardid, columnid, task, thunkAPI) => {
    try {
      const { data } = await taskProApi.post(
        `api/boards/${boardid}/columns/${columnid}/tasks`,
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
    const { boardid, columnid, taskid, body } = data;
    // const { columnId } = body;
    console.log(boardid, columnid, taskid, body);

    try {
      const { data } = await taskProApi.patch(
        `api/boards/${boardid}/columns/${columnid}/tasks/${taskid}`,
        body
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
  async (boardid, columnid, taskid, thunkAPI) => {
    try {
      await taskProApi.delete(
        `api/boards/${boardid}/columns/${columnid}/tasks/${taskid}`
      );
      return taskid;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
