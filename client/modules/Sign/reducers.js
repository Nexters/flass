import _ from 'lodash';
import { createReducer } from '../reducerHelper';
import {
  SUCCESS_LOGIN_GOOGLE_SERVICE,
  SUCCESS_LOGOUT_GOOGLE_SERVICE,
  USER_IS_SIGNEDIN,
  USER_ISNOT_SIGNEDIN,
  CHECK_SESSION_SUCCESS,
  CHECK_SESSION_FAIL
} from './actions';

const initialState = {
  isUserSignedIn: false,
  needRedirect: false,
  id_token: '',
  sessionExist: false
};

const userSignInReducer = {
  [SUCCESS_LOGIN_GOOGLE_SERVICE]: (state, { payload }) => ({
    ...state,
    isUserSignedIn: true,
    needRedirect: true,
    id_token: payload.id_token
  })
};

const userSignOutReducer = {
  [SUCCESS_LOGOUT_GOOGLE_SERVICE]: state => ({
    ...state,
    isUserSignedIn: false,
    id_token: ''
  })
};

const userIsSignedInReducer = {
  [USER_IS_SIGNEDIN]: state => ({
    ...state,
    isUserSignedIn: true,
    needRedirect: true
  }),
  [USER_ISNOT_SIGNEDIN]: state => ({
    ...state,
    isUserSignedIn: false,
    needRedirect: false
  }),
  [CHECK_SESSION_SUCCESS]: state => ({
    ...state,
    sessionExist: true
  }),
  [CHECK_SESSION_FAIL]: state => ({
    ...state,
    sessionExist: false
  })
};

const SignReducers = createReducer(initialState, {
  ...userSignInReducer,
  ...userSignOutReducer,
  ...userIsSignedInReducer
});

export default SignReducers;
