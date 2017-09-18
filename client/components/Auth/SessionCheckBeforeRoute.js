import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import LoadingComponent from './Loading/LoadingComponent';

const { func, bool, shape, object } = PropTypes;

const propTypes = {
  component: func.isRequired,
  checkSession: func.isRequired,
  sessionValid: bool.isRequired,
  isSessionChecking: bool.isRequired
};

const defaultProps = {};

class SessionCheckBeforeRoute extends Component {
  static contextTypes = {
    router: shape({
      history: object.isRequired
    })
  };

  constructor(props) {
    super(props);

    this.state = {
      isSessionChecking: true,
      sessionValid: false
    };
  }

  componentWillMount() {
    this.props.checkSession();
  }

  componentWillReceiveProps(nextProps) {
    const { sessionValid, isSessionChecking } = nextProps;
    this.setState({ sessionValid, isSessionChecking });
  }

  render() {
    const {
      component,
      ...rest
    } = this.props;
    const {
      isSessionChecking,
      sessionValid
    } = this.state;

    if (isSessionChecking) {
      return <LoadingComponent />;
    }

    if (sessionValid) {
      return <Route { ...rest } component={ component } />;
    } else {
      return <Redirect to="/user/login" />;
    }
  }
}

SessionCheckBeforeRoute.propTypes = propTypes;
SessionCheckBeforeRoute.defaultProps = defaultProps;

export default SessionCheckBeforeRoute;
