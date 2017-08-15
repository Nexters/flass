import { FETCH_READY_MY_CHANNEL, FETCH_MY_CHANNEL_SUCCESS, FETCH_MY_CHANNEL_ERROR } from './GridActions';

const initialState = {
  items: []
};

const GridReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_MY_CHANNEL_SUCCESS:
      return {
        items: [...state.items, ...action.items]
      };
    case FETCH_READY_MY_CHANNEL:
    case FETCH_MY_CHANNEL_ERROR:
      return initialState;
    default:
      return state;
  }
};

export default GridReducer;
