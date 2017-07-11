/**
 * @fileOverview The root reducer, combines all reducers.
 */

import { combineReducers } from 'redux';

import memo from './modules/Memo/MemoReducer';
import TestTutorialReducer from './modules/TestTutorialModule/TestTutorialReducer';

export default combineReducers({
  memo,
  comments: TestTutorialReducer
});
