import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import requireSession from './HOC/requireSession';
import SignInContainer from './Sign/SignIn/SignInContainer';

class Sign extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/user/login" component={ requireSession(SignInContainer) } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Sign;
