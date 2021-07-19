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
  const { localStorage } = window;
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
