import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { useSocket, useUser } from '../../hooks/index.jsx';
import { channelsNameSelector } from '../../slices/channelsSlice.js';

const FormNewChannel = ({ onHide }) => {
  const { t } = useTranslation();
  const socket = useSocket();
  const inputRef = useRef();
  const { user: { username } } = useUser();
  const channelsName = useSelector(channelsNameSelector);
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(t('validation.required'))
        .min(3, t('validation.channel'))
        .max(20, t('validation.channel'))
        .notOneOf(channelsName, t('validation.channelUnique')),
    }),
    onSubmit: (values) => {
      const channel = { user: username, name: values.name };
      socket.emit('newChannel', channel, (res) => {
        if (res.status === 'ok') {
          onHide();
        } else {
          throw new Error(('errors.network'));
        }
      });
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
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
          onClick={onHide}
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
  );
};

export default FormNewChannel;
