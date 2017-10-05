export const INIT_GOOGLE_SERVICE = 'INIT_GOOGLE_SERVICE';

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
