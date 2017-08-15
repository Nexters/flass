import fetch from 'axios';
import { takeEvery } from 'redux-saga';
import { call, fork, take, select, put, cancel } from 'redux-saga/effects';
import agent from '../agent';

export const FETCH_MY_CHANNEL = 'FETCH_MY_CHANNEL';
export const FETCH_READY_MY_CHANNEL = 'FETCH_READY_MY_CHANNEL';
export const FETCH_MY_CHANNEL_SUCCESS = 'FETCH_MY_CHANNEL_SUCCESS';
export const FETCH_MY_CHANNEL_ERROR = 'FETCH_MY_CHANNEL_ERROR';

function* fetchMyChannelItems() {
  yield put({
    type: FETCH_READY_MY_CHANNEL,
  });
  try {
    const items = yield call(agent.Grid.all);
    yield put({
      type: FETCH_MY_CHANNEL_SUCCESS,
      items
    });
  } catch (err) {
    yield put({
      type: FETCH_MY_CHANNEL_ERROR,
      message: err.message
    });
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_MY_CHANNEL, fetchMyChannelItems);
}
