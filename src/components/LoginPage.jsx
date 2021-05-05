import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  Form,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';

import useUser from '../hooks/index.jsx';

const LoginPage = () => {
  const user = useUser();
  const location = useLocation();
  const history = useHistory();
  const inputRef = useRef();
  const [userFailed, setUserFailed] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setUserFailed(false);
      try {
        const { data } = await axios.post('/api/v1/login', values);
        user.logIn(data);
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      } catch (err) {
        setUserFailed(true);
        inputRef.current.local();
        throw err;
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Container fluid>
      <Row className="justify-content-center pt-5">
        <Col sm="4">
          <Form className="p-3" onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="username">Ваш ник</Form.Label>
              <Form.Control
                id="username"
                type="text"
                name="username"
                className="form-control"
                required
                onChange={formik.handleChange}
                value={formik.values.username}
                ref={inputRef}
                isInvalid={userFailed}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Пароль</Form.Label>
              <Form.Control
                id="password"
                name="password"
                type="password"
                className="form-control"
                required
                onChange={formik.handleChange}
                value={formik.values.password}
                isInvalid={userFailed}
              />
              <Form.Control.Feedback type="invalid">The username or password is incorrect!</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" className="w-100 mb-3 btn outline-primary">Войти</Button>
            <Container className="d-flex flex-column align-items-center">
              <span className="small mb-2">Нет аккаунта?</span>
              <a href="/signup">Регистрация</a>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
