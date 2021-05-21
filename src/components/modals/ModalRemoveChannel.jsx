import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import { useSocket } from '../../hooks/index.jsx';
import { closeModal } from '../../slices/modalsSlice.js';

const ModalRemoveChannel = () => {
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
        throw new Error('Error network!');
      }
    });
  };

  return (
    <Modal show={isOpened && type === 'removeChannel'} onHide={closeModalHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канад</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Уверены?
        <div className="d-flex justify-content-between">
          <Button
            type="button"
            variant="secondary"
            onClick={closeModalHandler}
          >
            Отменить
          </Button>
          <Button
            type="button"
            onClick={removeChannelHandler}
          >
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRemoveChannel;
