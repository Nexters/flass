/**
 * @fileOverview The root reducer, combines all reducers.
 */

import { combineReducers } from 'redux';

import memo from './modules/Memo/MemoReducer';

export default combineReducers({
  memo
});
