import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';

export const FETCH_DATA = "FETCH_DATA";

export const FETCH_LAST_FIVE = "FETCH_LAST_FIVE";

export const DELETE_LOG = "DELETE_LOG";

export const getData = () => dispatch => {
  if (localStorage.getItem('token')) {
  axiosWithAuth()
    .get(`${process.env.REACT_APP_BACKEND_URL}/logs/${localStorage.getItem('user_id')}`)
    .then(res => {
      dispatch({ type: FETCH_DATA, payload: res.data })
    })
    .catch(err => {
      console.error("error fetching data from api. err: ", err);
    });
  } else {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/guest`)
      .then(res => {
        dispatch({ type: FETCH_DATA, payload: res.data })
      })
      .catch(err => {
        console.error("error fetching data from api. err: ", err);
      });
  }
};

export const getLastFive = () => dispatch => {
  if (localStorage.getItem('token')) {
    axiosWithAuth()
      .get(`${process.env.REACT_APP_BACKEND_URL}/logs/${localStorage.getItem('user_id')}/last-five`)
      .then(res => {
        dispatch({ type: FETCH_LAST_FIVE, payload: res.data })
      })
      .catch(err => {
        console.error("error fetching data from api. err: ", err);
      });
  } else {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/guest/last-five`)
      .then(res => {
        dispatch({ type: FETCH_LAST_FIVE, payload: res.data })
      })
      .catch(err => {
        console.error("error fetching data from api. err: ", err);
      });
  }
};

export const deleteLog = (id) => dispatch => {
  if (localStorage.getItem('token')) {
    axiosWithAuth()
      .delete(`${process.env.REACT_APP_BACKEND_URL}/logs/${id}`)
      .then(res => {
      })
      .catch(err => {
        console.log(err);
      })
    axiosWithAuth()
      .get(`${process.env.REACT_APP_BACKEND_URL}/logs/${localStorage.getItem('user_id')}`)
      .then(res => {
        dispatch({ type: DELETE_LOG, payload: res.data })
      })
      .catch(err => {
        console.error("error fetching data from api. err: ", err);
      });
  } else {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/guest/${id}`)
      .then(res => {
      })
      .catch(err => {
        console.log(err);
      })
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/guest`)
      .then(res => {
        dispatch({ type: DELETE_LOG, payload: res.data })
      })
      .catch(err => {
        console.error("error fetching data from api. err: ", err);
      });
  }
};