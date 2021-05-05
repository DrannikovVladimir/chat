import React from 'react';
import { useFormik } from 'formik';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <form className="p-3" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Ваш ник
                <input
                  id="username"
                  type="text"
                  name="username"
                  className="form-control"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Пароль
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </label>
            </div>
            <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
            <div className="d-flex flex-column align-items-center">
              <span className="small mb-2">Нет аккаунта?</span>
              <a href="/signup">Регистрация</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
