import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import flass from './ducks/Flass/reducers';
import UploadReducer from './ducks/Upload/uploads';
import quizInsertionReducer from './ducks/Upload/uploadInsertionQuizzes';
import signReducer from './ducks/Sign/signs';

export default combineReducers({
  flass,
  upload: UploadReducer,
  quizInsertion: quizInsertionReducer,
  form: formReducer,
  sign: signReducer
});
