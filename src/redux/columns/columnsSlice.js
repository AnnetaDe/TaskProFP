import { createSlice } from '@reduxjs/toolkit';
import {
  getAllCoulumnsWithBoardIdThunk,
  createNewColumnThunk,
  updateColumnThunk,
  deleteColumnThunk,
} from './columnsOperations';

const initialState = {
  boardId: '',
  boardTitle: '',
  boardIcon: '',
  boardBackground: [],
  columns: [],
  columnsOrderId: [],
  tasksWithinBoard: [],
  tasksOrderId: [],
  isLoading: false,
  error: null,
};
const columnSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    // updateColumnOrder: (state, action) => {
    //   const { source, destination } = action.payload;
    //   if (!destination) {
    //     return;
    //   }
    //   const sourceColumn = state.columns.find(
    //     column => column._id === source.droppableId
    //   );
    //   const destinationColumn = state.columns.find(
    //     column => column._id === destination.droppableId
    //   );
    //   const [removed] = sourceColumn.tasks.splice(source.index, 1);
    //   destinationColumn.tasks.splice(destination.index, 0, removed);
    // },
    updateTaskOrder: (state, action) => {
      const { source, destination, sourceColumnId, destinationColumnId } =
        action.payload;

      if (!destination) {
        return;
      }

      const sourceColumn = state.columns.find(
        column => column._id === sourceColumnId
      );
      const destinationColumn = state.columns.find(
        column => column._id === destinationColumnId
      );

      if (sourceColumnId === destinationColumnId) {
        const [removed] = sourceColumn.tasks.splice(source.index, 1);
        sourceColumn.tasks.splice(destination.index, 0, removed);
      } else {
        const [removed] = sourceColumn.tasks.splice(source.index, 1);
        destinationColumn.tasks.splice(destination.index, 0, removed);
      }
    },
  },

  extraReducers: builder => {
    builder
      .addCase(
        getAllCoulumnsWithBoardIdThunk.fulfilled,
        (state, { payload }) => {
          state.error = false;
          state.isLoading = false;
          state.boardId = payload._id;
          state.boardTitle = payload.title;
          state.boardIcon = payload.icon;
          state.boardBackground = payload.background;

          state.columns = payload.columns;
          state.columnsOrderId = payload.columns.map(column => column._id);
          state.tasksWithinBoard = payload.columns.reduce((acc, column) => {
            return [...acc, ...column.tasks];
          }, []);
          state.tasksOrderId = payload.columns.reduce((acc, column) => {
            return [...acc, ...column.tasks.map(task => task._id)];
          }, []);
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
export const { updateColumnOrder, updateTaskOrder } = columnSlice.actions;
export const columnsReducer = columnSlice.reducer;
