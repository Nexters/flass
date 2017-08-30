import { Provider } from 'react-redux';
import React from 'react';
import whyDidYouUpdate from 'why-did-you-update';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './store';
import Root from './components/Root';

import FireBaseConfig from './config/FirebaseConfig';

function initWhyDidYouUpdate() {
  let createClass = React.createClass;
  Object.defineProperty(React, 'createClass', {
    set: (nextCreateClass) => {
      createClass = nextCreateClass;
    }
  });
  whyDidYouUpdate(React, { exclude: [/^Connect/, /^styled/, /^Route/, /^Tab/, /^Styled/, /^Row/, /^Col/, /^Safe/, /^Link/, /^Fade/] });
}

// initWhyDidYouUpdate();

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
