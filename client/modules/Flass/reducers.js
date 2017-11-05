import { combineReducers } from 'redux';

import badge from './Badge/reducers';
import lecture from './Lecture/reducers';
import grid from './Grid/reducers';
import user from './User/reducers';

export default combineReducers({
  badge,
  grid,
  lecture,
  user
});
