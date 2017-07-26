import { FETCH_MY_CHANNEL, FETCH_MY_CHANNEL_SUCCESS, FETCH_MY_CHANNEL_ERROR } from './FlassGridActions';

const initialState = {
  items: []
};

const FlassGridReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_MY_CHANNEL:
      // TODO open loading bar
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
