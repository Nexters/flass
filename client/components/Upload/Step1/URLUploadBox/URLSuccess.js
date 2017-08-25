import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './urlUpload.scss';
import Exit from '../img/exit.png';
import Complete from '../img/complete.png';
import Complete2x from '../img/complete@2x.png';
import Complete3x from '../img/complete@3x.png';

const propTypes = {
  back: PropTypes.func.isRequired,
  thumbURL: PropTypes.string.isRequired
};

class URLSuccess extends Component {
  render() {
    const { back, thumbURL } = this.props;
    // const { } = this.state;
    const youtubeThumbnail = {
      backgroundImage: `url(${thumbURL})`
    };
    return (
      <div style={ youtubeThumbnail } className="youtubeThumbnail" >
        <div className="overlay">
          <div className="alignRight">
            <a onClick={ back }>
              <img
                src={ Exit }
                className="exitIcon"
                alt="옵션 선택 취소" />
            </a>
          </div>
          <div className="alignCenter">
            <img
              src={ Complete }
              srcSet={ `${Complete2x} 2x,${Complete3x} 3x` }
              className="completeIcon"
              alt="업로드 완료 아이콘" />
            <span className="completeMessage">
              해당 URL은 안전합니다.
              <br />
              성공적으로 영상이 첨부되었습니다.
            </span>
          </div>
        </div>
      </div>
    );
  }
}

URLSuccess.propTypes = propTypes;

export default URLSuccess;
