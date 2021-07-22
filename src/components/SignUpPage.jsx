import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { useUser } from '../hooks/index.jsx';

const SignUpPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const user = useUser();
  const userRef = useRef();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required(t('validation.required'))
        .min(3, t('validation.username'))
        .max(20, t('validation.username')),
      password: Yup.string()
        .required(t('validation.required'))
        .min(6, t('validation.password')),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], t('validation.passwordConfirmation')),
    }),
    onSubmit: async (values, actions) => {
      try {
        const response = await axios.post('/api/v1/signup', values);
        const { data } = response;
        user.logIn(data);
        actions.resetForm();
        history.push('/');
      } catch (err) {
        if (err.response.status === 409) {
          actions.setFieldError('passwordConfirmation', t('registrationForm.error'));
          actions.setFieldError('password', ' ');
          actions.setFieldError('username', ' ');
          actions.setStatus('invalid');
          userRef.current.select();
        }
      }
    },
  });

  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <Container fluid>
      <Row className="justify-content-center pt-5">
        <Col sm="4">
          <Form className="pt-3" onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="username">{t('registrationForm.username')}</Form.Label>
              <Form.Control
                type="text"
                name="username"
                id="username"
                placeholder={t('registrationForm.usernamePlaceholder')}
                autoComplete="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                isInvalid={formik.errors.username}
                ref={userRef}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">{t('registrationForm.password')}</Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                placeholder={t('registrationForm.passwordPlaceholder')}
                autoComplete="new-password"
                onChange={formik.handleChange}
                value={formik.values.password}
                isInvalid={formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="passwordConfirmation">{t('registrationForm.passwordConfirmation')}</Form.Label>
              <Form.Control
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                placeholder={t('registrationForm.passwordConfirmationPlaceholder')}
                autoComplete="new-password"
                onChange={formik.handleChange}
                value={formik.values.passwordConfirmation}
                isInvalid={formik.errors.passwordConfirmation}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.passwordConfirmation}</Form.Control.Feedback>
            </Form.Group>
            <Button
              type="submit"
              className="w-100 outline-primary"
              disabled={formik.isSubmitting}
            >
              {t('registrationForm.registrationButton')}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
