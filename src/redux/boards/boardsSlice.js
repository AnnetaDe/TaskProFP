import { createSlice } from '@reduxjs/toolkit';
import { backgroundUrl, changeBackground, createBoardThunk, deleteBoardThunk, fetchBoardsThunk, updateBoardThunk } from './boardsOperations';



const initialState = {
    boards: [],
    currentBoard: '',
    lists: [],
    cards: [],
    currentBackground: null,
    isLoading: false,
    error: null,
    backgroundUrl: [],
  };

  const boardSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
      changeBg(state, action) {
        state.currentBcg = action.payload;
      },
      changeCurrentBoard(state, action) {
        state.currentBoard = action.payload;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchBoardsThunk.pending, (state) => {
          state.error = false;
          state.isLoading = true;
        })
        .addCase(fetchBoardsThunk.rejected, (state, action) => {
          state.error = action.payload.error;
          state.isLoading = false;
        })
        .addCase(fetchBoardsThunk.fulfilled, (state, action) => {
          state.error = false;
          state.isLoading = false;
          state.boards = action.payload;
        })
        .addCase(createBoardThunk.pending, (state) => {
          state.isLoading = true;
          state.error = false;
        })
        .addCase(createBoardThunk.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null;
          state.boards.push(action.payload);
        })
        .addCase(createBoardThunk.rejected, (state) => {
          state.isLoading = false;
          state.error = true;
        })
        .addCase(updateBoardThunk.pending, (state) => {
          state.isLoading = true;
          state.error = false;
        })
        .addCase(updateBoardThunk.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null;
          const index = state.boards.findIndex(
            board => board._id === action.payload._id
          );
          state.boards[index] = action.payload;
        })
        .addCase(updateBoardThunk.rejected, (state) => {
          state.isLoading = false;
          state.error = true;
        })
        .addCase(deleteBoardThunk.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null;
          const index = state.boards.findIndex(
            board => board._id === action.payload
          );
          state.boards.splice(index, 1);
          state.lists = [];
          state.cards = [];
        })
        .addCase(backgroundUrl.pending, (state) => {
          state.error = false;
          state.isLoading = true;
        })
        .addCase(backgroundUrl.rejected, (state, action) => {
          state.error = action.payload.error;
          state.isLoading = false;
        })
        .addCase(backgroundUrl.fulfilled, (state, action) => {
          state.error = false;
          state.isLoading = false;
          state.backgroundUrl = action.payload;
        })
        .addCase(changeBackground.pending, (state) => {
          state.error = false;
          state.isLoading = true;
        })
        .addCase(changeBackground.rejected, (state, action) => {
          state.error = action.payload.error;
          state.isLoading = false;
        })
        .addCase(changeBackground.fulfilled, (state, action) => {
          state.error = false;
          state.isLoading = false;
          state.boards = state.boards.map(board => {
            if (board._id === action.payload._id) {
              return {
                ...board,
                currentBg: action.payload.currentBg,
              };
            }
            return board;
          });
          state.currentBcg = action.payload.currentBg;
        });
    },
  });
  
  export const taskReducer = boardSlice.reducer;
  export const {
    changeBg, changeCurrentBoard 
  } = boardSlice.actions;
  