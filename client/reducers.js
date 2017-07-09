/**
 * @fileOverview The root reducer, combines all reducers.
 */

import { combineReducers } from 'redux';

import HelloWorld from './modules/HelloWorld/HelloWorldReducer';

export default combineReducers({
  HelloWorld,
});
