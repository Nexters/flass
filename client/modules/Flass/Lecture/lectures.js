import { call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import question, { FETCH_QUESTION, UPDATE_SOLVED_QUESTION } from './Question/questions';
import comment from './Comment/comments';
import video, { FETCH_VIDEO, UPDATE_SEARCHABLE_SECS } from './Video/videos';
import analysis from './Analysis/analysises';
import { createReducer } from '../../reducerHelper';
import agent from '../../agent';

export const FETCH_LECTURE = 'FETCH_LECTURE';
export const FETCH_READY_LECTURE = 'FETCH_READY_LECTURE';
export const FETCH_LECTURE_SUCCESS = 'FETCH_LECTURE_SUCCESS';
export const FETCH_LECTURE_ERROR = 'FETCH_LECTURE_ERROR';

export const UNMOUNT_LECTURE = 'UNMOUNT_LECTURE';
export const unmountLecture = () => ({
  type: UNMOUNT_LECTURE
});

export const UPDATE_STATE_AFTER_SOLVE_QUESTION = 'UPDATE_STATE_AFTER_SOLVE_QUESTION';

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
    thumbnailUrl: '',
    shortenUrl: '',
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
        shortenUrl: lecture['shorten_url'],
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

export function* fetchLectureAll({ lectureId }) {
  yield put({ type: FETCH_READY_LECTURE });

  try {
    const lecture = yield call(agent.Lecture.byId, lectureId);

    yield [
      put({ type: FETCH_QUESTION, lectureId }),
      put({ type: FETCH_VIDEO, url: lecture && lecture.url }),
    ];
    yield put({ type: FETCH_LECTURE_SUCCESS,  lecture });
  } catch (err) {
    yield put({
      type: FETCH_LECTURE_ERROR,
      message: err.message
    });
  }
}

export function* updateStateAfterSolveQuestion({ newState }) {
  const {
    id,
    indexOfQuestion,
    isCorrect,
    indexOfSelectedChoice,
    indexOfAnswer,
    searchableSecs
  } = newState;

  yield [put({
    type: UPDATE_SOLVED_QUESTION,
    payload: { id, indexOfQuestion, isCorrect, indexOfSelectedChoice, indexOfAnswer }
  }), put({
    type: UPDATE_SEARCHABLE_SECS,
    searchableSecs
  })];
}

export function* rootSaga() {
  yield takeLatest(FETCH_LECTURE, fetchLectureAll);
  yield takeLatest(UPDATE_STATE_AFTER_SOLVE_QUESTION, updateStateAfterSolveQuestion);
}
