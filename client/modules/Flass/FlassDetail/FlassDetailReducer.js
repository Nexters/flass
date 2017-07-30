import { FETCH_DETAIL, FETCH_DETAIL_SUCCESS, FETCH_DETAIL_ERROR } from './FlassDetailActions';

const initialState = {
  isLoading: false,
};

const FlassDetailReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_DETAIL:
      return {
        isLoading: true,
      }
    case FETCH_DETAIL_SUCCESS:
      return {
        isLoading: false,
        ...action.detail
      };
    case FETCH_DETAIL_ERROR:
    default:
      return {
        ...state,
        isLoading: false,
      };
  }
};

export default FlassDetailReducer;
