import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useUser } from '../hooks/index.jsx';

const NavBar = () => {
  const { t } = useTranslation();
  const { user, logOut } = useUser();

  return (
    <nav className="navbar navbar-light bg-light mb-3">
      <Link to="/" className="navbar-brand">{ t('navbar.title') }</Link>
      {user && <Button onClick={logOut} type="button">{t('navbar.logout')}</Button>}
    </nav>
  );
};

export default NavBar;
