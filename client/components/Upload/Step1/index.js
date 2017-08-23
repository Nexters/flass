import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as constants from '../../../modules/Constants';

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
  isGoogleAuth: PropTypes.bool.isRequired,
  goToGoogleAuthPage: PropTypes.func.isRequired,
  handleYoutubeUpload: PropTypes.func.isRequired
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
    const { handleNext, method, setUploadMethod, urlStatus, handleURLCheck, thumbURL, resetVideo, isGoogleAuth, goToGoogleAuthPage, handleYoutubeUpload } = this.props;
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
      case constants.METHOD_NOT_SELECTED:
        right = (
          <div className="box">
            <UploadOptionsBox
              selectFileMethod={ () => setUploadMethod(constants.FILE_METHOD) }
              selectURLMethod={ () => setUploadMethod(constants.URL_METHOD) } />
          </div>
        );
        break;
      case constants.FILE_METHOD:
        right = (
          <div className="box">
            <FileUploadBox
              back={ resetVideo }
              isGoogleAuth={ isGoogleAuth }
              goToGoogleAuthPage={ goToGoogleAuthPage }
              handleYoutubeUpload={ file => handleYoutubeUpload(file) } />
          </div>
        );
        break;
      case constants.URL_METHOD:
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
      <Button
        disabled={ !this.isComplete() }
        color={ this.isComplete() ? '#176d99' : null }
        onClick={ () => handleNext(videoInfo) }>다음</Button>
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
    if (videoInfo.title && this.props.urlStatus == constants.SUCC_URL) {
      return true;
    }
    return false;
  }
}

Step1.propTypes = propTypes;
Step1.defaultProps = defaultProps;

export default Step1;
