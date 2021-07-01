import { createSlice } from '@reduxjs/toolkit';

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    setInitialState: (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    setChannel: (state, { payload }) => {
      const { id } = payload;
      state.currentChannelId = id;
    },
    newChannel: (state, { payload }) => {
      const { channel } = payload;
      state.channels = [...state.channels, channel];
      state.currentChannelId = channel.id;
    },
    removeChannel: (state, { payload }) => {
      const { id } = payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
      state.currentChannelId = 1;
    },
    renameChannel: (state, { payload }) => {
      const { id, name } = payload;
      const channel = state.channels.find((ch) => ch.id === id);
      channel.name = name;
    },
  },
});

export const {
  setInitialState,
  setChannel,
  newChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;

export const channelsSelector = (state) => state.channels;

export default channelsSlice.reducer;
