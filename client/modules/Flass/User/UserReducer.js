import { FETCH_READY_USER, FETCH_USER_SUCCESS, FETCH_USER_ERROR } from './UserActions';

const initialState = {
  id: -1,
  email: '',
  userName: '',
};

const UserReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...action.user
      };
    case FETCH_USER_ERROR:
      return initialState;
    case FETCH_READY_USER:
    default:
      return state;
  }
};

export default UserReducer;
