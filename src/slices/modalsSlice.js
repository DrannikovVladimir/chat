import { createSlice } from '@reduxjs/toolkit';

export const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    isOpened: false,
    type: null,
    channelId: null,
  },
  reducers: {
    openModal: (state, { payload }) => {
      const { type, channelId } = payload;
      state.isOpened = true;
      state.type = type;
      state.channelId = channelId;
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.type = null;
      state.channelId = null;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer;
