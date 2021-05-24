import React, { useRef, useEffect } from 'react';
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
      username: Yup.string().required().min(3).max(20),
      password: Yup.string().required().min(6),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null]),
    }),
    onSubmit: async (values, actions) => {
      try {
        const response = await axios.post('/api/v1/signup', values);
        const { data } = response;
        user.logIn(data);
        history.replace('/');
        actions.resetForm();
      } catch (err) {
        if (err.response.status === 409) {
          actions.setFieldError('passwordConfirmation', 'Такой пользователь уже существует');
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
              <Form.Label htmlFor="username">Имя пользователя</Form.Label>
              <Form.Control
                type="text"
                name="username"
                id="username"
                placeholder="От 3 до 20 сиволов"
                autoComplete="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                isInvalid={formik.touched.username && formik.errors.username}
                ref={userRef}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Пароль</Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                placeholder="Не менее 6 символов"
                autoComplete="new-password"
                onChange={formik.handleChange}
                value={formik.values.password}
                isInvalid={formik.touched.password && formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="passwordConfirmation">Пароль</Form.Label>
              <Form.Control
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                placeholder="Пароли должны совпадать"
                autoComplete="new-password"
                onChange={formik.handleChange}
                value={formik.values.passwordConfirmation}
                isInvalid={formik.touched.passwordConfirmation
                  && formik.errors.passwordConfirmation}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.passwordConfirmation}</Form.Control.Feedback>
            </Form.Group>
            <Button
              type="submit"
              className="w-100 outline-primary"
              disabled={formik.isSubmitting}
            >
              Зарегистрироваться
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
