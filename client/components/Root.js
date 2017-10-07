import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import SessionCheckBeforeRoute from './Auth/SessionCheckBeforeRouteContainer';
import FlassApp from './Flass/FlassAppContainer';
import SignInContainer from './Flass/Sign/SignIn/SignInContainer';
import FlassViewContainer from './Flass/Link/FlassViewContainer';
import ErrorComponent from './Error/ErrorComponent';
import LoadingComponent from './Auth/Loading/LoadingComponent';
import { INIT_GOOGLE_SERVICE } from '../modules/Sign/actions';
import '../css/base/global.scss';

const propTypes = {
  initGoogleAuthService: PropTypes.func.isRequired,
};

class Root extends Component {
  componentDidMount() {
    this.props.initGoogleAuthService();
  }

  render() {
    const { isGoogleChecking } = this.props;
    if (isGoogleChecking) {
      return <LoadingComponent />;
    }
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/loading" component={ LoadingComponent } />
          <Route path="/error" component={ ErrorComponent } />
          <Route path="/user/login" exact component={ SignInContainer } />
          <SessionCheckBeforeRoute path="/v/:id" component={ FlassViewContainer } />
          <SessionCheckBeforeRoute path="/*" component={ FlassApp } />
        </Switch>
      </BrowserRouter>
    );
  }
}

Root.propTypes = propTypes;

export default connect(
  ({ sign }) => ({
    isGoogleChecking: sign.isGoogleChecking,
  }),
  {
    initGoogleAuthService: () => ({
      type: INIT_GOOGLE_SERVICE
    })
  }
)(Root);
