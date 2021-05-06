import React from 'react';
import { useFormik } from 'formik';

const Messages = ({ messages }) => {
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const renderMessages = (items) => {
    if (items.length === 0) {
      return null;
    }

    return items;
  };

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          {renderMessages(messages)}
        </div>
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
      </div>
    </div>
  );
};

export default Messages;
