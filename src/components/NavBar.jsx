import React from 'react';
import { Button, Navbar } from 'react-bootstrap';

import { useUser } from '../hooks/index.jsx';

const NavBar = () => {
  const { user, logOut } = useUser();

  const buttonLogoutHandler = () => logOut();

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
      {user && <Button onClick={buttonLogoutHandler} type="button">Logout</Button>}
    </Navbar>
  );
};

export default NavBar;
