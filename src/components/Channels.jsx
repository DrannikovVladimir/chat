import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { openModal } from '../slices/modalsSlice.js';

const Channels = ({ children }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const newChannelHandler = (type, channelId = null) => () => {
    dispatch(openModal({ type, channelId }));
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>{t('channels.title')}</span>
        <button
          onClick={newChannelHandler('newChannel')}
          type="button"
          className="ml-auto p-0 btn btn-link"
        >
          +
        </button>
      </div>
      {children}
    </div>
  );
};

export default Channels;
