import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { NO_URL, SUCC_URL, FAIL_URL } from '../../../../modules/constants';
import Exit from '../img/exit.png';
import Exit2x from '../img/exit@2x.png';
import Exit3x from '../img/exit@3x.png';
import Url from './img/url.png';
import Url2x from './img/url@2x.png';
import Url3x from './img/url@3x.png';
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
          <span className="failMessage">유효하지 않은 URL입니다.</span>
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
            src={ Url }
            srcSet={ `${Url2x} 2x,${Url3x} 3x` }
            className="urlIcon"
            alt="URL 업로드 아이콘" />
          <span className="urlMessage">유튜브에 업로드된 영상을 가져올 수 있습니다.</span>
          <div className="parentContainer">
            <div className="childContainer">
              <input
                placeholder="복사한 유튜브 URL을 입력하세요."
                onChange={ this.handleChange }
                className={ classNames('urlInput', urlStatus == FAIL_URL && 'failUrl') } />
              { errorMessage }
            </div>
            <Button
              color="#9abf32"
              onClick={ () => handleURLCheck(videoURL) }>입력</Button>
          </div>
        </div>
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
