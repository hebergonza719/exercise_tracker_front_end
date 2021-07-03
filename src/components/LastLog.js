import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import SearchForm from './SearchForm';
import Navbar from './Navbar';

import { connect } from "react-redux";
import { getData } from "../actions";

const BtnStyle = styled.button`
  background-color: #18181E;
  color: white;
  font-family: 'Karma', serif;
  height: 40px;
  border-color: #18181E;
  border-radius: 5px;
  margin: 1.5rem 0;
`

const H3Styled = styled.h3`
  margin-top: 1rem;
  margin-bottom: 0;
`

function LastLog({ logs, getData }) {
  useEffect(() => {
    getData();
  }, [getData])

  if (logs.logs.length === 0) {
    return (
      <div>
        <Navbar />
        <H3Styled>You have no previous logs</H3Styled>
        <Link to="/new-log">
          <BtnStyle>Create a new log</BtnStyle>
        </Link>
        <Link to="/new-log" className="material-icons floating-btn">add</Link>
      </div>
    );
  }
  else {
    return (
      <div>
        <Navbar />
        <SearchForm exerciseList={logs.logs} />
        
        <Link to="/new-log">
          <BtnStyle>Create a new log</BtnStyle>
        </Link>
        <Link to="/new-log" className="material-icons floating-btn">add</Link>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    logs: state.logs
  };
};

export default connect (
  mapStateToProps,
  { getData }
)(LastLog);