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

export const backgroundUrl = createAsyncThunk(
  'backgrounds',
  async (_, thunkAPI) => {
    try {
      const { data } = await taskProApi.get('/api/backgrounds');
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

//додано по колонках і картках
export const createColumnThunk = createAsyncThunk(
  'lists/createColumn',
  async (columnData, thunkAPI) => {
    try {
      const { data } = await taskProApi.post(
        `api/boards/${boardId}/columns`,
        columnData
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateColumnThunk = createAsyncThunk(
  'lists/updateColumn',
  async (column, thunkAPI) => {
    try {
      const { data } = await taskProApi.patch(
        `api/boards/${boardId}/columns/${column.id}`,
        column
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteColumnThunk = createAsyncThunk(
  'lists/deleteColumn',
  async (columnId, thunkAPI) => {
    try {
      await taskProApi.delete(`api/boards/${boardId}/columns/${columnId}`);
      return columnId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createCardThunk = createAsyncThunk(
  'cards/createCard',
  async (cardData, thunkAPI) => {
    try {
      const { data } = await taskProApi.post(
        `api/boards/${boardId}/columns/${columnId}/tasks`,
        cardData
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateCardThunk = createAsyncThunk(
  'cards/updateCard',
  async (card, thunkAPI) => {
    try {
      const { data } = await taskProApi.patch(
        `api/boards/${boardId}/columns/${columnId}/tasks/${card.id}`,
        card
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteCardThunk = createAsyncThunk(
  'cards/deleteCard',
  async (cardId, thunkAPI) => {
    try {
      await taskProApi.delete(
        `api/boards/${boardId}/columns/${columnId}/tasks/${cardId}`
      );
      return cardId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//
