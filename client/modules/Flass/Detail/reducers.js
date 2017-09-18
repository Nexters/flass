import { combineReducers } from 'redux';
import {
  FETCH_READY_DETAIL,
  FETCH_DETAIL_SUCCESS,
  FETCH_DETAIL_ERROR
} from './actions';
import question from './Question/reducers';
import comment from './Comment/reducers';
import video from './Video/reducers';
import analysis from './Analysis/reducers';
import { createReducer } from '../../reducerHelper';

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
  },
  isError: false
};

const fetchDetailReducer = {
  [FETCH_READY_DETAIL]: (state, action) => ({
    ...state,
    isLoading: true,
    isError: false
  }),
  [FETCH_DETAIL_SUCCESS]: (state, action) => {
    const { detail } = action;
    return {
      isLoading: false,
      detail: {
        id: detail.id,
        userId: detail['user_id'],
        title: detail.title,
        subject: detail.subject,
        content: detail.content,
        textbookRange: detail['textbook_range'],
        url: detail.url,
        thumbnailUrl: detail['thumbnail_url'],
        duration: detail.duration,
        createdAt: detail['created_at'],
        updatedAt: detail['updated_at']
      },
      isError: false
    };
  },
  [FETCH_DETAIL_ERROR]: (state, action) => ({
    ...state,
    isLoading: false,
    isError: true
  })
};

const DetailReducer = createReducer(initialState, {
  ...fetchDetailReducer
});

export default combineReducers({
  detail: DetailReducer,
  question,
  comment,
  video,
  analysis
});
