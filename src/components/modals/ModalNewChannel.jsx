import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { useSocket, useUser } from '../../hooks/index.jsx';
import { closeModal, modalsSelector } from '../../slices/modalsSlice.js';
import { channelsSelector } from '../../slices/channelsSlice.js';

const ModalNewChannel = () => {
  const { t } = useTranslation();
  const socket = useSocket();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { type } = useSelector(modalsSelector);
  const username = localStorage.getItem('username');
  const { channels } = useSelector(channelsSelector);
  const channelsName = channels.map(({ name }) => name);
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(`${t('validation.required')}`)
        .min(3, `${t('validation.channel')}`)
        .max(20, `${t('validation.channel')}`)
        .notOneOf(channelsName, `${t('validation.channelUnique')}`),
    }),
    onSubmit: (values, actions) => {
      const channel = { user: username, name: values.name };
      socket.emit('newChannel', channel, (res) => {
        if (res.status === 'ok') {
          dispatch(closeModal());
        } else {
          throw new Error(`${t('errors.network')}`);
        }
      });
      actions.resetForm();
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const modalCloseHandler = () => {
    dispatch(closeModal());
  };

  return (
    <Modal show={type !== null && type === 'newChannel'} onHide={modalCloseHandler}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.newChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              name="name"
              data-testid="add-channel"
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
              onClick={modalCloseHandler}
            >
              {t('modals.buttonCancel')}
            </Button>
            <Button
              type="submit"
              disabled={formik.isSubmitting}
            >
              {t('modals.newChannel.button')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalNewChannel;
