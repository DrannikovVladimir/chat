import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { useSocket } from '../../hooks/index.jsx';
import { channelsSelector, channelsNameSelector } from '../../slices/channelsSlice.js';

const FormRenameChannel = ({ channelId, onHide }) => {
  const { t } = useTranslation();
  const socket = useSocket();
  const inputRef = useRef();
  const channels = useSelector(channelsSelector);
  const channelsName = useSelector(channelsNameSelector);
  const currentChannelName = channels.find((ch) => ch.id === channelId.id);
  const formik = useFormik({
    initialValues: {
      name: currentChannelName.name,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(t('validation.required'))
        .min(3, t('validation.channel'))
        .max(20, t('validation.channel'))
        .notOneOf(channelsName, t('validation.channelUnique')),
    }),
    onSubmit: (values) => {
      const channel = { name: values.name, id: channelId.id };
      try {
        socket.renameCurrentChannel(channel);
        onHide();
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },
  });

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
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
          onClick={onHide}
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
  );
};

export default FormRenameChannel;
