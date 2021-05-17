import React from 'react';

const Messages = ({ children, messages }) => {
  console.log(messages);
  const renderMessages = (items) => {
    if (items.length === 0) {
      return null;
    }

    return (
      <div className="chat-messages overflow-auto mb-3">
        {messages.map(({ id, text, user }) => (
          <div key={id} className="text-break">
            <b>{user}</b>
            :
            {` ${text}`}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          {renderMessages(messages)}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Messages;
