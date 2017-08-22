import { call, put, takeLatest } from 'redux-saga/effects';
import Google from '../Google';
import {
  INIT_GOOGLE_SERVICE,
  LOGIN_GOOGLE_SERVICE,
  SUCCESS_LOGIN_GOOGLE_SERVICE,
  FAIL_LOGIN_GOOGLE_SERVICE,

  LOGOUT_GOOGLE_SERVICE,
  SUCCESS_LOGOUT_GOOGLE_SERVICE,
  FAIL_LOGOUT_GOOGLE_SERVICE,

  USER_IS_SIGNEDIN,
  USER_ISNOT_SIGNEDIN
} from './actions';

function* initGoogleService() {
  yield call(Google.initGoogleAuthService);
  const isUserSignedIn = yield call(Google.isUserSignedIn);

  if (isUserSignedIn) {
    yield put({ type: USER_IS_SIGNEDIN });
  } else {
    yield put({ type: USER_ISNOT_SIGNEDIN });
  }
}

function* loginGoogleService() {
  const authResponse = yield call(Google.authenticateForSignIn);
  if (authResponse) {
    yield put({
      type: SUCCESS_LOGIN_GOOGLE_SERVICE
    });
  }
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

export default function* rootSaga() {
  yield takeLatest(INIT_GOOGLE_SERVICE, initGoogleService);
  yield takeLatest(LOGIN_GOOGLE_SERVICE, loginGoogleService);
  yield takeLatest(LOGOUT_GOOGLE_SERVICE, logoutGoogleService);
}
