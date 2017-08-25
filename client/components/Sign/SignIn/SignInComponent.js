import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import './signIn.scss';
import SignInBackground from './img/signInBackground.png';
import SignInBackground2x from './img/signInBackground@2x.png';
import SignInBackground3x from './img/signInBackground@3x.png';
import Logo from './img/logo.png';
import Logo2x from './img/logo@2x.png';
import Logo3x from './img/logo@3x.png';

const { func, bool, shape, object } = PropTypes;

const propTypes = {
  initGoogleAuthService: func.isRequired,
  goToGoogleAuthPage: func.isRequired,

  isUserSignedIn: bool.isRequired,
  sessionValid: bool.isRequired
};

const defaultProps = {};

class SignIn extends Component {
  static contextTypes = {
    router: shape({
      history: object.isRequired
    })
  };

  componentDidMount() {
    this.props.initGoogleAuthService();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sessionValid) {
      this.context.router.history.push('/');
    }
  }

  render() {
    const {
      isUserSignedIn,
      sessionValid
    } = this.props;

    return (
      <div className="signInBackground">
        <div className="signInContainer">
          <img
            src="http://i.imgur.com/MU2Hfwn.png"
            srcSet={ 'http://i.imgur.com/z8nzuak.png 2x,http://i.imgur.com/HZ49y59.png 3x' }
            className="flassLogo"
            alt="Flass 로고" />
          <span className="signInMessage">Better interaction, Better learning</span>
          <span className="signInMessage2">
            복잡한 절차없이 구글 계정으로
            <br />
            지금 바로 시작해보세요.
          </span>
          <a
            className="signInButton"
            onClick={ this.onClickLoginBtn }>
            <div className="signInButtonContent">
              <img
                className="googleIcon"
                src="http://i.imgur.com/6TVkeNz.png"
                alt="Google 아이콘" />
              Log in with Google
            </div>
          </a>
        </div>
      </div>
    );
  }

  @autobind
  onClickLoginBtn() {
    this.props.goToGoogleAuthPage();
  }
}

SignIn.propTypes = propTypes;
SignIn.defaultProps = defaultProps;

export default SignIn;
