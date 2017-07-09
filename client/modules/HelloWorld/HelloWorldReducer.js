import {
  SERVER_TIMESTAMP_UPDATE,
} from './HelloWorldActions';

const initialState = {serverTimestamp: null};

const HelloWorldReducer = (state = initialState, action) => {
  switch (action.type) {
    case SERVER_TIMESTAMP_UPDATE:
      return {
        serverTimestamp: action.serverTimestamp
      };
    default:
      return state;
  }
};

export default HelloWorldReducer;
