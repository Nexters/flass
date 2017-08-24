import { call, put, takeLatest } from 'redux-saga/effects';
import Google from '../Google';
import agent from '../agent';
import {
  setItemToLocalStorage,
  getItemFromLocalStorage
} from '../sagasHelper';
import {
  INIT_GOOGLE_SERVICE,
  LOGIN_GOOGLE_SERVICE,
  SUCCESS_LOGIN_GOOGLE_SERVICE,
  FAIL_LOGIN_GOOGLE_SERVICE,
  LOGOUT_GOOGLE_SERVICE,
  SUCCESS_LOGOUT_GOOGLE_SERVICE,
  FAIL_LOGOUT_GOOGLE_SERVICE,
  USER_IS_SIGNEDIN,
  USER_ISNOT_SIGNEDIN,
  CHECK_SESSION,
  CHECK_SESSION_SUCCESS,
  CHECK_SESSION_FAIL,
  LOGOUT_FLASS_SERVICE,
  SUCCESS_LOGOUT_FLASS_SERVICE,
  FAIL_LOGOUT_FLASS_SERVICE
} from './actions';

import {
  SET_USER
} from '../Flass/User/UserActions';

function* initGoogleService() {
  yield call(Google.initGoogleAuthService);
}

function* loginGoogleService() {
  try {
    const authResponse = yield call(Google.authorizeForSignIn);
    const isGoogleAuthValid = yield call(isAuthResponseValid, authResponse);

    if (isGoogleAuthValid) {
      const meResponse = yield call(agent.User.me, authResponse.id_token);
      yield call(setItemToLocalStorage, 'flass_user_id', meResponse.id.toString());
      yield put({
        type: SET_USER,
        user: meResponse
      });
      yield put({
        type: SUCCESS_LOGIN_GOOGLE_SERVICE,
        payload: authResponse
      });
    }
  } catch (error) {
    yield put({
      type: FAIL_LOGIN_GOOGLE_SERVICE,
      error
    });
  }
}

function isAuthResponseValid(authResponse) {
  return Object.prototype.hasOwnProperty.call(authResponse, 'id_token')
    && authResponse.id_token !== '';
}

function* logoutGoogleService() {
  yield call(Google.signOutUser);
  const isUserSignedIn = yield call(Google.isUserSignedIn);
  if (!isUserSignedIn) {
    yield put({
      type: SUCCESS_LOGOUT_GOOGLE_SERVICE
    });
  }
}

function* checkSession() {
  try {
    const { id } = yield call(agent.User.whoami);
    const flassUserId = yield call(getItemFromLocalStorage, 'flass_user_id');

    if (id !== flassUserId) {
      throw new Error('Invalid session');
    }
    yield put({ type: CHECK_SESSION_SUCCESS });
  } catch (e) {
    yield put({ type: CHECK_SESSION_FAIL });
  }
}

function* logoutFlassService() {
  const response = yield call(agent.User.out);
  yield call(setItemToLocalStorage, 'flass_user_id', '');
  try {
    yield put({ type: SUCCESS_LOGOUT_FLASS_SERVICE });
  } catch (e) {
    yield put({ type: FAIL_LOGOUT_FLASS_SERVICE });
  }
}

export default function* rootSaga() {
  yield takeLatest(INIT_GOOGLE_SERVICE, initGoogleService);
  yield takeLatest(LOGIN_GOOGLE_SERVICE, loginGoogleService);
  yield takeLatest(LOGOUT_GOOGLE_SERVICE, logoutGoogleService);
  yield takeLatest(CHECK_SESSION, checkSession);
  yield takeLatest(LOGOUT_FLASS_SERVICE, logoutFlassService);
}
