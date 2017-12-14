import { combineReducers } from 'redux';

import badge from './badges';
import lecture from './lectures';
import grid from './grids';
import user from './users';

export default combineReducers({
  badge,
  grid,
  lecture,
  user
});
