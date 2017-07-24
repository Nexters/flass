import { combineReducers } from 'redux';

import detail from './FlassDetailReducer';
import comment from './Comment/FlassCommentReducer';

export default combineReducers({
  detail,
  comment
});
