import { combineReducers } from 'redux';

import badge from './Badge/reducers';
import detail from './Detail/reducers';
import grid from './Grid/reducers';
import user from './User/reducers';

export default combineReducers({
  badge,
  grid,
  detail,
  user
});
