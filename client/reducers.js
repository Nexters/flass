import { combineReducers } from 'redux';

import memo from './modules/MemoWithEslint/MemoReducer';
import flass from './modules/Flass/FlassReducer';
import TestTutorialReducer from './modules/TestTutorialModule/TestTutorialReducer';

export default combineReducers({
  memo,
  flass,
  comments: TestTutorialReducer
});
