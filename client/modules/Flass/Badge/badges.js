import { call, fork, take, select, put, cancel, takeLatest } from 'redux-saga/effects';
import agent from '../../agent';

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

const BadgeReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_BADGE_HISTORY_SUCCESS:
      return {
        ...state,
        badgeType: action.badgeType || state.badgeType,
        badgeItems: action.badgeItems,
      };
    case FETCH_BADGE_HISTORY_ERROR:
    case FETCH_READY_BADGE_HISTORY:
      return {
        ...state,
        badgeItems: [],
      };
    case TOGGLE_BADGE_HISTORY:
      return {
        ...state,
        toggleBadge: !state.toggleBadge,
      };
    default:
      return state;
  }
};

export default BadgeReducer;


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
