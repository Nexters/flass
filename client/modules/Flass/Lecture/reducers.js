import { combineReducers } from 'redux';
import {
  FETCH_READY_LECTURE,
  FETCH_LECTURE_SUCCESS,
  FETCH_LECTURE_ERROR,
  UNMOUNT_LECTURE
} from './actions';
import question from './Question/reducers';
import comment from './Comment/reducers';
import video from './Video/reducers';
import analysis from './Analysis/reducers';
import { createReducer } from '../../reducerHelper';

const initialState = {
  isLoading: false,
  lecture: {
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
  isError: false,
  isFetched: false
};

const fetchLectureReducer = {
  [FETCH_READY_LECTURE]: (state, action) => ({
    ...state,
    isLoading: true,
    isError: false,
    isFetched: false
  }),
  [FETCH_LECTURE_SUCCESS]: (state, action) => {
    const { lecture } = action;
    return {
      isLoading: false,
      lecture: {
        id: lecture.id,
        userId: lecture['user_id'],
        title: lecture.title,
        subject: lecture.subject,
        content: lecture.content,
        textbookRange: lecture['textbook_range'],
        url: lecture.url,
        thumbnailUrl: lecture['thumbnail_url'],
        duration: lecture.duration,
        createdAt: lecture['created_at'],
        updatedAt: lecture['updated_at']
      },
      isError: false,
      isFetched: true
    };
  },
  [FETCH_LECTURE_ERROR]: (state, action) => ({
    ...state,
    isLoading: false,
    isError: true,
    isFetched: false
  }),
  [UNMOUNT_LECTURE]: state => ({
    ...state,
    isFetched: false
  })
};

const LectureReducer = createReducer(initialState, {
  ...fetchLectureReducer
});

export default combineReducers({
  lecture: LectureReducer,
  question,
  comment,
  video,
  analysis
});
