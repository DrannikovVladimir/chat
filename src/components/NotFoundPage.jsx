import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <h2>{t('notFoundPage.title')}</h2>
  );
};

export default NotFoundPage;
