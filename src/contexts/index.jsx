import { createContext } from 'react';

const UserContext = createContext(null);
const SocketContext = createContext(null);
const RollbarContext = createContext(null);

export { UserContext, SocketContext, RollbarContext };
