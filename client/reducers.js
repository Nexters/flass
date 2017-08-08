import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import memo from './modules/MemoWithEslint/MemoReducer';
import flass from './modules/Flass/reducers';
import TestTutorialReducer from './modules/TestTutorialModule/TestTutorialReducer';
import quizReducer from './modules/Quiz/quiz';
import UploadReducer from './modules/Upload/Reducer';
import quizInsertionReducer from './modules/Upload/UploadInsertion/Quiz/QuizReducers';

export default combineReducers({
  memo,
  flass,
  quiz: quizReducer,
  comments: TestTutorialReducer,
  upload: UploadReducer,
  quizInsertion: quizInsertionReducer,
  form: formReducer
});
