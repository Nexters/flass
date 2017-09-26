import _ from 'lodash';
import { createReducer } from '../reducerHelper';
import {
  SUCCESS_LOGIN_GOOGLE_SERVICE,
  SUCCESS_LOGOUT_GOOGLE_SERVICE,

  USER_IS_SIGNEDIN,
  USER_ISNOT_SIGNEDIN,

  CHECK_SESSION_START,
  CHECK_SESSION_FIN,
  CHECK_SESSION_SUCCESS,
  CHECK_SESSION_FAIL,

  SUCCESS_LOGOUT_FLASS_SERVICE,
  FAIL_LOGOUT_FLASS_SERVICE,

  SUCCESS_LOGIN_FLASS_SERVICE,
  FAIL_LOGIN_FLASS_SERVICE,

  SET_ENTRY_POINT,
  GET_ENTRY_POINT,
  RESET_ENTRY_POINT
} from './actions';

const initialState = {
  isUserSignedIn: false,
  id_token: '',
  sessionValid: false,
  isSessionChecking: false,
  prevPath: '/'
};

const userSignInReducer = {
  [SUCCESS_LOGIN_FLASS_SERVICE]: (state, { payload }) => ({
    ...state,
    isUserSignedIn: true,
    id_token: payload.id_token,
    sessionValid: true
  })
};

const userSignOutReducer = {
  [SUCCESS_LOGOUT_FLASS_SERVICE]: state => ({
    ...state,
    isUserSignedIn: false,
    sessionValid: false,
    id_token: '',
  })
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
    prevPath: action.location
  }),
  [RESET_ENTRY_POINT]: (state, action) => ({
    prevPath: '/'
  })
};

const SignReducers = createReducer(initialState, {
  ...userSignInReducer,
  ...userSignOutReducer,
  ...userIsSignedInReducer,
  ...entryPointReducer
});

export default SignReducers;
