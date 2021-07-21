import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { useSocket } from '../hooks/index.jsx';
import { channelsSelector } from '../slices/channelsSlice.js';

const FormMessage = () => {
  const { t } = useTranslation();
  const { currentChannelId } = useSelector(channelsSelector);
  const socket = useSocket();
  const inputRef = useRef();
  const username = localStorage.getItem('username');
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values, actions) => {
      try {
        const message = { text: values.body, user: username, channelId: currentChannelId };
        socket.emit('newMessage', message, (res) => {
          if (res.status === 'ok') {
            actions.resetForm();
            inputRef.current.focus();
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="mt-auto">
      <form onSubmit={formik.handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="body"
            aria-label="body"
            className="form-control"
            data-testid="new-message"
            onChange={formik.handleChange}
            value={formik.values.body}
            ref={inputRef}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">{t('messageForm.button')}</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormMessage;
