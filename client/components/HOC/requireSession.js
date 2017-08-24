import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  CHECK_SESSION
} from '../../modules/Sign/actions';

const { shape, object, func, bool } = PropTypes;

const propTypes = {
  checkSession: func.isRequired,
  sessionExist: bool.isRequired
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
      if (!nextProps.sessionExist) {
        this.context.router.history.push('/user/login');
      }
    }

    render() {
      return <ComposedComponent { ...this.props } />;
    }
  }

  function mapStateToProps(state) {
    const { sessionExist } = state.sign;
    return { sessionExist };
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      checkSession: () => ({
        type: CHECK_SESSION
      })
    }, dispatch);
  }

  Authentication.propTypes = propTypes;
  Authentication.defaultProps = defaultProps;

  return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}
