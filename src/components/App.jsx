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

const getUserData = ({ token, username }) => ({
  token,
  username,
});

const UserProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem('userId'));
  const getAuthHeader = () => {
    if (userData?.token) {
      return { Authorization: `Bearer ${userData.token}` };
    }

    return {};
  };

  const [user, setUser] = useState(() => getUserData(userData));

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setUser(data);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setUser(null);
  };

  const [counter, setCounter] = useState(0);

  return (
    <UserContext.Provider value={{
      user,
      logIn,
      logOut,
      getAuthHeader,
    }}
    >
      {children}
      <button type="button" onClick={() => setCounter(counter + 1)}>{counter}</button>
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
