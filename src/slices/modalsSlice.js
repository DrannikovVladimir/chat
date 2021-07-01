import { createSlice } from '@reduxjs/toolkit';

export const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    type: null,
    channelId: null,
  },
  reducers: {
    openModal: (state, { payload }) => {
      const { type, channelId } = payload;
      state.type = type;
      state.channelId = channelId;
    },
    closeModal: (state) => {
      state.type = null;
      state.channelId = null;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;

export const modalsSelector = (state) => state.modals;

export default modalsSlice.reducer;
