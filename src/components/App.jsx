import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import ChatPage from './ChatPage.jsx';
import LoginPage from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';

const App = () => {
  console.log('App');
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ChatPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
