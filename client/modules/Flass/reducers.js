import { combineReducers } from 'redux';

import badge from './Badge/badges';
import lecture from './Lecture/lectures';
import grid from './Grid/grids';
import user from './User/users';

export default combineReducers({
  badge,
  grid,
  lecture,
  user
});
