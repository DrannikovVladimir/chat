import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/store.js';
import { SocketContext } from './contexts/index.jsx';
import { addMessage } from './slices/messagesSlice.js';

import App from './components/App.jsx';

const SocketProvider = ({ children, socket }) => (
  <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
);

const run = (socket) => {
  socket.on('newMessage', (message) => store.dispatch(addMessage({ message })));

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
