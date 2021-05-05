import React from 'react';
import { render } from 'react-dom';

import App from './components/App.jsx';

const run = () => {
  console.log('run');
  return render(
    <App />,
    document.querySelector('#chat'),
  );
};

export default run;
