import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Modal from './Modal.jsx';
import { UserContext } from '../contexts/index.jsx';
import { useUser } from '../hooks/index.jsx';
import ChatPage from './ChatPage.jsx';
import LoginPage from './LoginPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import NavBar from './NavBar.jsx';
import NotFoundPage from './NotFoundPage.jsx';

const UserProvider = ({ children }) => {
  const userToken = localStorage.getItem('token');

  const [user, setUser] = useState(!!userToken);

  const logIn = ({ token, username }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setUser(true);
  };
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(false);
  };

  return (
    <UserContext.Provider value={{
      user,
      logIn,
      logOut,
    }}
    >
      {children}
    </UserContext.Provider>
  );
};

const ChatRoute = ({ children, path, exact }) => {
  const auth = useUser();

  return (
    <Route exact={exact} path={path}>
      {auth.user ? children : <Redirect to="/login" />}
    </Route>
  );
};

const App = ({ initialState }) => (
  <UserProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <NavBar />
        <Switch>
          <ChatRoute exact path="/">
            <ChatPage initialState={initialState} />
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
      </div>
      <Modal />
    </Router>
  </UserProvider>
);

export default App;
