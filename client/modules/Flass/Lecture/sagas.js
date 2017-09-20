import { call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';
import agent from '../../agent';
import {
  FETCH_LECTURE,
  FETCH_LECTURE_ERROR, FETCH_LECTURE_SUCCESS,
  FETCH_READY_LECTURE, UPDATE_STATE_AFTER_SOLVE_QUESTION
} from './actions';
import { FETCH_QUESTION, UPDATE_SOLVED_QUESTION } from './Question/actions';
import { FETCH_VIDEO, UPDATE_SEARCHABLE_SECS } from './Video/actions';

export function* fetchLectureAll({ lectureId }) {
  yield put({ type: FETCH_READY_LECTURE });
  // yield call(delay, 2000);
  try {
    const lecture = yield call(agent.Lecture.byId, lectureId);

    yield [put({
      type: FETCH_QUESTION,
      lectureId
    }), put({
      type: FETCH_LECTURE_SUCCESS,
      lecture
    }), put({
      type: FETCH_VIDEO,
      url: lecture && lecture.url
    })];
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

export default function* rootSaga() {
  yield takeLatest(FETCH_LECTURE, fetchLectureAll);
  yield takeLatest(UPDATE_STATE_AFTER_SOLVE_QUESTION, updateStateAfterSolveQuestion);
}
