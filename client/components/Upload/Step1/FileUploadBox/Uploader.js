import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { NOT_STARTED, UPLOADING, COMPLETED } from '../../../../modules/Constants';
import Button from '../../../Flass/Button';
import ProgressBar from '../../../Flass/ProgressBar';
// import './infoBox.scss';

const propTypes = {
  back: PropTypes.func.isRequired,
  handleYoutubeUpload: PropTypes.func.isRequired,
  uploadStatus: PropTypes.number,
  uploadProgress: PropTypes.number
};
const defaultProps = {
  uploadStatus: NOT_STARTED,
  uploadProgress: 0
};

class Uploader extends Component {
  state = {
    file: null
  };

  render() {
    const {
      back,
      handleYoutubeUpload,
      uploadStatus,
      uploadProgress
    } = this.props;
    const { file } = this.state;

    const exit = (
      <a onClick={ back }>
        <img src="https://png.icons8.com/pikachu-pokemon/color/24" alt="옵션 선택 취소" />
      </a>
    );

    const thumbnail = (<div>VIDEO PREVIEW</div>);

    let body;
    switch(uploadStatus) {
      case COMPLETED:
        body = (
          <div>
            <img src="https://png.icons8.com/genie/color/24" alt="업로드 완료 아이콘" />
            <h3>성공적으로 영상이 업로드되었습니다.</h3>
          </div>
        );
        break;
      case UPLOADING:
        body = (
          <div>
            <img src="https://png.icons8.com/genie/color/24" alt="파일 업로드 아이콘" />
            <h3>&quot;{file.name}&quot; 파일을 업로드 중입니다.</h3>
            <ProgressBar progress={ uploadProgress } />
          </div>
        );
        break;
      case NOT_STARTED:
      default:
        if (file) {
          body = (
            <div>
              <img src="https://png.icons8.com/genie/color/24" alt="파일 업로드 아이콘" />
              <h3>&quot;{file.name}&quot; 파일이 업로드 됩니다.</h3>
              <Button color="#ffffff" onClick={ () => handleYoutubeUpload(file) }>업로드 시작</Button>
            </div>
          );
        } else {
          body = (
            <div>
              <img src="https://png.icons8.com/genie/color/24" alt="파일 아이콘" />
              <h3>업로드할 파일을 선택하세요.</h3>
              <input
                type="file"
                id="file"
                accept="video/*"
                onChange={ e => this.selectFile(e) } />
              <label htmlFor="file">
                <div>
                  파일 선택
                </div>
              </label>
            </div>
          );
        }
        break;
    }

    return (
      <div>
        { exit }
        { thumbnail }
        { body }
      </div>
    );
  }

  selectFile = e => {
    const file = e.target.files[0];
    this.setState({
      file
    });
  }
}

Uploader.propTypes = propTypes;
Uploader.defaultProps = defaultProps;

export default Uploader;
