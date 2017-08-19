import { call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';
import agent from '../../agent';

export const FETCH_BADGE_HISTORY = 'FETCH_BADGE_HISTORY';
export const FETCH_READY_BADGE_HISTORY = 'FETCH_READY_BADGE_HISTORY';
export const FETCH_BADGE_HISTORY_SUCCESS = 'FETCH_BADGE_HISTORY_SUCCESS';
export const FETCH_BADGE_HISTORY_ERROR = 'FETCH_BADGE_HISTORY_ERROR';

function* fetchBadgeHistory({ badgeType }) {
  yield put({ type: FETCH_READY_BADGE_HISTORY });

  try {
    const badgeItems = yield call(agent.Badge.byType, badgeType);
    yield put({
      type: FETCH_BADGE_HISTORY_SUCCESS,
      badgeItems,
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
