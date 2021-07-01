import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { useSocket } from '../../hooks/index.jsx';
import { closeModal, modalsSelector } from '../../slices/modalsSlice.js';
import { channelsSelector } from '../../slices/channelsSlice.js';

const ModalRenameChannel = () => {
  const { t } = useTranslation();
  const socket = useSocket();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { isOpened, type, channelId } = useSelector(modalsSelector);
  const { channels } = useSelector(channelsSelector);
  const channelsName = channels.map(({ name }) => name);
  const currentChannelName = channels.find((ch) => ch.id === channelId.id);
  const formik = useFormik({
    initialValues: {
      name: currentChannelName.name,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(`${t('validation.required')}`)
        .min(3, `${t('validation.channel')}`)
        .max(20, `${t('validation.channel')}`)
        .notOneOf(channelsName, `${t('validation.channelUnique')}`),
    }),
    onSubmit: (values, actions) => {
      const channel = { name: values.name, id: channelId.id };
      socket.emit('renameChannel', channel, (res) => {
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
    inputRef.current.select();
  }, []);

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  return (
    <Modal show={isOpened && type === 'renameChannel'} onHide={closeModalHandler}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              name="name"
              data-testid="rename-channel"
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
              {t('modals.buttonCancel')}
            </Button>
            <Button
              type="submit"
              disabled={formik.isSubmitting}
            >
              {t('modals.renameChannel.button')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRenameChannel;