import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

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
    // 예훈아 여기가 로그인화면이야!
    const {
      isUserSignedIn,
      sessionValid
    } = this.props;

    return (
      <div>
        <button
          onClick={ this.onClickLoginBtn }>
          플래스 로그인
        </button>
        <div>
          Is user signed in?: { `${isUserSignedIn}` }
        </div>
        <div>
          Is user sessionValid?: { `${sessionValid}` }
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
