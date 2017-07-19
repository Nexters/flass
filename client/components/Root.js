import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import FlassApp from './Flass/FlassApp';
import SignApp from './Sign/SignApp';
import SignUp from './Sign/SignUp';
import SignIn from './Sign/SignIn';

class Root extends Component {
  signUp = () => (
    <SignApp>
      <SignUp />
    </SignApp>
  );

  signIn = () => (
    <SignApp>
      <SignIn />
    </SignApp>
  );

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={ this.signUp } />
          <Route path="/signin" component={ this.signIn } />
          <Route path="/*" component={ FlassApp } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Root;
