import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { UserContext } from '../contexts/index.jsx';
import { useUser } from '../hooks/index.jsx';
import ChatPage from './ChatPage.jsx';
import LoginPage from './LoginPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import NavBar from './NavBar.jsx';
import NotFoundPage from './NotFoundPage.jsx';

const UserProvider = ({ children }) => {
  const userToken = localStorage.getItem('token');

  const [loggedIn, setLoggedIn] = useState(!!userToken);

  const logIn = ({ token, username }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

const ChatRoute = ({ children, path, exact }) => {
  const auth = useUser();

  return (
    <Route exact={exact} path={path}>
      {auth.loggedIn ? children : <Redirect to="/login" />}
    </Route>
  );
};

const App = () => (
  <UserProvider>
    <div className="d-flex flex-column h-100">
      <NavBar />
      <Router>
        <Switch>
          <ChatRoute exact path="/">
            <ChatPage />
          </ChatRoute>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </div>
  </UserProvider>
);

export default App;
