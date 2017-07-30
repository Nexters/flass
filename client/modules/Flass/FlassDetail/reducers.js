import { combineReducers } from 'redux';

import detail from './FlassDetailReducer';
import question from './Question/QuestionReducer';
import comment from './Comment/CommentReducer';

export default combineReducers({
  detail,
  question,
  comment
});
