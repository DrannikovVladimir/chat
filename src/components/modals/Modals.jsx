import React from 'react';
import ModalNewChannel from './ModalNewChannel.jsx';
import ModalRemoveChannel from './ModalRemoveChannel.jsx';
import ModalRenameChannel from './ModalRenameChannel.jsx';

const Modals = {
  newChannel: <ModalNewChannel />,
  removeChannel: <ModalRemoveChannel />,
  renameChannel: <ModalRenameChannel />,
};

const Types = {
  newChannel: 'newChannel',
  removeChannel: 'removeChannel',
  renameChannel: 'renameChannel',
};

export { Modals, Types };
