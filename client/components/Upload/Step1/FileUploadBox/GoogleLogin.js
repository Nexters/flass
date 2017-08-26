import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './googleLogin.scss';
import Exit from '../img/exit.png';
import Exit2x from '../img/exit@2x.png';
import Exit3x from '../img/exit@3x.png';
import Google from './img/google.png';
import Google2x from './img/google@2x.png';
import Google3x from './img/google@3x.png';
import Button from '../../../Flass/Button';

const propTypes = {
  back: PropTypes.func.isRequired,
  goToGoogleAuthPage: PropTypes.func.isRequired
};

class GoogleLogin extends Component {
  state = {

  };

  render() {
    const { back, goToGoogleAuthPage } = this.props;
    // const { } = this.state;
    return (
      <div>
        <div className="alignRight">
          <a onClick={ back }>
            <img
              src={ Exit }
              srcSet={ `${Exit2x} 2x,${Exit3x} 3x` }
              className="exitIcon"
              alt="옵션 선택 취소" />
          </a>
        </div>
        <div className="alignCenter">
          <img
            src={ Google }
            srcSet={ `${Google2x} 2x,${Google3x} 3x` }
            className="googleLoginIcon"
            alt="구글 아이콘" />
          <span className="googleLoginMessage">유튜브 업로드를 위해 구글 로그인하세요.</span>
          <Button
            color="#9abf32"
            onClick={ goToGoogleAuthPage }>로그인</Button>
        </div>
      </div>
    );
  }
}

GoogleLogin.propTypes = propTypes;

export default GoogleLogin;
