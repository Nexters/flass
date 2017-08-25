import { Provider } from 'react-redux';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './store';

import FireBaseConfig from './config/FirebaseConfig';
import Sign from './components/Sign';

const render = Component => {
  console.log('npm run dev:sign :: init() :: App starts booting...');
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
render(Sign);

if (module.hot) {
  module.hot.accept('./components/Sign', () => { render(Sign); });
}
