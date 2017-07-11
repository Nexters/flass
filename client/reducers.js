/**
 * @fileOverview The root reducer, combines all reducers.
 */

import { combineReducers } from 'redux';

import memo from './modules/Memo/MemoReducer';
import flass from './modules/Flass/FlassReducer';

export default combineReducers({
  memo,
  flass
});
