import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

const { func, bool } = PropTypes;

const propTypes = {
  initGoogleAuthService: func.isRequired,
  goToGoogleAuthPage: func.isRequired,
  signOutGoogleService: func.isRequired,
  signOutFlassService: func.isRequired,

  isUserSignedIn: bool.isRequired,
  needRedirect: bool.isRequired
};

const defaultProps = {};

class SignIn extends Component {
  componentDidMount() {
    this.props.initGoogleAuthService();
  }
  render() {
    const {
      isUserSignedIn,
      needRedirect
    } = this.props;

    return (
      <div>
        <button
          onClick={ this.onClickLoginBtn }>
          구글 로그인
        </button>
        <button
          onClick={ this.onClickLogoutBtn }>
          구글 로그아웃
        </button>
        <div>
          Is user signed in?: { `${isUserSignedIn}` }
        </div>
        <div>
          Is user need redirect?: { `${needRedirect}` }
        </div>
      </div>
    );
  }

  @autobind
  onClickLoginBtn() {
    this.props.goToGoogleAuthPage();
  }

  @autobind
  onClickLogoutBtn() {
    this.props.signOutGoogleService();
    this.props.signOutFlassService();
  }
}

SignIn.propTypes = propTypes;
SignIn.defaultProps = defaultProps;

export default SignIn;
