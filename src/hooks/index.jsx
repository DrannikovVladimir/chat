import { useContext } from 'react';

import { UserContext, SocketContext } from '../contexts/index.jsx';

const useUser = () => useContext(UserContext);
const useSocket = () => useContext(SocketContext);

export { useUser, useSocket };
