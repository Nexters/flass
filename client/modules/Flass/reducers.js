import { combineReducers } from 'redux';

import badge from './FlassBadge/FlassBadgeReducer';
import detail from './FlassDetail/reducers';
import grid from './FlassGrid/FlassGridReducer';

export default combineReducers({
  badge,
  grid,
  detail,
});
