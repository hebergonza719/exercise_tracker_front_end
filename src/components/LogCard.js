import React from "react";
import styled from 'styled-components';
import exerciselog from '../images/exerciselog.jpg';

// material-ui
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

// redux
import { connect } from "react-redux";
import { deleteLog } from "../actions";

const NotesContainer = styled.div`
  border: solid 1px #c4c4c4;
  margin-bottom: 1%;
  padding: 8px;
`
const H3Styled = styled.h3`
  margin-top: 0;
`
const BtnStyleSum = styled.button`
  background-color: #18181E;
  color: white;
  font-family: 'Karma', serif;
  height: 40px;
  border-color: #18181E;
  border-radius: 5px;
`

function LogCard ({ exercise, deleteLog }) {
  const handleClick = (e) => {
    e.preventDefault();
    deleteLog(exercise._id);
  }

  return (
    <Accordion className="accordion-container">
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div className="accordion-sum-div">
          <h3 className="h3-date-sum">Date: {exercise.date}</h3>
          {/* <H3Styled>Exercise Type: {exercise.exercise}</H3Styled> */}
          <BtnStyleSum onClick={handleClick} >Delete</BtnStyleSum>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="card-accord-details">
          <div className="img-container">
            <img className="card-img" src={exerciselog} alt="exercise equipment"/>
          </div>
          <H3Styled>Exercise Type: {exercise.exercise}</H3Styled>
          <H3Styled>Target Muscle: {exercise.muscle}</H3Styled>
          <H3Styled>Number of Sets: {exercise.sets}</H3Styled>
          <H3Styled>Number of Reps: {exercise.reps}</H3Styled>
          <H3Styled>Weight Lifted: {exercise.weight} lb</H3Styled>
          <NotesContainer>
            <h3 className="h3-notes">Notes:</h3>
            <p className="p-notes">{exercise.notes}</p>
          </NotesContainer>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

const mapStateToProps = state => {
  return {
    logs: state.logs
  };
};

export default connect (
  mapStateToProps,
  { deleteLog }
)(LogCard);