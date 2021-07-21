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
  const userToken = localStorage.getItem('token');
  console.log(userToken);

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
