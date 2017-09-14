import { call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';
import agent from '../../agent';
import {
  FETCH_DETAIL,
  FETCH_DETAIL_ERROR, FETCH_DETAIL_SUCCESS,
  FETCH_READY_DETAIL, UPDATE_STATE_AFTER_SOLVE_QUESTION
} from './actions';
import { FETCH_QUESTION, UPDATE_SOLVED_QUESTION } from './Question/actions';
import { FETCH_VIDEO, UPDATE_SEARCHABLE_SECS } from './Video/actions';

export function* fetchDetailAll({ detailId }) {
  yield put({ type: FETCH_READY_DETAIL });
  // yield call(delay, 2000);
  try {
    const detail = yield call(agent.Detail.byId, detailId);

    yield [put({
      type: FETCH_QUESTION,
      detailId
    }), put({
      type: FETCH_DETAIL_SUCCESS,
      detail
    }), put({
      type: FETCH_VIDEO,
      url: detail.url
    })];
  } catch (err) {
    yield put({
      type: FETCH_DETAIL_ERROR,
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
  yield takeLatest(FETCH_DETAIL, fetchDetailAll);
  yield takeLatest(UPDATE_STATE_AFTER_SOLVE_QUESTION, updateStateAfterSolveQuestion);
}
