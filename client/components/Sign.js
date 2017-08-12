import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import SignApp from './Sign/SignApp';
import SignUp from './Sign/SignUp/SignUp';
import SignIn from './Sign/SignIn/SignIn';

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
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Root;
