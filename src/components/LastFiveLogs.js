import React, { useEffect } from "react";
import styled from "styled-components";
import LogCard from "./LogCard";

import { connect } from "react-redux";
import { getLastFive } from "../actions";

const TitleStyled = styled.h3`
  background-color: #18181E;
  color: #DEC79B;
  height: 2.5rem;
  line-height: normal;
  border-radius: 5px;
`

function LastFiveLogs({ getLastFive, lastFive, logs }) {
  useEffect(() => {
    getLastFive();
  }, [getLastFive, logs])

  return (
    <div>
      <TitleStyled>Your last five logs</TitleStyled>
      {lastFive.logs.slice(-5).map((exercise) =>
        <LogCard key={exercise._id} exercise = {exercise} /> 
      )}
    </div>
  )
};

const mapStateToProps = state => {
  return {
    logs: state.logs,
    lastFive: state.lastFive
  };
};

export default connect (
  mapStateToProps,
  { getLastFive }
)(LastFiveLogs);