import { FETCH_LAST_FIVE } from '../actions';

const initialState = {
  logs: []
};

export const lastFiveReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_LAST_FIVE: {
      return {
        ...state,
        logs: action.payload
      };
    }
    default:
      return state;
  };
};