// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import { render } from 'react-dom';
import { io } from 'socket.io-client';
// @ts-ignore
import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io();

render(init(socket), document.querySelector('#chat'));
