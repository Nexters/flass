import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import requireSession from './HOC/requireSession';
import FlassApp from './Flass/FlassAppContainer';
import SignInContainer from './Sign/SignIn/SignInContainer';
import FlassViewContainer from './FlassView/FlassViewContainer';

class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/user/login" exact component={ SignInContainer } />
          <Route path="/v/:id" component={ requireSession(FlassViewContainer) } />
          <Route path="/*" component={ requireSession(FlassApp) } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Root;
