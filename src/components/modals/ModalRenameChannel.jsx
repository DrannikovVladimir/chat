import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { closeModal } from '../../slices/modalsSlice.js';
import { useSocket } from '../../hooks/index.jsx';

const ModalRenameChannel = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { isOpened, type, channelId } = useSelector((state) => state.modals);
  const { channels } = useSelector((state) => state.channels);
  const channelsName = channels.map(({ name }) => name);
  const currentChannelName = channels.find((ch) => ch.id === channelId.id);
  const formik = useFormik({
    initialValues: {
      name: currentChannelName.name,
    },
    validationSchema: Yup.object({
      name: Yup.string().required().min(3).max(20)
        .notOneOf(channelsName),
    }),
    onSubmit: (values, actions) => {
      const channel = { name: values.name, id: channelId.id };
      socket.emit('renameChannel', channel, (res) => {
        if (res.status === 'ok') {
          dispatch(closeModal());
        } else {
          throw new Error('Error network!');
        }
      });
      actions.resetForm();
    },
  });

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  });

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  return (
    <Modal show={isOpened && type === 'renameChannel'} onHide={closeModalHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.errors.name}
              disabled={formik.isSubmitting}
              ref={inputRef}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              type="button"
              className="mr-2"
              variant="secondary"
              onClick={closeModalHandler}
            >
              Отменить
            </Button>
            <Button
              type="submit"
              disabled={formik.isSubmitting}
            >
              Отправить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRenameChannel;
