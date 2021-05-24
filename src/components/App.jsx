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
  // localStorage.removeItem('user');
  const userData = JSON.parse(localStorage.getItem('user'));
  const currentUser = userData ? { username: userData.username } : null;
  const [user, setUser] = useState(currentUser);
  const logIn = ({ username, token }) => {
    localStorage.setItem('user', JSON.stringify({ username, token }));
    setUser({ username });
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

const ChatRoute = ({ children, path }) => {
  const auth = useUser();

  return (
    <Route
      path={path}
      render={({ location }) => (auth.user
        ? children
        : <Redirect to={{ pathname: '/login', state: { from: location } }} />)}
    />
  );
};

const App = () => {
  console.log('App');
  return (
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
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </UserProvider>
  );
};

export default App;
