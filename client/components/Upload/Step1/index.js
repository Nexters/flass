import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { METHOD_NOT_SELECTED, FILE_METHOD, URL_METHOD, SUCC_URL } from '../../../modules/Constants';

import '../step.scss';
import InfoBox from './InfoBox';
import UploadOptionsBox from './UploadOptionsBox';
import FileUploadBox from './FileUploadBox';
import URLUploadBox from './URLUploadBox';
import Button from '../../Flass/Button';

const propTypes = {
  handleNext: PropTypes.func.isRequired,
  method: PropTypes.number.isRequired,
  setUploadMethod: PropTypes.func.isRequired,
  urlStatus: PropTypes.number.isRequired,
  handleURLCheck: PropTypes.func.isRequired,
  thumbURL: PropTypes.string.isRequired,
  resetVideo: PropTypes.func.isRequired,
  isGoogleAuth: PropTypes.number.isRequired,
  goToGoogleAuthPage: PropTypes.func.isRequired,
  handleYoutubeUpload: PropTypes.func.isRequired,
  uploadStatus: PropTypes.number.isRequired,
  uploadProgress: PropTypes.number.isRequired,
  processProgress: PropTypes.number.isRequired
};

const defaultProps = {

};

class Step1 extends Component {
  state = {
    videoInfo: {
      title: '',
      subject: '',
      textbook: '',
      description: ''
    }
  };

  render() {
    const {
      handleNext, method, setUploadMethod, urlStatus, handleURLCheck, thumbURL,
      resetVideo, isGoogleAuth, goToGoogleAuthPage, handleYoutubeUpload,
      uploadStatus, uploadProgress, processProgress
    } = this.props;
    const { videoInfo } = this.state;

    const left = (
      <div className={ classNames('box', 'info-box') }>
        <InfoBox
          videoInfo={ videoInfo }
          onChange={ this.handleChange } />
      </div>
    );

    let right;
    switch(method) {
      case METHOD_NOT_SELECTED:
        right = (
          <div className="box">
            <UploadOptionsBox
              selectFileMethod={ () => setUploadMethod(FILE_METHOD) }
              selectURLMethod={ () => setUploadMethod(URL_METHOD) } />
          </div>
        );
        break;
      case FILE_METHOD:
        right = (
          <div className="box">
            <FileUploadBox
              back={ resetVideo }
              isGoogleAuth={ isGoogleAuth }
              goToGoogleAuthPage={ goToGoogleAuthPage }
              handleYoutubeUpload={ file => handleYoutubeUpload(file) }
              uploadStatus={ uploadStatus }
              uploadProgress={ uploadProgress }
              processProgress={ processProgress }
              thumbURL={ thumbURL } />
          </div>
        );
        break;
      case URL_METHOD:
      default:
        right = (
          <div className="box">
            <URLUploadBox
              back={ resetVideo }
              urlStatus={ urlStatus }
              handleURLCheck={ videoURL => handleURLCheck(videoURL) }
              thumbURL={ thumbURL } />
          </div>
        );
    }

    const next = (
      <div className="nextButton">
        <Button
          disabled={ !this.isComplete() }
          fontSize="1.57rem"
          color={ this.isComplete() ? '#176d99' : '#b6bfc1' }
          margin="2.125rem 5.56rem 0 0"
          padding="0.5625rem 2.06rem 0.3125rem 2.06rem"
          onClick={ () => handleNext(videoInfo) }>다 음</Button>
      </div>
    );

    return (
      <div className="container">
        { left }
        { right }
        { next }
      </div>

    );
  }

  handleChange = e => {
    this.setState({
      videoInfo: {
        ...this.state.videoInfo,
        [e.target.name]: e.target.value
      }
    });
  }

  // considers completed when title and videoURL fields are filled
  isComplete = () => {
    const { videoInfo } = this.state;
    if (videoInfo.title && this.props.urlStatus == SUCC_URL) {
      return true;
    }
    return false;
  }
}

Step1.propTypes = propTypes;
Step1.defaultProps = defaultProps;

export default Step1;
