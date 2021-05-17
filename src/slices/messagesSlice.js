import { createSlice } from '@reduxjs/toolkit';
import { setInitialState } from './channelsSlice.js';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, { payload }) => {
      const { message } = payload;
      console.log(message);
      const messages = [...state.messages, message];
      console.log(messages);
      return { messages };
    },
  },
  extraReducers: {
    [setInitialState]: (state, { payload }) => {
      const { messages } = payload;
      return { messages };
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
