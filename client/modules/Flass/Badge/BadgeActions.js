import { call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';
import agent from '../../agent';

export const FETCH_BADGE_HISTORY = 'FETCH_BADGE_HISTORY';
export const FETCH_READY_BADGE_HISTORY = 'FETCH_READY_BADGE_HISTORY';
export const FETCH_BADGE_HISTORY_SUCCESS = 'FETCH_BADGE_HISTORY_SUCCESS';
export const FETCH_BADGE_HISTORY_ERROR = 'FETCH_BADGE_HISTORY_ERROR';
export const FETCH_NEW_NOTIFICATION = 'FETCH_NEW_NOTIFICATION';
export const POST_NOTIFICATION_CHECK = 'POST_NOTIFICATION_CHECK';

function* fetchBadgeHistory() {
  yield put({ type: FETCH_READY_BADGE_HISTORY });

  try {
    const badgeItems = yield call(agent.Badge.all);
    console.log(badgeItems);
    yield put({
      type: FETCH_BADGE_HISTORY_SUCCESS,
      badgeItems
    });
    if (badgeItems[0] != null) {
      yield put({
        type: FETCH_NEW_NOTIFICATION,
        newNotification: badgeItems[0].notification_type == 1
      });
    } else{
      yield put({
        type: FETCH_NEW_NOTIFICATION,
        newNotification: false
      });
    }
  } catch (err) {
    yield put({
      type: FETCH_BADGE_HISTORY_ERROR,
      message: err.message
    });
  }
}

function* postNotificationCheck() {
  try {
    yield call(agent.Badge.check);
    yield put({
      type: FETCH_NEW_NOTIFICATION,
      newNotification: false
    });
  } catch (err) {
    console.error(err.message);
  }
}

export const TOGGLE_BADGE_HISTORY = 'TOGGLE_BADGE_HISTORY';

export default function* rootSaga() {
  yield takeLatest(FETCH_BADGE_HISTORY, fetchBadgeHistory);
  yield takeLatest(POST_NOTIFICATION_CHECK, postNotificationCheck);
}
