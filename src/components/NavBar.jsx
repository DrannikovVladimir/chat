import React from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useUser } from '../hooks/index.jsx';

const NavBar = () => {
  const { t } = useTranslation();
  const { loggedIn, logOut } = useUser();

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand href="/">{t('navbar.title')}</Navbar.Brand>
        {loggedIn && <Button onClick={logOut} type="button">{t('navbar.logout')}</Button>}
      </Container>
    </Navbar>
  );
};

export default NavBar;
