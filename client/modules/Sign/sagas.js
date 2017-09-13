import { call, put, takeLatest } from 'redux-saga/effects';
import Google from '../Google';
import agent from '../agent';
import {
  setItemToLocalStorage,
  getItemFromLocalStorage
} from '../sagasHelper';
import {
  INIT_GOOGLE_SERVICE,

  CHECK_SESSION,
  CHECK_SESSION_START,
  CHECK_SESSION_FIN,
  CHECK_SESSION_SUCCESS,
  CHECK_SESSION_FAIL,

  SUCCESS_LOGOUT_FLASS_SERVICE,
  FAIL_LOGOUT_FLASS_SERVICE,

  LOGIN_FLASS_SERVICE,
  SUCCESS_LOGIN_FLASS_SERVICE,
  FAIL_LOGIN_FLASS_SERVICE,
  LOGOUT
} from './actions';

import {
  SET_USER
} from '../Flass/User/UserActions';

function* initGoogleService() {
  yield call(Google.initGoogleAuthService);
}

function* loginFlassService() {
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
        type: SUCCESS_LOGIN_FLASS_SERVICE,
        payload: authResponse
      });
    }
  } catch (error) {
    yield put({
      type: FAIL_LOGIN_FLASS_SERVICE,
      error
    });
  }
}

function isAuthResponseValid(authResponse) {
  return Object.prototype.hasOwnProperty.call(authResponse, 'id_token')
    && authResponse.id_token !== '';
}

function* checkSession() {
  try {
    yield put({ type: CHECK_SESSION_START });
    const responseData = yield call(agent.User.whoami);
    const flassUserId = yield call(getItemFromLocalStorage, 'flass_user_id');

    if (responseData.id.toString() !== flassUserId) {
      throw new Error('Invalid session');
    }

    yield put({ type: SET_USER, user: responseData });

    yield put({ type: CHECK_SESSION_SUCCESS });
    yield put({ type: CHECK_SESSION_FIN });
  } catch (error) {
    yield put({ type: CHECK_SESSION_FAIL });
    yield put({ type: CHECK_SESSION_FIN });
  }
}

function* logoutFlassService() {
  try {
    yield call(Google.signOutUser);
    yield call(agent.User.out);
    yield call(setItemToLocalStorage, 'flass_user_id', '');
    yield put({ type: SUCCESS_LOGOUT_FLASS_SERVICE });
  } catch (e) {
    yield put({ type: FAIL_LOGOUT_FLASS_SERVICE });
  }
}

export default function* rootSaga() {
  yield takeLatest(INIT_GOOGLE_SERVICE, initGoogleService);
  yield takeLatest(LOGIN_FLASS_SERVICE, loginFlassService);
  yield takeLatest(CHECK_SESSION, checkSession);
  yield takeLatest(LOGOUT, logoutFlassService);
}
