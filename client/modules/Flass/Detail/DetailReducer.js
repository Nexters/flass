import { FETCH_READY_DETAIL, FETCH_DETAIL_SUCCESS, FETCH_DETAIL_ERROR } from './DetailActions';

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

const DetailReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_READY_DETAIL:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_DETAIL_SUCCESS:
      return {
        isLoading: false,
        detail: { ...action.detail }
      };
    case FETCH_DETAIL_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state;
  }
};

export default DetailReducer;
