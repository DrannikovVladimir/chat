/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import store from './app/store.js';
import resources from './locales/locales.js';
import { RollbarContext, SocketContext } from './contexts/index.jsx';
import { addMessage } from './slices/messagesSlice.js';
import { newChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';
import App from './components/App.jsx';

const init = async (socket, rollbar) => {
  const i18nInstance = await i18n.createInstance();
  i18nInstance
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources,
    });

  socket.on('newMessage', (message) => store.dispatch(addMessage({ message })));
  socket.on('newChannel', (channel) => store.dispatch(newChannel({ channel })));
  socket.on('removeChannel', (channelId) => store.dispatch(removeChannel(channelId)));
  socket.on('renameChannel', (channel) => store.dispatch(renameChannel(channel)));

  const SocketProvider = ({ children }) => {
    const addNewMessage = (message) => {
      socket.emit('newMessage', message, () => {});
    };
    const addNewChannel = (channel) => {
      socket.emit('newChannel', channel, () => {});
    };
    const removeCurrentChannel = (channelId) => {
      socket.emit('removeChannel', channelId, () => {});
    };
    const renameCurrentChannel = (channel) => {
      socket.emit('renameChannel', channel, () => {});
    };

    return (
      <SocketContext.Provider value={{
        addNewMessage,
        addNewChannel,
        removeCurrentChannel,
        renameCurrentChannel,
      }}
      >
        {children}
      </SocketContext.Provider>
    );
  };

  return (
    <Provider store={store}>
      <RollbarContext.Provider value={rollbar}>
        <SocketProvider>
          <I18nextProvider i18n={i18nInstance}>
            <App />
          </I18nextProvider>
        </SocketProvider>
      </RollbarContext.Provider>
    </Provider>
  );
};

export default init;
