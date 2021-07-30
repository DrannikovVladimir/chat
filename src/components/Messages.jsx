import React from 'react';
import { useSelector } from 'react-redux';

import { messagesSelector } from '../slices/messagesSlice.js';
import { channelIdSelector } from '../slices/channelsSlice.js';

const Messages = ({ children }) => {
  const messages = useSelector(messagesSelector);
  const currentChannelId = useSelector(channelIdSelector);

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          <div className="chat-messages overflow-auto mb-3">
            {messages && messages
              .filter((message) => message.channelId === currentChannelId)
              .map(({ id, text, user }) => (
                <div key={id} className="text-break">
                  <b>{user}</b>
                  {`: ${text}`}
                </div>
              ))}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Messages;
