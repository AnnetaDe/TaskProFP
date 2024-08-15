import { createSlice } from '@reduxjs/toolkit';
import {
  createNewTaskThunk,
  updateTaskThunk,
  deleteTaskThunk,
} from './tasksOperations';

const initialState = {
  tasks: {},
  isLoading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(createNewTaskThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewTaskThunk.fulfilled, (state, action) => {
        console.log(action);
        
        state.isLoading = false;
        const { boardId, columnId } = action.payload;
        const task = action.payload.data;

        if (!state.tasks[boardId]) {
          state.tasks[boardId] = {};
        }
        if (!state.tasks[boardId][columnId]) {
          state.tasks[boardId][columnId] = [];
        }
        state.tasks[boardId][columnId].push(task);
      })
      .addCase(createNewTaskThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateTaskThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { boardId, columnId, taskId } = action.payload;
        const updatedTask = action.payload.data;

        const columnTasks = state.tasks[boardId]?.[columnId] || [];
        const index = columnTasks.findIndex(t => t._id === taskId);
        if (index !== -1) {
          columnTasks[index] = updatedTask;
        }
      })
      .addCase(updateTaskThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteTaskThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { boardId, columnId, taskId } = action.payload;
        
        if (state.tasks[boardId] && state.tasks[boardId][columnId]) {
          state.tasks[boardId][columnId] = state.tasks[boardId][columnId].filter(
            (t) => t._id !== taskId
          )}
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
