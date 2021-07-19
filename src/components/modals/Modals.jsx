import ModalNewChannel from './ModalNewChannel.jsx';
import ModalRemoveChannel from './ModalRemoveChannel.jsx';
import ModalRenameChannel from './ModalRenameChannel.jsx';

const modals = {
  newChannel: ModalNewChannel,
  removeChannel: ModalRemoveChannel,
  renameChannel: ModalRenameChannel,
};

export default (modalName) => modals[modalName];
