import fetch from 'axios';
import { takeEvery } from 'redux-saga';
import { call, fork, take, select, put, cancel } from 'redux-saga/effects';

export const FETCH_MY_CHANNEL = 'FETCH_MY_CHANNEL';
export const FETCH_READY_MY_CHANNEL = 'FETCH_READY_MY_CHANNEL';
export const FETCH_MY_CHANNEL_SUCCESS = 'FETCH_MY_CHANNEL_SUCCESS';
export const FETCH_MY_CHANNEL_ERROR = 'FETCH_MY_CHANNEL_ERROR';

function* fetchRequestMyChannelItems({ payload }) {
  yield put({
    type: FETCH_READY_MY_CHANNEL,
  });
  try {
    const response = yield call(fetch, '/json/FlassGrid.json');
    yield put({
      type: FETCH_MY_CHANNEL_SUCCESS,
      items: response.data
    });
  } catch (err) {
    yield put({
      type: FETCH_MY_CHANNEL_ERROR,
      message: err.message
    });
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_MY_CHANNEL, fetchRequestMyChannelItems);
}
