import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NOT_STARTED, UPLOADING, PROCESSING, COMPLETED } from '~/ducks/constants';
import Exit from '../img/exit.png';
import Exit2x from '../img/exit@2x.png';
import Exit3x from '../img/exit@3x.png';
import WhiteExit from '../img/whiteExit.png';
import WhiteExit2x from '../img/whiteExit@2x.png';
import WhiteExit3x from '../img/whiteExit@3x.png';
import File1x from './img/file.png';
import File2x from './img/file@2x.png';
import File3x from './img/file@3x.png';
import Upload from './img/upload.png';
import Upload2x from './img/upload@2x.png';
import Upload3x from './img/upload@3x.png';
import Complete from '../img/complete.png';
import Complete2x from '../img/complete@2x.png';
import Complete3x from '../img/complete@3x.png';
import Button from '~/components/FlassCommon/Button';
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
        <a onClick={back}>
          <img
            src={Exit}
            className="exitIcon"
            srcSet={`${Exit2x} 2x,${Exit3x} 3x`}
            alt="옵션 선택 취소" />
        </a>
      </div>
    );

    const whiteExit = (
      <div className="alignRight">
        <a onClick={back}>
          <img
            src={WhiteExit}
            srcSet={`${WhiteExit2x} 2x,${WhiteExit3x} 3x`}
            className="whiteExitIcon"
            alt="옵션 선택 취소" />
        </a>
      </div>
    );

    let body;
    let youtubeThumbnail;
    switch (uploadStatus) {
      case COMPLETED:
        youtubeThumbnail = {
          backgroundImage: `url(${thumbURL})`
        };
        body = (
          <div style={youtubeThumbnail} className="youtubeThumbnail" >
            <div className="overlay">
              {whiteExit}
              <div className="alignCenter">
                <img
                  src={Complete}
                  srcSet={`${Complete2x} 2x,${Complete3x} 3x`}
                  className="completeIcon"
                  alt="업로드 완료 아이콘" />
                <span className="completeMessage">성공적으로 영상이 업로드되었습니다</span>
              </div>
            </div>
          </div>
        );
        break;
      case PROCESSING:
        body = (
          <div className="progressBarContainer">
            {whiteExit}
            <div className="alignCenter">
              <img
                src={Upload}
                srcSet={`${Upload2x} 2x,${Upload3x} 3x`}
                className="uploadIcon"
                alt="업로드 아이콘" />
              <span className="uploadMessage">&quot;{file.name}&quot; 파일을 프로세싱 중입니다.</span>
              { /* Youtube 프로세싱이 100%에 도달하고나서도 프로세싱이 계속 되어서 임의로 설정해줌 */}
              <span className="progressMessage">
                {processProgress == 100 ? 99 : Math.round(processProgress)}% to complete
              </span>
            </div>
          </div>
        );
        break;
      case UPLOADING:
        body = (
          <div className="progressBarContainer">
            {whiteExit}
            <div className="alignCenter">
              <img
                src={Upload}
                srcSet={`${Upload2x} 2x,${Upload3x} 3x`}
                className="uploadIcon"
                alt="업로드 아이콘" />
              <span className="uploadMessage">&quot;{file.name}&quot; 파일을 업로드 중입니다.</span>
              { /* Youtube 업로딩이 100%에 도달하고나서도 업로딩이 계속 되어서 임의로 설정해줌 */}
              <span className="progressMessage">
                {uploadProgress == 100 ? 99 : Math.round(uploadProgress)}% to complete
              </span>
            </div>
          </div>
        );
        break;
      case NOT_STARTED:
      default:
        if (file) {
          body = (
            <div>
              {whiteExit}
              <div className="alignCenter">
                <img
                  src={Upload}
                  srcSet={`${Upload2x} 2x,${Upload3x} 3x`}
                  className="uploadIcon"
                  alt="업로드 아이콘" />
                <span className="uploadMessage">&quot;{file.name}&quot; 파일이 업로드 됩니다.</span>
                <Button color="#ffffff" onClick={() => handleYoutubeUpload(file)}>업로드 시작</Button>
              </div>
            </div>
          );
        } else {
          body = (
            <div>
              {blackExit}
              <div className="alignCenter">
                <img
                  src={File1x}
                  srcSet={`${File2x} 2x,${File3x} 3x`}
                  className="fileIcon"
                  alt="파일 아이콘" />
                <span className="fileMessage">업로드할 파일을 선택하세요.</span>
                <input
                  type="file"
                  id="file"
                  accept="video/*"
                  onChange={e => this.selectFile(e)}
                  className="inputFile" />
                <label htmlFor="file">파일 선택</label>
              </div>
            </div>
          );
        }
        break;
    }

    return (
      <div className={file && 'blackBackground'}>
        {body}
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
