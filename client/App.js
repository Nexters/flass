/**
 * @fileOverview The app main entry point.
 */

import './App.scss';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';
import HelloWorld from './modules/HelloWorld/HelloWorldWrapper';

let appBoot = module.exports = {};

appBoot.init = function() {
  console.log('init() :: App starts booting...');

  // Check for devToolsExtension
  const create = window.devToolsExtension ?
    window.devToolsExtension()(createStore) : createStore;

  // Apply thunk and additional middleware if applicable
  const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(create);

  // Init store
  const store = createStoreWithMiddleware(rootReducer);

  ReactDom.render(
    <Provider store={ store }>
      <HelloWorld />
    </Provider>,
    document.getElementById('app')
  );
};

// init app
appBoot.init();
