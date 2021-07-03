import React from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import logo from '../images/Track-It-Logo.png';


const Main = styled.div`
  max-width: 444px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  padding-left: 24px;
  padding-right: 24px;
  margin-top: 60px;
`

function Login({ values, errors, touched, status }) {
  return (
    <Main>
      <img className="login-logo" src={logo} alt="track it logo"/>
      <Form>
        <label htmlFor="username">
          <Field id="username" 
            type="text"
            name="username"
            placeholder="Username"
            className="username-field"
          />
          {touched.username && errors.username && (
            // errors.name comes from Yup
            <p>{errors.username}</p>
          )}
        </label>
      </Form>
      <Form>
        <label htmlFor="password">
          <Field id="password"
            type="password"
            name="password"
            placeholder="Password"
            className="password-field"
          />
          {touched.password && errors.password && (
            // errors.name comes from Yup
            <p>{errors.password}</p>
          )}
        </label>
        <Button variant="dark" className="login-submit-btn" type="submit">Login</Button>
        <div>
          <h5>Create an account?</h5>
          <NavLink to="/register">Register</NavLink>
        </div>
      </Form>
    </Main>
  )
}

const FormikLogin = withFormik({
  mapPropsToValues(props) {
    return {
      username: props.username || "",
      password: props.password || ""
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required("Please include a username"),
    password: Yup.string().required("Please include a password")
  }),

  handleSubmit(values, { resetForm }) {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, 
        values,
        { withCredentials: true}
      )
      .then(res => {
        localStorage.setItem("token", res.data.jwt_token);
        localStorage.setItem("user_id", res.data.user_id);
        localStorage.setItem("username", res.data.username);
        window.location.replace('/lastlog')
      })
      .catch(err => {
        localStorage.removeItem("token");
        console.log("invalid login", err);
      });
    resetForm();
  }


})(Login);

export default FormikLogin;

