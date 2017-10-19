import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import BtnLoginWithClassting from './img/btn.login_with_classting_e_600.png';
import { CLASSTING_CLIENT_ID } from '../../../../../config/Constants';
import './signIn.scss';
import { callValue } from '../../../../util/ObjectUtil';
import { API_ROOT_FRONT } from '../../../../config/EnvironmentConfig';

const { func, bool, shape, object, string } = PropTypes;

const propTypes = {
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
            복잡한 절차없이 클래스팅 계정으로
            <br />
            지금 바로 시작해보세요.
          </span>
          <a
            onClick={ this.onClickLoginBtn }>
            <img
              className="classtingIcon"
              width="200"
              src={ BtnLoginWithClassting }
              alt="Classting 아이콘" />
          </a>
        </div>
      </div>
    );
  }

  @autobind
  onClickLoginBtn() {
    const redirectUrl = callValue(() => this.props.location.state.referrer, '/');
    window.location = `https://oauth.classting.com/v1/oauth2/authorize?client_id=${CLASSTING_CLIENT_ID}&redirect_uri=${API_ROOT_FRONT}?redirect_url=${redirectUrl}&response_type=token`;
    // https://oauth.classting.com/v1/oauth2/authorize?client_id=4cb80de500c6cec9be15d59b5617085c&redirect_uri=http://localhost:4000&response_type=token
    // this.props.goToAuthPage();
  }
}

SignIn.propTypes = propTypes;
SignIn.defaultProps = defaultProps;

export default SignIn;
