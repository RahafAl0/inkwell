// commentsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchCommentsStart: (state) => {
      state.isLoading = true;
    },
    fetchCommentsSuccess: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
      state.error = null;
    },
    fetchCommentsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Add other actions for creating, updating, and deleting comments
  },
});

export const {
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchCommentsFailure,
} = commentsSlice.actions;

export default commentsSlice.reducer;
