import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import flass from './modules/Flass/reducers';
import UploadReducer from './modules/Upload/uploads';
import quizInsertionReducer from './modules/Upload/uploadInsertionQuizzes';
import signReducer from './modules/Sign/signs';

export default combineReducers({
  flass,
  upload: UploadReducer,
  quizInsertion: quizInsertionReducer,
  form: formReducer,
  sign: signReducer
});
