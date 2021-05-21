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
      return { isOpened: true, type, channelId };
    },
    closeModal: () => ({ isOpened: false, type: null, channelId: null }),
  },
});

export const { openModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer;
