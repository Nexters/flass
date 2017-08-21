import { delay } from 'redux-saga';
import { call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';
import agent from '../../agent';

import { FETCH_COMMENT } from './Comment/CommentActions';
import {
  FETCH_QUESTION,
  UPDATE_SOLVED_QUESTION
} from './Question/QuestionActions';
import {
  FETCH_VIDEO,
  UPDATE_SEARCHABLE_SECS
} from './Video/VideoActions';

export const FETCH_DETAIL = 'FETCH_DETAIL';
export const FETCH_READY_DETAIL = 'FETCH_READY_DETAIL';
export const FETCH_DETAIL_SUCCESS = 'FETCH_DETAIL_SUCCESS';
export const FETCH_DETAIL_ERROR = 'FETCH_DETAIL_ERROR';

export function* fetchDetailAll({ detailId }) {
  yield put({ type: FETCH_READY_DETAIL });
  yield call(delay, 2000);
  try {
    const detail = yield call(agent.Detail.byId, detailId);
    yield put({
      type: FETCH_QUESTION,
      detailId
    });
    yield put({
      type: FETCH_DETAIL_SUCCESS,
      detail
    });
    yield put({
      type: FETCH_VIDEO
    });
  } catch (err) {
    yield put({
      type: FETCH_DETAIL_ERROR,
      message: err.message
    });
  }
}

export const UPDATE_STATE_AFTER_SOLVE_QUESTION = 'UPDATE_STATE_AFTER_SOLVE_QUESTION';

export function* updateStateAfterSolveQuestion({ newState }) {
  const {
    indexOfQuestion,
    isCorrect,
    indexOfSelectedChoice,
    indexOfAnswer,
    searchableSecs
  } = newState;

  yield put({
    type: UPDATE_SOLVED_QUESTION,
    payload: { indexOfQuestion, isCorrect, indexOfSelectedChoice, indexOfAnswer }
  });
  yield put({
    type: UPDATE_SEARCHABLE_SECS,
    searchableSecs
  });
}

export default function* rootSaga() {
  yield takeLatest(FETCH_DETAIL, fetchDetailAll);
  yield takeLatest(UPDATE_STATE_AFTER_SOLVE_QUESTION, updateStateAfterSolveQuestion);
}
