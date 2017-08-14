import { combineReducers } from 'redux';

import badge from './Badge/BadgeReducer';
import detail from './Detail/reducers';
import grid from './Grid/GridReducer';
import user from './User/UserReducer';

export default combineReducers({
  badge,
  grid,
  detail,
  user,
});
