import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/store.js';
import { SocketContext } from './contexts/index.jsx';
import { addMessage } from './slices/messagesSlice.js';
import { newChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';

import App from './components/App.jsx';

const SocketProvider = ({ children, socket }) => (
  <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
);

const run = (socket) => {
  socket.on('newMessage', (message) => store.dispatch(addMessage({ message })));
  socket.on('newChannel', (channel) => store.dispatch(newChannel({ channel })));
  socket.on('removeChannel', (channelId) => store.dispatch(removeChannel(channelId)));
  socket.on('renameChannel', (channel) => store.dispatch(renameChannel(channel)));

  return render(
    <SocketProvider socket={socket}>
      <Provider store={store}>
        <App />
      </Provider>
    </SocketProvider>,
    document.querySelector('#chat'),
  );
};

export default run;
