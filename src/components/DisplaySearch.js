import React, { useEffect } from "react";
import LogCard from "./LogCard";
import { connect } from "react-redux";

const DisplaySearch = ({ searchResults, logs }) => {
  useEffect(() => {
  }, [logs])

  return (
    searchResults.map(exercise => (
      <LogCard key={exercise._id} exercise={exercise} />
    ))
  )
}

const mapStateToProps = state => {
  return {
    logs: state.logs,
  };
};

export default connect (
  mapStateToProps,
)(DisplaySearch);