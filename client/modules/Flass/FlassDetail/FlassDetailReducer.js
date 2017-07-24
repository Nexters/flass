import { FETCH_DETAIL, FETCH_DETAIL_SUCCESS, FETCH_DETAIL_ERROR } from './FlassDetailActions';

const initialState = {
};

const FlassDetailReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_DETAIL:
      // TODO open loading bar
      return state;
    case FETCH_DETAIL_SUCCESS:
      return {
        ...state,
        ...action.detail
      };
    case FETCH_DETAIL_ERROR:
    // TODO close loading bar
    default:
      return state;
  }
};

export default FlassDetailReducer;
