import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import LogCard from "./LogCard";
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';
import LastFiveLogs from './LastFiveLogs';
import DisplaySearch from "./DisplaySearch";

const BtnStyle = styled.button`
  background-color: #18181E;
  color: white;
  font-family: 'Karma', serif;
  height: 28px;
  border-color: #18181E;
  border-radius: 5px;
  margin: 10px;
`

const ParaError = styled.p`
  font-size: 13px;
  margin: 10px 0 -8px 8px;
  color: red;
`

const ErrorPMessage = styled.p`
  margin-top: 0;
  color: darkred;
`

const SearchForm = ({ exerciseList, values, errors, touched, status }) => {

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (status) {
      const results = exerciseList.filter(exercise => {
        return exercise.date === status.date;
      });

      setSearchResults(results);
    }
  }, [status, exerciseList]);

  const returnResults = () => {
    if (touched.date && searchResults.length === 0) {
      return (
        <div>
          <ErrorPMessage>You don't have logs for that date</ErrorPMessage>
          <LastFiveLogs />
        </div>
      );
    }

    else if (searchResults.length === 0) {
      return (
        <div>
          <LastFiveLogs/>
        </div>
      )
    }

    else if (searchResults.length > 0) {
      return (
        <div>
          <DisplaySearch searchResults={searchResults}/>
        </div>
      )
    }
  }

  return (
    <section className="search-form">
      {/* <form> */}
      <Form className="search-form-date">
        {touched.date && errors.date && (
          // errors.name comes from Yup
          <ParaError>{errors.date}</ParaError>
        )}

        <label htmlFor="date" className="date-label">Search for date:
          {/* <InputField */}
          <Field className="search-field"
            id="date"
            type="date"
            name="date"
            // onChange={handleChange}
          />
        </label>

        <BtnStyle type="submit">Search</BtnStyle>
        
      {/* </form> */}
      </Form>
      {returnResults()}
    </section>
  );
}

const FormikSearchForm  = withFormik({
  mapPropsToValues(props) {
    return {
      date: props.date || "",
    };
  },

  validationSchema: Yup.object().shape({
    date: Yup.string().required("Select a date")
  }),

  handleSubmit(values, { setStatus }) {
    setStatus(values);
  }

})(SearchForm);

export default FormikSearchForm;