import _ from 'lodash';
import { take, call, put, takeLatest } from 'redux-saga/effects';
import { createReducer } from '../reducerHelper';
import Google from '../Google';
import agent from '../agent';
import {
  setItemToLocalStorage,
  getItemFromLocalStorage
} from '../sagasHelper';
import {
  SET_USER
} from '../Flass/users';

export const INIT_GOOGLE_SERVICE = 'INIT_GOOGLE_SERVICE';
export const SUCCESS_INIT_GOOGLE_SERVICE = 'SUCCESS_INIT_GOOGLE_SERVICE';

export const LOGIN_GOOGLE_SERVICE = 'LOGIN_GOOGLE_SERVICE';
export const SUCCESS_LOGIN_GOOGLE_SERVICE = 'SUCCESS_LOGIN_GOOGLE_SERVICE';
export const FAIL_LOGIN_GOOGLE_SERVICE = 'FAIL_LOGIN_GOOGLE_SERVICE';

export const LOGOUT_FLASS_SERVICE = 'LOGOUT_FLASS_SERVICE';
export const SUCCESS_LOGOUT_FLASS_SERVICE = 'LOGOUT_FLASS_SERVICE';
export const FAIL_LOGOUT_FLASS_SERVICE = 'LOGOUT_FLASS_SERVICE';

export const LOGOUT_GOOGLE_SERVICE = 'LOGOUT_GOOGLE_SERVICE';
export const SUCCESS_LOGOUT_GOOGLE_SERVICE = 'SUCCESS_LOGOUT_GOOGLE_SERVICE';
export const FAIL_LOGOUT_GOOGLE_SERVICE = 'FAIL_LOGOUT_GOOGLE_SERVICE';

export const USER_IS_SIGNEDIN = 'USER_IS_SIGNEDIN';
export const USER_ISNOT_SIGNEDIN = 'USER_ISNOT_SIGNEDIN';

export const CHECK_SESSION = 'CHECK_SESSION';
export const CHECK_SESSION_START = 'CHECK_SESSION_START';
export const CHECK_SESSION_FIN = 'CHECK_SESSION_FIN';
export const CHECK_SESSION_SUCCESS = 'CHECK_SESSION_SUCCESS';
export const CHECK_SESSION_FAIL = 'CHECK_SESSION_FAIL';

export const LOGIN_CLASSTING_SERVICE = 'LOGIN_CLASSTING_SERVICE';
export const LOGIN_FLASS_SERVICE = 'LOGIN_FLASS_SERVICE';
export const SUCCESS_LOGIN_FLASS_SERVICE = 'SUCCESS_LOGIN_FLASS_SERVICE';
export const FAIL_LOGIN_FLASS_SERVICE = 'FAIL_LOGIN_FLASS_SERVICE';

export const LOGOUT = 'LOGOUT';

export const SET_ENTRY_POINT = 'SET_ENTRY_POINT';
export const setEntryPoint = location => ({
  type: SET_ENTRY_POINT,
  location
});

export const RESET_ENTRY_POINT = 'RESET_ENTRY_POINT';
export const resetEntryPoint = () => ({
  type: RESET_ENTRY_POINT
});

const initialState = {
  isGoogleChecking: false,
  isUserSignedIn: false,
  id_token: '',
  sessionValid: false,
  isSessionChecking: false,
  prevPath: '/'
};

const initGoogleReducer = {
  [INIT_GOOGLE_SERVICE]: (state) => ({
    ...state,
    isGoogleChecking: true,
  }),
  [SUCCESS_INIT_GOOGLE_SERVICE]: (state) => ({
    ...state,
    isGoogleChecking: false,
  }),
  [LOGIN_GOOGLE_SERVICE]: (state) => ({
    ...state,
    isGoogleChecking: true,
  }),
  [SUCCESS_LOGIN_GOOGLE_SERVICE]: (state, { payload }) => ({
    ...state,
    isGoogleChecking: false,
  }),
  [FAIL_LOGIN_FLASS_SERVICE]: (state) => ({
    ...state,
    isGoogleChecking: false,
  }),
};

const userSignInReducer = {
  [SUCCESS_LOGIN_FLASS_SERVICE]: (state, { payload }) => ({
    ...state,
    isUserSignedIn: true,
    id_token: payload.id_token,
    sessionValid: true
  }),
};

const userSignOutReducer = {
  [SUCCESS_LOGOUT_FLASS_SERVICE]: state => (initialState)
};

const userIsSignedInReducer = {
  [CHECK_SESSION_START]: state => ({
    ...state,
    isSessionChecking: true
  }),
  [CHECK_SESSION_FIN]: state => ({
    ...state,
    isSessionChecking: false
  }),
  [CHECK_SESSION_SUCCESS]: state => ({
    ...state,
    sessionValid: true
  }),
  [CHECK_SESSION_FAIL]: state => ({
    ...state,
    sessionValid: false
  })
};

const entryPointReducer = {
  [SET_ENTRY_POINT]: (state, action) => ({
    ...state,
    prevPath: action.location
  }),
  [RESET_ENTRY_POINT]: (state, action) => ({
    ...state,
    prevPath: '/'
  })
};

export default createReducer(initialState, {
  ...userSignInReducer,
  ...userSignOutReducer,
  ...userIsSignedInReducer,
  ...entryPointReducer,
  ...initGoogleReducer,
});

function* initGoogleService() {
  console.log('initGoogleService');
  yield call(Google.initGoogleAuthService);
  yield put({ type: SUCCESS_INIT_GOOGLE_SERVICE });
}

function* loginGoogleService() {
  try {
    const authResponse = yield call(Google.authorizeForSignIn);
    const isGoogleAuthValid = isAuthResponseValid(authResponse);
    if (isGoogleAuthValid) {
      yield put({
        type: SUCCESS_LOGIN_GOOGLE_SERVICE,
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

function* loginClasstingService({ accessToken }) {
  try {
    const meResponse = yield call(agent.User.me, accessToken);
    yield call(setItemToLocalStorage, 'flass_user_id', meResponse.id.toString());
    yield put({
      type: SET_USER,
      user: meResponse
    });
    yield put({
      type: SUCCESS_LOGIN_FLASS_SERVICE,
      payload: {
        id_token: accessToken
      }
    });
    yield put({ type: CHECK_SESSION });
  } catch (err) {
    yield put({
      type: FAIL_LOGIN_FLASS_SERVICE,
      err
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
  } catch (e) {
    console.error(e);
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

export function* rootSaga() {
  yield takeLatest(INIT_GOOGLE_SERVICE, initGoogleService);
  yield takeLatest(LOGIN_GOOGLE_SERVICE, loginGoogleService);
  yield takeLatest(LOGIN_CLASSTING_SERVICE, loginClasstingService);
  yield takeLatest(CHECK_SESSION, checkSession);
  yield takeLatest(LOGOUT, logoutFlassService);
}
