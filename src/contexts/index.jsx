import { createContext } from 'react';
import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  accessToken: process.env.TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const UserContext = createContext({});
const SocketContext = createContext(null);
const RollbarContext = createContext(rollbar);

export { UserContext, SocketContext, RollbarContext };
export default rollbar;
