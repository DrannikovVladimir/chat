import { createSlice } from '@reduxjs/toolkit';
import { initialChannels } from './channelsSlice.js';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  extraReducers: {
    [initialChannels]: (state, { payload }) => {
      const { messages } = payload;
      return { messages };
    },
  },
});

export default messagesSlice.reducer;
