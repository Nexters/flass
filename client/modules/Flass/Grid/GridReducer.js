import { FETCH_READY_MY_CHANNEL, FETCH_MY_CHANNEL_SUCCESS, FETCH_MY_CHANNEL_ERROR } from './GridActions';

const initialState = {
  items: []
};

const FlassGridReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_READY_MY_CHANNEL:
      // TODO open loading bar
      console.log('FETCH_READY_MY_CHANNEL');
      return state;
    case FETCH_MY_CHANNEL_SUCCESS:
      return {
        items: [...state.items, ...action.items]
      };
    case FETCH_MY_CHANNEL_ERROR:
      // TODO close loading bar
    default:
      return state;
  }
};

export default FlassGridReducer;
