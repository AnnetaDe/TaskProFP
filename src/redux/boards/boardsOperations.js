import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskProApi } from '../../config/api';

export const fetchBoardsThunk = createAsyncThunk(
  'boards/fetchBoards',
  async (_, thunkAPI) => {
    try {
      const { data } = await taskProApi.get('api/boards', {withCredentials: true});

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
    const { _id, ...body } = board;
    try {
      const { data } = await taskProApi.patch(`api/boards/${_id}`, body);
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



export const fetchBoardByIdThunk = createAsyncThunk(
  'board/fetchBoardById',
  async (boardId, thunkAPI) => {
    try {
      const { data } = await taskProApi.get(`api/boards/${boardId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
