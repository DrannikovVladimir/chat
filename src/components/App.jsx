import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal, modalsSelector } from '../slices/modalsSlice.js';
import getModal from './modals/Modals.jsx';
import { UserContext } from '../contexts/index.jsx';
import { useUser } from '../hooks/index.jsx';
import ChatPage from './ChatPage.jsx';
import LoginPage from './LoginPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import NavBar from './NavBar.jsx';
import NotFoundPage from './NotFoundPage.jsx';

const renderModal = (type, onHide) => {
  if (!type) {
    return null;
  }
  const Component = getModal(type);
  return <Component onHide={onHide} />;
};

const UserProvider = ({ children }) => {
  const { localStorage } = window;
  // localStorage.removeItem('user');
  const userData = JSON.parse(localStorage.getItem('user'));
  const currentUser = userData ?? null;

  const [user, setUser] = useState(currentUser);
  const logIn = ({ username, token }) => {
    localStorage.setItem('user', JSON.stringify({ username, token }));
    setUser({ username, token });
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  const isAuthorized = () => {
    if (!user) {
      return false;
    }
    const { username, token } = user;
    return !!username && !!token;
  };

  return (
    <UserContext.Provider value={{
      user,
      logIn,
      logOut,
      isAuthorized,
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
      {auth.isAuthorized() ? children : <Redirect to="/login" />}
    </Route>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const { type } = useSelector(modalsSelector);
  const onHide = () => {
    dispatch(closeModal());
  };

  return (
    <UserProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          <NavBar />
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
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </div>
        {renderModal(type, onHide)}
      </Router>
    </UserProvider>
  );
};

export default App;
