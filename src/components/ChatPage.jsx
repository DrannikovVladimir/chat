import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { initialChannels } from '../slices/channelsSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

const ChatPage = () => {
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const { messages } = useSelector((state) => state.messages);
  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get('/api/v1/data', { headers: getAuthHeader() });
      dispatch(initialChannels(data));
    };

    fetchContent();
  }, [dispatch]);

  return (
    <div className="row pb-5 flex-grow-1 h-75 pb-3">
      <Channels channels={channels} currentChannelId={currentChannelId} />
      <Messages messages={messages} />
    </div>
  );
};

export default ChatPage;
