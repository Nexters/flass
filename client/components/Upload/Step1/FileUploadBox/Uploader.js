import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { NOT_STARTED, UPLOADING, PROCESSING, COMPLETED } from '../../../../modules/Constants';
import Button from '../../../Flass/Button';
import ProgressBar from '../../../Flass/ProgressBar';
import './uploader.scss';

const propTypes = {
  back: PropTypes.func.isRequired,
  handleYoutubeUpload: PropTypes.func.isRequired,
  uploadStatus: PropTypes.number.isRequired,
  uploadProgress: PropTypes.number.isRequired,
  processProgress: PropTypes.number.isRequired,
  thumbURL: PropTypes.string.isRequired
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
      uploadProgress,
      processProgress,
      thumbURL
    } = this.props;
    const { file } = this.state;

    const exit = (
      <a onClick={ back }>
        <img src="https://png.icons8.com/pikachu-pokemon/color/24" alt="옵션 선택 취소" />
      </a>
    );

    let body;
    let youtubeThumbnail;
    switch(uploadStatus) {
      case COMPLETED:
        youtubeThumbnail = {
          backgroundImage: `url(${thumbURL})`
        };
        body = (
          <div style={ youtubeThumbnail } className="youtubeThumbnail" >
            <div className="overlay">
              { exit }
              <img src="https://png.icons8.com/genie/color/24" alt="업로드 완료 아이콘" />
              <h3>성공적으로 영상이 업로드되었습니다</h3>
            </div>
          </div>
        );
        break;
      case PROCESSING:
        body = (
          <div>
            { exit }
            <img src="https://png.icons8.com/genie/color/24" alt="파일 업로드 아이콘" />
            <h3>&quot;{file.name}&quot; 파일을 프로세싱 중입니다.</h3>
            { /* Youtube 프로세싱이 100%에 도달하고나서도 프로세싱이 계속 되어서 임의로 설정해줌 */ }
            <h4>{ processProgress == 100 ? 99 : Math.round(processProgress) }% to complete</h4>
            <ProgressBar progress={ processProgress } />
          </div>
        );
        break;
      case UPLOADING:
        body = (
          <div>
            { exit }
            <img src="https://png.icons8.com/genie/color/24" alt="파일 업로드 아이콘" />
            <h3>&quot;{file.name}&quot; 파일을 업로드 중입니다.</h3>
            { /* Youtube 업로딩이 100%에 도달하고나서도 업로딩이 계속 되어서 임의로 설정해줌 */ }
            <h4>{ uploadProgress == 100 ? 99 : Math.round(uploadProgress) }% to complete</h4>
            <ProgressBar progress={ uploadProgress } />
          </div>
        );
        break;
      case NOT_STARTED:
      default:
        if (file) {
          body = (
            <div>
              { exit }
              <img src="https://png.icons8.com/genie/color/24" alt="파일 업로드 아이콘" />
              <h3>&quot;{file.name}&quot; 파일이 업로드 됩니다.</h3>
              <Button color="#ffffff" onClick={ () => handleYoutubeUpload(file) }>업로드 시작</Button>
            </div>
          );
        } else {
          body = (
            <div>
              { exit }
              <img src="https://png.icons8.com/genie/color/24" alt="파일 아이콘" />
              <h3>업로드할 파일을 선택하세요.</h3>
              <input
                type="file"
                id="file"
                accept="video/*"
                onChange={ e => this.selectFile(e) }
                className="inputFile" />
              <label htmlFor="file">파일 선택</label>
            </div>
          );
        }
        break;
    }

    return (
      <div className={ file && 'blackBackground' }>
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

export default Uploader;
