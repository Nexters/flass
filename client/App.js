import './App.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';
import HelloWorld from './modules/HelloWorld/HelloWorldWrapper';
import FireBaseConfig from './config/FirebaseConfig';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MemoApp from "./modules/Memo/MemoApp";

import 'react-hot-loader/patch';
import {AppContainer} from 'react-hot-loader';

let appBoot = {};

appBoot.init = function () {
  console.log('init() :: App starts booting...');
  injectTapEventPlugin();

  // Check for devToolsExtension
  const create = window.devToolsExtension ?
    window.devToolsExtension()(createStore) : createStore;

  // Apply thunk and additional middleware if applicable
  const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(create);

  // Init store
  const store = createStoreWithMiddleware(rootReducer);

  FireBaseConfig.init();

  ReactDOM.render(
    <AppContainer>
      <Provider store={ store }>
        <MemoApp />
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
};

// init app
appBoot.init();
