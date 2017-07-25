import { combineReducers } from 'redux';

import detail from './FlassDetail/reducers';
import grid from './FlassGrid/FlassGridReducer';

export default combineReducers({
  grid,
  detail
});
