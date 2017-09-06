import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const { func, bool, shape, object } = PropTypes;

const propTypes = {
  component: func.isRequired,
  checkSession: func.isRequired,
  sessionValid: bool.isRequired
};

const defaultProps = {};

class SessionCheckBeforeRoute extends Component {
  static contextTypes = {
    router: shape({
      history: object.isRequired
    })
  };

  componentWillMount() {
    this.props.checkSession();
  }

  render() {
    const {
      component,
      sessionValid,
      ...rest
    } = this.props;

    return sessionValid ?
      <Route { ...rest } component={ component } /> :
      <Redirect to="/user/login" />;
  }
}

SessionCheckBeforeRoute.propTypes = propTypes;
SessionCheckBeforeRoute.defaultProps = defaultProps;

export default SessionCheckBeforeRoute;
