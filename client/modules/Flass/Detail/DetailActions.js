import { call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';
import agent from '../../agent';

import { FETCH_COMMENT } from './Comment/CommentActions';
import { FETCH_QUESTION } from './Question/QuestionActions';

export const FETCH_DETAIL = 'FETCH_DETAIL';
export const FETCH_READY_DETAIL = 'FETCH_READY_DETAIL';
export const FETCH_DETAIL_SUCCESS = 'FETCH_DETAIL_SUCCESS';
export const FETCH_DETAIL_ERROR = 'FETCH_DETAIL_ERROR';

export function* fetchDetailAll({ detailId }) {
  yield put({ type: FETCH_READY_DETAIL });

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
  } catch(err) {
    yield put({
      type: FETCH_DETAIL_ERROR,
      message: err.message
    });
  }
}

export default function* rootSaga() {
  yield takeLatest(FETCH_DETAIL, fetchDetailAll);
}
