import { FETCH_READY_DETAIL, FETCH_DETAIL_SUCCESS, FETCH_DETAIL_ERROR } from './FlassDetailActions';

const initialState = {
  isLoading: false,
  detail: {
    id: -1,
    userId: '',
    userName: '',
    title: '',
    content: '',
    url: '',
    replayAt: '',
    createdAt: ''
  }
};

const FlassDetailReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_READY_DETAIL:
      return initialState;
    case FETCH_DETAIL_SUCCESS:
      return {
        isLoading: false,
        detail: { ...action.detail }
      };
    case FETCH_DETAIL_ERROR:
    default:
      return {
        ...state,
        isLoading: false
      };
  }
};

export default FlassDetailReducer;
