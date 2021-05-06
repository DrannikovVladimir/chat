import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/store.js';

import App from './components/App.jsx';

const run = () => {
  console.log('run');
  return render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#chat'),
  );
};

export default run;
