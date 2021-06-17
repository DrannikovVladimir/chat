import { createSlice } from '@reduxjs/toolkit';
import { setInitialState, removeChannel } from './channelsSlice.js';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, { payload }) => {
      const { message } = payload;
      state.messages = [...state.messages, message];
    },
  },
  extraReducers: {
    [setInitialState]: (state, { payload }) => {
      const { messages } = payload;
      state.messages = messages;
    },
    [removeChannel]: (state, { payload }) => {
      const { id } = payload;
      state.messages = state.messages.filter(({ channelId }) => channelId !== id);
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
