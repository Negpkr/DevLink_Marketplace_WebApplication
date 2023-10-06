// chatSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  history: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    appendMessage: (state, action) => {
      state.history.push(action.payload);
    },
    clearChatHistory: (state) => {
      state.history = [];
    },
  },
});

export const { appendMessage, clearChatHistory } = chatSlice.actions;

export default chatSlice.reducer;
