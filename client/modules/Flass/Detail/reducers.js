import { combineReducers } from 'redux';

import detail from './DetailReducer';
import question from './Question/QuestionReducer';
import comment from './Comment/CommentReducer';
import video from './Video/VideoReducers';
import analysis from './Analysis/reducers';

export default combineReducers({
  detail,
  question,
  comment,
  video,
  analysis
});
