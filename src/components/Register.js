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

function Register({ values, errors, touched, status }) {

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
            type="text"
            name="password"
            placeholder="Password"
            className="password-field"
          />
          {touched.password && errors.password && (
            // errors.name comes from Yup
            <p>{errors.password}</p>
          )}
        </label>
        <Button variant="dark" className="login-submit-btn" type="submit">Register</Button>
        <div>
          <h5>Already registered?</h5>
          <NavLink to="/">Sign-in</NavLink>
        </div>
      </Form>

    </Main>
  )
}

const FormikRegister = withFormik({
  mapPropsToValues(props) {
    return {
      username: props.username || "",
      password: props.password || ""
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required("Please include a username"),
    password: Yup.string().required("Please include a password").min(8)
  }),

  handleSubmit(values, {resetForm}) {
    axios
      .post("http://localhost:4000/api/auth/register", 
      values,
      { withCredentials: true }
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err.response));
    resetForm();
  }


})(Register);

export default FormikRegister;

