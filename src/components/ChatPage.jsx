import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { useUser } from '../hooks/index.jsx';
import { setInitialState } from '../slices/channelsSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import FormMessage from './FormMessage.jsx';
import ChannelsList from './ChannelsList.jsx';
import routers from '../routes.js';

const ChatPage = () => {
  const dispatch = useDispatch();
  const auth = useUser();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(routers.usersPath(), { headers: auth.getAuthHeader() });
        dispatch(setInitialState(data));
      } catch (err) {
        if (err.response.status === 401) {
          auth.logOut();
          return;
        }

        throw new Error(err);
      }
    };

    fetchContent();
  }, [dispatch, auth]);

  return (
    <div className="row pb-5 flex-grow-1 h-75 pb-3">
      <Channels>
        <ChannelsList />
      </Channels>
      <Messages>
        <FormMessage />
      </Messages>
    </div>
  );
};

export default ChatPage;
