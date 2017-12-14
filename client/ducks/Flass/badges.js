import { call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';
import agent from '../agent';
import {createReducer} from '../reducerHelper';

export const FETCH_BADGE_HISTORY = 'FETCH_BADGE_HISTORY';
export const FETCH_READY_BADGE_HISTORY = 'FETCH_READY_BADGE_HISTORY';
export const FETCH_BADGE_HISTORY_SUCCESS = 'FETCH_BADGE_HISTORY_SUCCESS';
export const FETCH_BADGE_HISTORY_ERROR = 'FETCH_BADGE_HISTORY_ERROR';
export const TOGGLE_BADGE_HISTORY = 'TOGGLE_BADGE_HISTORY';

const initialState = {
  badgeType: 'comment',
  badgeItems: [],
  toggleBadge: false,
};

const badgeReducer = {
  [FETCH_READY_BADGE_HISTORY]: (state, action) => ({
    ...state,
    badgeItems: [],
  }),
  [FETCH_BADGE_HISTORY_SUCCESS]: (state, action) => ({
    ...state,
    badgeType: action.badgeType || state.badgeType,
    badgeItems: action.badgeItems,
  }),
  [FETCH_BADGE_HISTORY_ERROR]: (state, action) => ({
    ...state,
    badgeItems: [],
  }),
  [TOGGLE_BADGE_HISTORY]: (state, action) => ({
    ...state,
    toggleBadge: !state.toggleBadge,
  }),
};

export default createReducer(initialState, {
  ...badgeReducer,
});

export function* fetchBadgeHistory({ badgeType }) {
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

export function* rootSaga() {
  yield takeLatest(FETCH_BADGE_HISTORY, fetchBadgeHistory);
}
