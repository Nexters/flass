
import { FETCH_READY_USER, FETCH_USER_SUCCESS, FETCH_USER_ERROR } from './UserActions';
import { createReducer } from '../../reduxHelper';

const initialState = {
  id: -1,
  email: '',
  userName: ''
};

const fetchUserReducer = {
  [FETCH_READY_USER]: (state, action) => state,
  [FETCH_USER_SUCCESS]: (state, { user: { id, email, username } }) => ({
    id,
    email,
    userName: username
  }),
  [FETCH_USER_ERROR]: (state, action) => initialState
};

const UserReducer = createReducer(initialState, {
  ...fetchUserReducer
});

export default UserReducer;
