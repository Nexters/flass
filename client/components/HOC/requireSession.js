import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  CHECK_SESSION
} from '../../modules/Sign/actions';
import {
  FETCH_USER
} from '../../modules/Flass/User/UserActions';

const { shape, object, func, bool } = PropTypes;

const propTypes = {
  checkSession: func.isRequired,
  sessionValid: bool.isRequired
};
const defaultProps = {};

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: shape({
        history: object.isRequired
      })
    };

    componentDidMount() {
      this.props.checkSession();
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.sessionValid) {
        this.context.router.history.push('/user/login');
      }
    }

    render() {
      return <ComposedComponent { ...this.props } />;
    }
  }

  function mapStateToProps(state) {
    const { sessionValid } = state.sign;
    return { sessionValid };
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      checkSession: () => ({
        type: CHECK_SESSION
      }),
      fetchUser: () => ({
        type: FETCH_USER
      })
    }, dispatch);
  }

  Authentication.propTypes = propTypes;
  Authentication.defaultProps = defaultProps;

  return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}
