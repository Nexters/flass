import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { NOT_STARTED, UPLOADING, PROCESSING, COMPLETED } from '../../../../modules/Constants';
import Exit from './img/exit.png';
import WhiteExit from './img/whiteExit.png';
import File1x from './img/file.png';
import File2x from './img/file@2x.png';
import File3x from './img/file@3x.png';
import Upload from './img/upload.png';
import Upload2x from './img/upload@2x.png';
import Upload3x from './img/upload@3x.png';
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

    const blackExit = (
      <div className="alignRight">
        <a onClick={ back }>
          <img
            src={ Exit }
            className="exitIcon"
            alt="옵션 선택 취소" />
        </a>
      </div>
    );

    const whiteExit = (
      <div className="alignRight">
        <a onClick={ back }>
          <img
            src={ WhiteExit }
            className="exitIcon"
            alt="옵션 선택 취소" />
        </a>
      </div>
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
              { whiteExit }
              <img src="https://png.icons8.com/genie/color/24" alt="업로드 완료 아이콘" />
              <h3>성공적으로 영상이 업로드되었습니다</h3>
            </div>
          </div>
        );
        break;
      case PROCESSING:
        body = (
          <div>
            { whiteExit }
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
            { whiteExit }
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
              { whiteExit }
              <div className="alignCenter">
                <img
                  src={ Upload }
                  srcSet={ `${Upload2x} 2x,${Upload3x} 3x` }
                  className="uploadIcon"
                  alt="업로드 아이콘" />
                <span className="startMessage">&quot;{file.name}&quot; 파일이 업로드 됩니다.</span>
                <Button color="#ffffff" onClick={ () => handleYoutubeUpload(file) }>업로드 시작</Button>
              </div>
            </div>
          );
        } else {
          body = (
            <div>
              { blackExit }
              <div className="alignCenter">
                <img
                  src={ File1x }
                  srcSet={ `${File2x} 2x,${File3x} 3x` }
                  className="fileIcon"
                  alt="파일 아이콘" />
                <span className="fileMessage">업로드할 파일을 선택하세요.</span>
                <input
                  type="file"
                  id="file"
                  accept="video/*"
                  onChange={ e => this.selectFile(e) }
                  className="inputFile" />
                <label htmlFor="file">파일 선택</label>
              </div>
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
