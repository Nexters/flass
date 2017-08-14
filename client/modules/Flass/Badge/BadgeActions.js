import fetch from 'axios';
import { call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';

export const FETCH_BADGE_HISTORY = 'FETCH_BADGE_HISTORY';
export const FETCH_READY_BADGE_HISTORY = 'FETCH_READY_BADGE_HISTORY';
export const FETCH_BADGE_HISTORY_SUCCESS = 'FETCH_BADGE_HISTORY_SUCCESS';
export const FETCH_BADGE_HISTORY_ERROR = 'FETCH_BADGE_HISTORY_ERROR';

function* fetchBadgeHistory({ userId, badgeType }) {
  yield put({ type: FETCH_READY_BADGE_HISTORY });

  try {
    const response = yield call(fetch, '/json/FlassBadgeHistory.json');
    yield put({
      type: FETCH_BADGE_HISTORY_SUCCESS,
      badgeItems: response.data,
      badgeType,
    });
  } catch (err) {
    yield put({
      type: FETCH_BADGE_HISTORY_ERROR,
      message: err.message
    });
  }
}

export const TOGGLE_BADGE_HISTORY = 'TOGGLE_BADGE_HISTORY';

export default function* rootSaga() {
  yield takeLatest(FETCH_BADGE_HISTORY, fetchBadgeHistory);
}
