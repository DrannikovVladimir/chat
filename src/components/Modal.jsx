import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { modalsSelector, closeModal } from '../slices/modalsSlice.js';
import getForm from './forms/index.jsx';

const ModalTemplate = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { type, channelId } = useSelector(modalsSelector);
  const onHide = () => {
    dispatch(closeModal());
  };

  const formTitle = {
    newChannel: t('modals.newChannel.title'),
    removeChannel: t('modals.removeChannel.title'),
    renameChannel: t('modals.renameChannel.title'),
  };

  const renderForm = (typeForm, channelIdForm) => {
    if (!typeForm) {
      return null;
    }

    const Component = getForm(typeForm);
    return <Component channelId={channelIdForm} onHide={onHide} />;
  };

  return (
    <Modal show={type !== null} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{formTitle[type]}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderForm(type, channelId)}
      </Modal.Body>
    </Modal>
  );
};

export default ModalTemplate;
