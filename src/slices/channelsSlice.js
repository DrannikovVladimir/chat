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
      return { channels, currentChannelId };
    },
    setChannel: (state, { payload }) => {
      const { id } = payload;
      const { channels } = state;
      return { channels, currentChannelId: id };
    },
    newChannel: (state, { payload }) => {
      const { channel } = payload;
      const channels = [...state.channels, channel];
      return { channels, currentChannelId: channel.id };
    },
    removeChannel: (state, { payload }) => {
      const { id } = payload;
      const channels = state.channels.filter((channel) => channel.id !== id);
      return { channels, currentChannelId: 1 };
    },
    renameChannel: (state, { payload }) => {
      const { id, name } = payload;
      const channel = state.channels.find((ch) => ch.id === id);
      channel.name = name;
      return state;
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

export default channelsSlice.reducer;
