import React from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useSocket, useUser } from '../hooks/index.jsx';

const FormMessage = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const socket = useSocket();
  const { user: { username } } = useUser();
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values, acitons) => {
      try {
        const message = { text: values.body, user: username, channelId: currentChannelId };
        socket.emit('newMessage', message, () => {});
        acitons.resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="mt-auto">
      <form onSubmit={formik.handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="body"
            aria-label="body"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.body}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">Отправить</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormMessage;
