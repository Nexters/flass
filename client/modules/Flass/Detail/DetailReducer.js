import {
  FETCH_READY_DETAIL,
  FETCH_DETAIL_SUCCESS,
  FETCH_DETAIL_ERROR
} from './DetailActions';

const initialState = {
  isLoading: false,
  detail: {
    id: -1,
    user_id: -1,
    title: '',
    subject: '',
    content: '',
    textbook_range: '',
    duration: -1,
    thumbnail_url: '',
    created_at: '',
    updated_at: '',
    url: ''
  }
}
;

const DetailReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_READY_DETAIL:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_DETAIL_SUCCESS:
      return {
        isLoading: false,
        detail: { ...action.detail }
      };
    case FETCH_DETAIL_ERROR:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default DetailReducer;
