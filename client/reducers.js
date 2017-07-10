/**
 * @fileOverview The root reducer, combines all reducers.
 */

import { combineReducers } from 'redux';

import helloworld from './modules/HelloWorld/HelloWorldReducer';
import memo from './modules/Memo/MemoReducer';

export default combineReducers({
  helloworld,
  memo
});
