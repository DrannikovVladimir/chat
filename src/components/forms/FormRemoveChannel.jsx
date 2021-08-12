import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useSocket } from '../../hooks/index.jsx';

const ModalRemoveChannel = ({ channelId, onHide }) => {
  const { t } = useTranslation();
  const socket = useSocket();

  const removeChannelHandler = () => {
    try {
      socket.removeCurrentChannel(channelId);
      onHide();
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
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
