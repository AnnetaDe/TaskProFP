import { createSlice } from '@reduxjs/toolkit';
import {
  getAllCoulumnsWithBoardIdThunk,
  createNewColumnThunk,
  updateColumnThunk,
  deleteColumnThunk,
} from './columnsOperations';

const initialState = {
  columns: [],
  isLoading: false,
  error: null,
};
const columnSlice = createSlice({
  name: 'columns',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(
        getAllCoulumnsWithBoardIdThunk.fulfilled,
        (state, { payload }) => {
          state.error = false;
          state.isLoading = false;
          state.columns = payload.data;
        }
      )
      .addCase(createNewColumnThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.columns.push(payload);
      })
      .addCase(updateColumnThunk.fulfilled, (state, action) => {
        const column = state.columns.find(
          column => column._id === action.payload._id
        );
        column.title = action.payload.title;
      })
      .addCase(deleteColumnThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.columns.findIndex(
          column => column._id === action.payload
        );
        state.columns.splice(index, 1);
      });
  },
});
export const columnsReducer = columnSlice.reducer;
