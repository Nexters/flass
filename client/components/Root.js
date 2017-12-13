import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import SessionCheckBeforeRoute from './Auth/SessionCheckBeforeRoute';
import FlassApp from './Flass/FlassApp';
import SignInContainer from './Flass/Sign/SignIn/SignInComponent';
import FlassViewContainer from './Flass/Link/FlassViewComponent';
import ErrorComponent from './Error/ErrorComponent';
import LoadingComponent from './Auth/Loading/LoadingComponent';
import { INIT_GOOGLE_SERVICE } from '../modules/Sign/signs';
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

function mapStateToProps(state) {
  const { sign } = state;
  return {
    isGoogleChecking: sign.isGoogleChecking
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initGoogleAuthService: () => ({
      type: INIT_GOOGLE_SERVICE
    })
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
