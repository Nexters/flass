import fetch from 'axios';
import { call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';
import { FETCH_COMMENT } from './Comment/CommentActions';
import { FETCH_QUESTION } from './Question/QuestionActions';

export const FETCH_DETAIL = 'FETCH_DETAIL';
export const FETCH_READY_DETAIL = 'FETCH_READY_DETAIL';
export const FETCH_DETAIL_SUCCESS = 'FETCH_DETAIL_SUCCESS';
export const FETCH_DETAIL_ERROR = 'FETCH_DETAIL_ERROR';

function* fetchRequestDetailAll({ detailId }) {
  yield put({ type: FETCH_READY_DETAIL });

  try {
    const response = yield call(fetch, '/json/FlassDetail.json');
    yield put({
      type: FETCH_QUESTION,
      detailId
    });
    yield put({
      type: FETCH_COMMENT,
      detailId
    });
    yield put({
      type: FETCH_DETAIL_SUCCESS,
      detail: response.data
    });
  } catch(err) {
    yield put({
      type: FETCH_DETAIL_ERROR,
      message: err.message
    });
  }
}

export default function* rootSaga() {
  yield takeLatest(FETCH_DETAIL, fetchRequestDetailAll);
}
