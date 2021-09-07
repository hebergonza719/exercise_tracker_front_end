import React from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import logo from '../images/Track-It-Logo.png';
import { useHistory } from 'react-router-dom';


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

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`

function Register({ values, errors, touched, status }) {
  let history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    history.push("/lastlog-guest");
  };

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
        <BtnContainer>
          <Button variant="dark" className="login-submit-btn" type="submit">Register</Button>
          <Button variant="dark" onClick={handleClick} className="login-submit-btn">Guest</Button>
        </BtnContainer>
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
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, 
      values,
      { withCredentials: true }
      )
      .then(res => {
        // console.log(res);
        alert("New User Created")
        res.status(200).json({ "message": "Register successful" });
      })
      .catch(err => console.log(err.response));
    resetForm();
  }


})(Register);

export default FormikRegister;

