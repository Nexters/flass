import { combineReducers } from 'redux';

import memo from './modules/MemoWithEslint/MemoReducer';
import flass from './modules/Flass/reducers';
import TestTutorialReducer from './modules/TestTutorialModule/TestTutorialReducer';
import quizReducer from './modules/Quiz/quiz';
import UploadReducer from './modules/Upload/Reducer';

export default combineReducers({
  memo,
  flass,
  quiz: quizReducer,
  comments: TestTutorialReducer,
  upload: UploadReducer
});
