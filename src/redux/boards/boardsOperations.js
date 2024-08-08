import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskProApi } from '../../config/api';

export const fetchBoardsThunk = createAsyncThunk(
  'boards/fetchBoards',
  async (_, thunkAPI) => {
    try {
      const { data } = await taskProApi.get('api/boards');
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
export const updateBoardThunk = createAsyncThunk(
  'boards/updateBoard',
  async (board, thunkAPI) => {
    try {
      const { data } = await taskProApi.patch(`api/boards/${board.id}`, board);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteBoardThunk = createAsyncThunk(
  'boards/deleteBoard',
  async (boardId, thunkAPI) => {
    try {
      await taskProApi.delete(`api/boards/${boardId}`);
      return boardId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchColumns = createAsyncThunk(
  'tasks/fetchColumns',
  async (id, thunkAPI) => {
    try {
      const { data } =  await taskProApi.get(`/api/columns/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const backgroundUrl = createAsyncThunk(
  'backgrounds',
  async (_, thunkAPI) => {
    try {
      const { data } =  await taskProApi.get('/api/backgrounds');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const changeBackground = createAsyncThunk(
  'boards/changeBackground',
  async ({ id, currentBg }, thunkAPI) => {
    try {
      const { data } = await taskProApi.patch(`/api/boards/${id}/currentBg`, {
        currentBg,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



