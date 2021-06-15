import { createContext } from 'react';
import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  accessToken: '7139cb6f908947c2b6166d41e28fe1a1',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const UserContext = createContext({});
const SocketContext = createContext(null);
const RollbarContext = createContext(rollbar);

export { UserContext, SocketContext, RollbarContext };
export default rollbar;
