// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import { render } from 'react-dom';
import { io } from 'socket.io-client';
import Rollbar from 'rollbar';
// @ts-ignore
import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const rollbar = new Rollbar({
  accessToken: process.env.TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const socket = io();

init(socket, rollbar).then((vdom) => {
  render(vdom, document.querySelector('#chat'));
});
