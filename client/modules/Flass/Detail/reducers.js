import { combineReducers } from 'redux';

import detail from './DetailReducer';
import question from './Question/QuestionReducer';
import comment from './Comment/CommentReducer';
import video from './Video/VideoReducers';

export default combineReducers({
  detail,
  question,
  comment,
  video
});
