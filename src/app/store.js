import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from '../slices/channelsSlice.js';
import messagesreducer from '../slices/messagesSlice.js';
import modalsReducer from '../slices/modalsSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesreducer,
    modals: modalsReducer,
  },
});
