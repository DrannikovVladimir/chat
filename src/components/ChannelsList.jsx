import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { setChannel, channelsSelector } from '../slices/channelsSlice.js';
import { openModal } from '../slices/modalsSlice.js';

const ChannelsList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector(channelsSelector);
  const getCurrentButton = (id) => (id === currentChannelId ? 'btn-primary' : 'btn-light');
  const getTypeButton = (id) => (id === currentChannelId ? 'primary' : 'light');

  if (channels.length === 0) {
    return null;
  }

  const setChannelHandler = (id) => () => {
    dispatch(setChannel({ id }));
  };

  const openModalHandler = (type, channelId) => () => {
    dispatch(openModal({ type, channelId }));
  };

  return (
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map(({ id, name, removable }) => (
        <li key={id} className="nav-item mb-2">
          <Dropdown as={ButtonGroup} className="d-flex mb-2">
            <Button
              className={`nav-link btn-block text-left btn-primary ${getCurrentButton(id)}`}
              onClick={setChannelHandler(id)}
            >
              {name}
            </Button>
            { removable
              ? (
                <>
                  <Dropdown.Toggle
                    split
                    variant={getTypeButton(id)}
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
                </>
              ) : null }
          </Dropdown>
        </li>
      ))}
    </ul>
  );
};

export default ChannelsList;
