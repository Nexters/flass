import { Provider } from 'react-redux';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './store';
import Root from './components/Root';

import FireBaseConfig from './config/FirebaseConfig';

const render = Component => {
  console.log('init() :: App starts booting...');
  injectTapEventPlugin();
  FireBaseConfig.init();

  ReactDOM.render(
    <AppContainer>
      <Provider store={ configureStore() }>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
};
render(Root);

if (module.hot) {
  module.hot.accept('./components/Root', () => { render(Root); });
}
