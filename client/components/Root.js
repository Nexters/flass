import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import SessionCheckBeforeRoute from './Auth/SessionCheckBeforeRouteContainer';
import FlassApp from './Flass/FlassAppContainer';
import SignInContainer from './Flass/Sign/SignIn/SignInContainer';
import FlassViewContainer from './Flass/Link/FlassViewContainer';
import ErrorComponent from './Error/ErrorComponent';

import '../css/base/global.scss';

class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/error" component={ ErrorComponent } />
          <Route path="/user/login" exact component={ SignInContainer } />
          <SessionCheckBeforeRoute path="/v/:id" component={ FlassViewContainer } />
          <SessionCheckBeforeRoute path="/*" component={ FlassApp } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Root;
