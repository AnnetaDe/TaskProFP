import { createSlice } from '@reduxjs/toolkit';
import {
  createBoardThunk,
  deleteBoardThunk,
  fetchBoardsThunk,
  updateBoardThunk,
} from './boardsOperations';
const initialState = {
  boards: [],
  boardsIds: [],
  isLoading: false,
  error: null,
};
const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    // changeBg(state, action) {
    //   state.currentBcg = action.payload;
    // },
    // changeCurrentBoard(state, action) {
    //   state.currentBoard = action.payload;
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBoardsThunk.fulfilled, (state, { payload }) => {
        state.error = false;
        state.isLoading = false;
        state.boards = payload.data;
        state.boardsIds = payload.data.map(board => board._id);
      })
      .addCase(createBoardThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.boards.push(payload);
      })
      .addCase(updateBoardThunk.fulfilled, (state, action) => {
        const board = state.boards.find(
          board => board._id === action.payload._id
        );
        board.title = action.payload.title;
        board.icon = action.payload.icon;
        board.backgroundImg = action.payload.backgroundImg; //{ _id, title, icon,backgroundImg :{mobile: "link", ...} }
      })
      .addCase(deleteBoardThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.boards.findIndex(
          board => board._id === action.payload
        );
        state.boards.splice(index, 1);
      });
    // .addCase(backgroundUrl.fulfilled, (state, action) => {
    //   state.error = false;
    //   state.isLoading = false;
    //   state.backgroundUrl = action.payload;
    // })
    // .addCase(changeBackground.fulfilled, (state, action) => {
    //   state.error = false;
    //   state.isLoading = false;
    //   state.boards = state.boards.map(board => {
    //     if (board._id === action.payload._id) {
    //       return {
    //         ...board,
    //         currentBg: action.payload.currentBg,
    //       };
    //     }
    //     return board;
    //   });
    //   state.currentBcg = action.payload.currentBg;
    // });
  },
});
export const boardsReducer = boardSlice.reducer;
export const { changeBg, changeCurrentBoard } = boardSlice.actions;
