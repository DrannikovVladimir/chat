import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useSocket } from '../../hooks/index.jsx';

const ModalRemoveChannel = ({ channelId, onHide }) => {
  const { t } = useTranslation();
  const socket = useSocket();

  const removeChannelHandler = () => {
    socket.emit('removeChannel', channelId, (res) => {
      if (res.status === 'ok') {
        onHide();
      } else {
        throw new Error(t('errors.network'));
      }
    });
  };

  return (
    <>
      {t('modals.removeChannel.confirm')}
      <div className="d-flex justify-content-between">
        <Button
          type="button"
          variant="secondary"
          onClick={onHide}
        >
          {t('modals.buttonCancel')}
        </Button>
        <Button
          type="button"
          onClick={removeChannelHandler}
        >
          {t('modals.removeChannel.button')}
        </Button>
      </div>
    </>
  );
};

export default ModalRemoveChannel;
