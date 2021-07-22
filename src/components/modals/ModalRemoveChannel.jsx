import React from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useSocket } from '../../hooks/index.jsx';
import { modalsSelector } from '../../slices/modalsSlice.js';

const ModalRemoveChannel = ({ onHide }) => {
  const { t } = useTranslation();
  const socket = useSocket();
  const { type, channelId } = useSelector(modalsSelector);

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
    <Modal show={type !== null && type === 'removeChannel'} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  );
};

export default ModalRemoveChannel;
