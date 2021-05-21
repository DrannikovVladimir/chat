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
      const messages = [...state.messages, message];
      return { messages };
    },
  },
  extraReducers: {
    [setInitialState]: (state, { payload }) => {
      const { messages } = payload;
      return { messages };
    },
    [removeChannel]: (state, { payload }) => {
      const { id } = payload;
      const messages = state.messages.filter(({ channelId }) => channelId !== id);
      return { messages };
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
