import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './urlUpload.scss';

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
          <a onClick={ back }>
            <img src="https://png.icons8.com/pikachu-pokemon/color/24" alt="옵션 선택 취소" />
          </a>
          <img src="https://png.icons8.com/genie/color/24" alt="업로드 완료 아이콘" />
          <h3>해당 URL은 안전합니다.</h3>
          <h3>성공적으로 영상이 첨부되었습니다.</h3>
        </div>
      </div>
    );
  }
}

URLSuccess.propTypes = propTypes;

export default URLSuccess;
