import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import {
  getTasksByDayThunk,
  addTask,
  deleteTask,
  editTask,
  getTasksByMonthThunk,
} from './tasksThunks';
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from './handleFunction';
import { toast } from 'react-toastify';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setIsChanged: (state, { payload }) => {
      state.isChanged = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTasksByDayThunk.fulfilled, (state, { payload }) => {
        state.byDay = payload;
      })
      .addCase(getTasksByMonthThunk.fulfilled, (state, { payload }) => {
        state.tasks = payload;
      })
      .addCase(addTask.fulfilled, (state, { payload }) => {
        const res = { data: [payload.data] };
        state.byDay.push(payload);
        state.tasks.push(res);
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.tasks.filter(task => task._id !== payload.deletedTask._id);
        toast.success('Task deleted successfully');
      })
      .addCase(deleteTask.rejected, (state, { payload }) => {
        toast.error('Oops, something went wrong...');
      })
      .addCase(editTask.fulfilled, (state, { payload }) => {
        // state.tasks = state.tasks.map(task => {
        //   if (task._id === payload._id) {
        //     return payload;
        //   }
        //   return task;
        // });
        const res = { data: [payload.data] };
        state.byDay.push(payload);
        state.tasks.push(res);
      })
      .addMatcher(
        isAnyOf(
          getTasksByDayThunk.pending,
          addTask.pending,
          deleteTask.pending,
          editTask.pending,
          getTasksByMonthThunk.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          getTasksByDayThunk.fulfilled,
          addTask.fulfilled,
          deleteTask.fulfilled,
          editTask.fulfilled,
          getTasksByMonthThunk.fulfilled
        ),
        handleFulfilled
      )
      .addMatcher(
        isAnyOf(
          getTasksByDayThunk.rejected,
          addTask.rejected,
          deleteTask.rejected,
          editTask.rejected,
          getTasksByMonthThunk.rejected
        ),
        handleRejected
      );
  },
});
export const { setIsChanged } = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
