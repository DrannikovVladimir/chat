import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useSocket } from '../../hooks/index.jsx';
import { closeModal } from '../../slices/modalsSlice.js';

const ModalRemoveChannel = () => {
  const { t } = useTranslation();
  const socket = useSocket();
  const dispatch = useDispatch();
  const { isOpened, type, channelId } = useSelector((state) => state.modals);

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  const removeChannelHandler = () => {
    socket.emit('removeChannel', channelId, (res) => {
      if (res.status === 'ok') {
        closeModalHandler();
      } else {
        throw new Error(`${t('errors.network')}`);
      }
    });
  };

  return (
    <Modal show={isOpened && type === 'removeChannel'} onHide={closeModalHandler}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modals.removeChannel.confirm')}
        <div className="d-flex justify-content-between">
          <Button
            type="button"
            variant="secondary"
            onClick={closeModalHandler}
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
