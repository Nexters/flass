import { call, fork, take, select, put, cancel, takeLatest, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';
import { createReducer } from '../reducerHelper';
import agent from '../agent';
import {
  getItemFromLocalStorage
} from '../sagasHelper';
import { action } from '../actionHelper';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_READY_USER = 'FETCH_READY_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

export const SET_USER = 'SET_USER';

export const actions = {
  fetchUser: () => action(FETCH_USER),
};

const initialState = {
  id: -1,
  email: '',
  userName: ''
};

const setUserReducer = {
  [SET_USER]: (state, { user }) => {
    const { id, email, username } = user;

    return {
      ...state,
      id,
      email,
      userName: username
    };
  }
};

const fetchUserReducer = {
  [FETCH_READY_USER]: (state, action) => state,
  [FETCH_USER_SUCCESS]: (state, { user: { id, email, username } }) => ({
    id,
    email,
    userName: username
  }),
  [FETCH_USER_ERROR]: (state, { user: { id, email, username } }) => ({
    id,
    email,
    userName: username
  })
};

const UserReducer = createReducer(initialState, {
  ...setUserReducer,
  ...fetchUserReducer
});

export default UserReducer;

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

export function* rootSaga() {
  yield takeLatest(FETCH_USER, fetchUser);
}
