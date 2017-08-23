import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { NO_URL, SUCC_URL, FAIL_URL } from '../../../../modules/Constants';
import Button from '../../../Flass/Button';
import './urlUpload.scss';

const propTypes = {
  back: PropTypes.func.isRequired,
  urlStatus: PropTypes.number.isRequired,
  handleURLCheck: PropTypes.func.isRequired
};

class URLUpload extends Component {
  state = {
    videoURL: ''
  };

  render() {
    const { back, urlStatus, handleURLCheck } = this.props;
    const { videoURL } = this.state;

    let errorMessage;
    switch(urlStatus) {
      case FAIL_URL:
        errorMessage = (
          <h4>유효하지 않은 URL입니다.</h4>
        );
        break;
      case NO_URL:
      case SUCC_URL:
      default:
        errorMessage = null;
        break;
    }
    return (
      <div>
        <a onClick={ back }>
          <img src="https://png.icons8.com/pikachu-pokemon/color/24" alt="옵션 선택 취소" />
        </a>
        <img src="https://png.icons8.com/genie/color/24" alt="URL 업로드 아이콘" />
        <h3>유튜브에 업로드된 영상을 가져올 수 있습니다.</h3>
        <input
          placeholder="복사한 유튜브 URL을 입력하세요."
          onChange={ this.handleChange }
          className={ classNames(urlStatus == FAIL_URL && 'failUrl') } />
        <Button
          color="#9abf32"
          onClick={ () => handleURLCheck(videoURL) }>입력</Button>
        { errorMessage }
      </div>
    );
  }

  handleChange = e => {
    this.setState({
      videoURL: e.target.value
    });
  }
}

URLUpload.propTypes = propTypes;

export default URLUpload;
