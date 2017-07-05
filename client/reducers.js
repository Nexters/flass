/**
 * @fileOverview The root reducer, combines all reducers.
 */

import { combineReducers } from 'redux';

import serverTimestamp from './modules/HelloWorld/HelloWorldReducer';

export default combineReducers({
  serverTimestamp,
});
