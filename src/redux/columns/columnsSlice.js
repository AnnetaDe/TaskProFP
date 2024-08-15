import { createSlice } from '@reduxjs/toolkit';
import {
  getAllCoulumnsWithBoardIdThunk,
  createNewColumnThunk,
  updateColumnThunk,
  deleteColumnThunk,
} from './columnsOperations';
import {
  createNewTaskThunk,
  deleteTaskThunk,
  updateTaskThunk,
} from '../tasks/tasksOperations';

const initialState = {
  boardId: '',
  boardTitle: '',
  boardIcon: '',
  boardBackground: [],
  columnsL: [],
  columnsOrderId: [],
  tasks: [],

  filter: null,
  filteredColumns: [],
  tasksOrderId: [],
  isLoading: false,
  error: null,
};
const columnSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    updateTaskOrder: (state, action) => {
      const { source, destination, sourceColumnId, destinationColumnId } =
        action.payload;

      if (!destination) {
        return;
      }

      const sourceColumn = state.columnsL.find(
        column => column._id === sourceColumnId
      );
      const destinationColumn = state.columnsL.find(
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
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
    filterColumns: (state, { payload }) => {
      state.columnsL = state.columnsL
        .map(column => {
          const filteredTasks = column.tasks.filter(task => {
            if (payload === 'all') {
              return true;
            }

            if (payload === 'without_priority') {
              return task.priority === null;
            }

            return task.priority === payload;
          });

          return {
            ...column,
            tasks: filteredTasks,
          };
        })
        .filter(column => column.tasks.length > 0);
    },

    deleteTask: (state, { payload }) => {
      state.columnsL = state.columnsL.map(column => {
        column.tasks = column.tasks.filter(task => task._id !== payload);
        return column;
      });
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

          state.columnsL = payload.columns;
          state.columnsOrderId = payload.columns.map(column => column._id);

          state.tasks = payload.columns.reduce((acc, column) => {
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
        state.columnsL.push(payload.data);
      })
      .addCase(updateColumnThunk.fulfilled, (state, action) => {
        const column = state.columnsL.find(
          column => column._id === action.payload.data._id
        );
        column.title = action.payload.data.title;
      })
      .addCase(deleteColumnThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.columnsL.findIndex(
          column => column._id === action.payload
        );
        state.columnsL.splice(index, 1);
      })
      .addCase(createNewTaskThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const columnid = action.meta.arg;
        const column = state.columnsL.find(column => column._id === columnid);
        const newTask = action.payload.data;
        console.log(action.payload, 'payload');
        console.log(columnid, column, state.columnsL);
        console.log(newTask);

        column.tasks.push(newTask);
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const { columnid, taskid } = action.meta.arg;

        const column = state.columnsL.find(column => column._id === columnid);
        state.tasks = column.tasks.find(task => task._id === taskid);
      })
      .addMatcher(
        action =>
          action.type.includes('fulfilled') && action.type.includes('columns'),
        state => {
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        action =>
          action.type.includes('pending') && action.type.includes('columns'),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      );
  },
});
export const {
  updateColumnOrder,
  updateTaskOrder,
  setFilter,
  filterColumns,
  deleteTask,
} = columnSlice.actions;
export const columnsReducer = columnSlice.reducer;
