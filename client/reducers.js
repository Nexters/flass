import { combineReducers } from 'redux';

import memo from './modules/MemoWithEslint/MemoReducer';
import flass from './modules/Flass/FlassReducer';
import TestTutorialReducer from './modules/TestTutorialModule/TestTutorialReducer';
import quizReducer from './modules/Quiz/quiz';

export default combineReducers({
  memo,
  flass,
  quiz: quizReducer,
  comments: TestTutorialReducer
});
