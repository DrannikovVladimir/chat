import React from 'react';

const Channels = ({ channels, currentChannelId }) => {
  const renderChannels = (items) => {
    if (items.length === 0) {
      return null;
    }

    return (
      <ul className="nav flex-column nav-pills nav-fill">
        {items.map(({ id, name }) => {
          console.log(id);
          return (
            <li key={id} className="nav-item">
              <button
                type="button"
                className={`nav-link btn-block mb-2 text-left btn btn-${id === currentChannelId ? 'primary' : 'light'}`}
              >
                {name}
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Каналы</span>
        <button type="button" className="ml-auto p-0 btn btn-link">+</button>
      </div>
      {renderChannels(channels)}
    </div>
  );
};

export default Channels;
