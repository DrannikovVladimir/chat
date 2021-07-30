import FormNewChannel from './FormNewChannel.jsx';
import FormRemoveChannel from './FormRemoveChannel.jsx';
import FormRenameChannel from './FormRenameChannel.jsx';

const forms = {
  newChannel: FormNewChannel,
  removeChannel: FormRemoveChannel,
  renameChannel: FormRenameChannel,
};

export default (modalName) => forms[modalName];
