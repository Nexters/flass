import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import LoadingComponent from './Loading/LoadingComponent';
import { withRouter } from 'react-router';
import { hashToObjectKey, queryToObjectKey } from '../../util/UrlUtil';

const { func, bool, shape, object } = PropTypes;

const propTypes = {
  component: func.isRequired,
  checkSession: func.isRequired,
  loginClasting: func.isRequired,
  setEntryPoint: func.isRequired,
  sessionValid: bool,
  isSessionChecking: bool
};

const defaultProps = {
  sessionValid: false,
  isSessionChecking: false
};

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
    const { sessionValid, ...rest } = this.props;
    const { location } = rest;
    const { checkSession, loginClasting } = this.props;
    const accessToken = hashToObjectKey(location, 'access_token');

    if (accessToken) {
      loginClasting(accessToken);
    } else {
      checkSession();
    }
    if (!sessionValid) {
      this.setEntryPoint(rest);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { sessionValid, isSessionChecking } = nextProps;
    this.setState({ sessionValid, isSessionChecking });
  }

  render() {
    const { component, location, ...rest } = this.props;
    const { isSessionChecking, sessionValid } = this.state;

    if (isSessionChecking) {
      return <LoadingComponent />;
    }

    const redirectUrl = queryToObjectKey(location, 'redirect_url');
    if(redirectUrl) {
      return (<Redirect to={ {
        pathname: redirectUrl
      } } />);
    }
    if (sessionValid) {
      return <Route { ...rest } component={ component } />;
    } else {
      return (<Redirect to={ {
        pathname: '/user/login',
        state: { referrer: location.pathname }
      } } />);
    }
  }

  setEntryPoint(rest) {
    this.props.setEntryPoint(rest.location.pathname);
  }
}

SessionCheckBeforeRoute.propTypes = propTypes;
SessionCheckBeforeRoute.defaultProps = defaultProps;

export default SessionCheckBeforeRoute;
