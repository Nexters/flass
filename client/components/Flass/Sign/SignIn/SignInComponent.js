import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import './signIn.scss';
import {CLASSTING_CLIENT_ID} from '../../../../../config/Constants';

const { func, bool, shape, object, string } = PropTypes;

const propTypes = {
  initGoogleAuthService: func.isRequired,
  sessionValid: bool,
  prevPath: string
};

const defaultProps = {
  sessionValid: false,
  prevPath: '/'
};

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
    const { sessionValid, prevPath } = nextProps;
    if (sessionValid) {
      this.context.router.history.push(prevPath);
    }
  }

  render() {
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
                alt="Classting 아이콘" />
              Log in with Classting
            </div>
          </a>
        </div>
      </div>
    );
  }

  @autobind
  onClickLoginBtn() {
    const url = 'http://localhost:4000';
    window.location = `https://oauth.classting.com/v1/oauth2/authorize?client_id=${CLASSTING_CLIENT_ID}&redirect_uri=${url}&response_type=token`;
    // https://oauth.classting.com/v1/oauth2/authorize?client_id=4cb80de500c6cec9be15d59b5617085c&redirect_uri=http://localhost:4000&response_type=token
    // this.props.goToAuthPage();
  }
}

SignIn.propTypes = propTypes;
SignIn.defaultProps = defaultProps;

export default SignIn;
