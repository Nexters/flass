import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import './infoBox.scss';
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
        <a onClick={ back }>
          <img src="https://png.icons8.com/pikachu-pokemon/color/24" alt="옵션 선택 취소" />
        </a>
        <img src="https://png.icons8.com/genie/color/24" alt="구글 로고" />
        <h3>유튜브 업로드를 위해 구글 로그인하세요.</h3>
        <Button color="#9abf32" onClick={ goToGoogleAuthPage }>로그인</Button>
      </div>
    );
  }
}

GoogleLogin.propTypes = propTypes;

export default GoogleLogin;
