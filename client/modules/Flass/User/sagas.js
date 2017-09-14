import fetch from 'axios';
import { call, fork, take, select, put, cancel, takeLatest, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';
import agent from '../../agent';

import {
  getItemFromLocalStorage
} from '../../sagasHelper';
import {
  FETCH_READY_USER, FETCH_USER, FETCH_USER_ERROR,
  FETCH_USER_SUCCESS,
} from './actions';

function* fetchUser() {
  yield put({ type: FETCH_READY_USER });
  try {
    const token = yield call(getItemFromLocalStorage, 'flass_user_id');
    if (!token) {
      throw new Error('Flass id token not exist');
    }

    const user = yield call(agent.User.me, token);

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
