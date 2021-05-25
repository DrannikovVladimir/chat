import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';

import store from './app/store.js';
import resources from './locales/locales.js';
import { SocketContext } from './contexts/index.jsx';
import { addMessage } from './slices/messagesSlice.js';
import { newChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';
import App from './components/App.jsx';

const SocketProvider = ({ children, socket }) => (
  <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
);

const run = async (socket) => {
  const i18nInstance = i18n.createInstance();
  await i18nInstance.init({
    lng: 'ru',
    resources,
    debug: true,
  });

  socket.on('newMessage', (message) => store.dispatch(addMessage({ message })));
  socket.on('newChannel', (channel) => store.dispatch(newChannel({ channel })));
  socket.on('removeChannel', (channelId) => store.dispatch(removeChannel(channelId)));
  socket.on('renameChannel', (channel) => store.dispatch(renameChannel(channel)));

  return render(
    <SocketProvider socket={socket}>
      <I18nextProvider i18n={i18nInstance}>
        <Provider store={store}>
          <App />
        </Provider>
      </I18nextProvider>
    </SocketProvider>,
    document.querySelector('#chat'),
  );
};

export default run;
