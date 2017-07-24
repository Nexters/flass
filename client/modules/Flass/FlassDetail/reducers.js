import { combineReducers } from 'redux';

import detail from './FlassDetailReducer';
import question from './Question/FlassQuestionReducer';
import comment from './Comment/FlassCommentReducer';

export default combineReducers({
  detail,
  question,
  comment
});
