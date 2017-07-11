import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';
import FireBaseConfig from './config/FirebaseConfig';
import injectTapEventPlugin from 'react-tap-event-plugin';

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import MemoApp from "./components/Memo/MemoApp";

const render = Component => {
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
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
};

render(MemoApp);

if (module.hot) {
  module.hot.accept('./components/Root', () => { render(MemoApp) });
}
