import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { setChannel, channelsSelector } from '../slices/channelsSlice.js';
import { openModal, modalsSelector } from '../slices/modalsSlice.js';
import { Modals, Types } from './modals/Modals.jsx';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { type: modalType } = useSelector(modalsSelector);
  const { channels, currentChannelId } = useSelector(channelsSelector);
  const renderChannels = (items) => {
    if (items.length === 0) {
      return null;
    }

    const setChannelHandler = (id) => () => {
      dispatch(setChannel({ id }));
    };

    const openModalHandler = (type, channelId) => () => {
      dispatch(openModal({ type, channelId }));
    };

    return (
      <>
        <ul className="nav flex-column nav-pills nav-fill">
          {items.map(({ id, name, removable }) => (
            <li key={id} className="nav-item">
              {
              removable
                ? (
                  <Dropdown as={ButtonGroup} className="d-flex mb-2">
                    <Button
                      variant={id === currentChannelId ? 'primary' : 'light'}
                      className="flex-grow-1 text-left nav-link"
                      onClick={setChannelHandler(id)}
                    >
                      {name}
                    </Button>

                    <Dropdown.Toggle
                      split
                      variant={id === currentChannelId ? 'primary' : 'light'}
                      id="dropdown-split-basic"
                      className="flex-grow-0"
                    />

                    <Dropdown.Menu>
                      <Dropdown.Item
                        href=""
                        onClick={openModalHandler('removeChannel', { id })}
                      >
                        {t('channels.remove')}
                      </Dropdown.Item>
                      <Dropdown.Item
                        href=""
                        onClick={openModalHandler('renameChannel', { id })}
                      >
                        {t('channels.rename')}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )
                : (
                  <button
                    type="button"
                    className={`nav-link btn-block mb-2 text-left btn btn-primary ${id === currentChannelId ? 'btn-primary' : 'btn-light'}`}
                    onClick={setChannelHandler(id)}
                  >
                    {name}
                  </button>
                )
            }
            </li>
          ))}
        </ul>
        {modalType === Types[modalType] && Modals[modalType]}
      </>
    );
  };

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
      {renderChannels(channels)}
    </div>
  );
};

export default Channels;
