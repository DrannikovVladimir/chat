import React from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useUser } from '../hooks/index.jsx';

const NavBar = () => {
  const { t } = useTranslation();
  const { user, logOut } = useUser();

  const buttonLogoutHandler = () => logOut();

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand href="/">{t('navbar.title')}</Navbar.Brand>
        {user && <Button onClick={buttonLogoutHandler} type="button">{t('navbar.logout')}</Button>}
      </Container>
    </Navbar>
  );
};

export default NavBar;
