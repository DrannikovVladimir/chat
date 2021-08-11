import React, { useCallback, useState } from 'react';
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

const getUserData = (userData) => {
  if (!userData) {
    return null;
  }
  return {
    token: userData.token,
    username: userData.username,
  };
};

const UserProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem('userId'));
  const getAuthHeader = () => {
    if (userData?.token) {
      return { Authorization: `Bearer ${userData.token}` };
    }

    return {};
  };

  const [user, setUser] = useState(() => getUserData(userData));

  const logIn = useCallback((data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setUser(data);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
    setUser(null);
  }, []);

  return (
    <UserContext.Provider value={{
      user,
      logIn,
      logOut,
      getAuthHeader,
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

const App = () => (
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
