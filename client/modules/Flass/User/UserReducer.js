
import { createReducer } from '../../reducerHelper';
import {
  FETCH_READY_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  SET_USER
} from './UserActions';

const initialState = {
  id: -1,
  email: '',
  userName: ''
};

const setUserReducer = {
  [SET_USER]: (state, { user }) => {
    console.log('User::reducer::user');
    console.log(user);
    const {
      id,
      email,
      username
    } = user;

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
