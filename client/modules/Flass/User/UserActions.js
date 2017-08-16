import fetch from 'axios';
import { call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';
import _ from 'lodash';
import agent from '../../agent';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_READY_USER = 'FETCH_READY_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

function* fetchUser() {
  yield put({ type: FETCH_READY_USER });

  try {
    const user = yield call(agent.User.me);
    yield put({
      type: FETCH_USER_SUCCESS,
      user
    });
  } catch (err) {
    yield put({
      type: FETCH_USER_ERROR,
      message: err.message
    });
  }
}

export default function* rootSaga() {
  yield takeLatest(FETCH_USER, fetchUser);
}