import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { connect } from 'react-redux';
import * as constants from '../../modules/Constants';
import * as actions from '../../modules/Upload/Actions';

import UploadInsertionContainer from './UploadInsertion/UploadInsertionContainer';
import './index.scss';

// ********************************

import Step1 from './Step1';
import Step2 from './Step2';

import Header from '../Flass/Header';

const propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
  method: PropTypes.number.isRequired,
  handleSetUploadMethod: PropTypes.func.isRequired,
  setVideoInfo: PropTypes.func,
  urlStatus: PropTypes.number.isRequired,
  handleURLCheck: PropTypes.func.isRequired,
  thumbURL: PropTypes.string.isRequired,
  resetVideo: PropTypes.func.isRequired,

  title: PropTypes.string,
  thumbStatus: PropTypes.number,

  getThumbnail: PropTypes.func,
  isGoogleAuth: PropTypes.bool.isRequired,
  goToGoogleAuthPage: PropTypes.func,
  uploadYoutubeVideo: PropTypes.func
};

const defaultProps = {
  step: constants.STEP_1,
  setStep: () => handleError('setStep'),
  setVideoInfo: () => handleError('setVideoInfo'),
  title: '',
  thumbStatus: actions.NO_THUMB,
  thumbURL: '',
  getThumbnail: () => handleError('getThumbnail'),
  goToGoogleAuthPage: () => handleError('goToGoogleAuthPage'),
  uploadYoutubeVideo: () => handleError('uploadYoutubeVideo')
};

function handleError(func) {
  console.error(`${func} is not defined`);
}

class Upload extends Component {
  render() {
    const {
      title,
      urlStatus,
      handleURLCheck,
      thumbStatus,
      thumbURL,
      getThumbnail,
      method,
      handleSetUploadMethod,
      resetVideo,
      isGoogleAuth,
      goToGoogleAuthPage,
      uploadYoutubeVideo,

      step
    } = this.props;

    const header = (
      <div className="headerContainer">
        <Header title="Upload new video" />
        <div className="steps">
          <h2 className={ classNames('disabled', step == constants.STEP_1 && 'active') }>
            영상 업로드
          </h2>
          <span className={ classNames('disabled', 'stepsDecorator') }>{'>'}</span>
          <h2 className={ classNames('disabled', step == constants.STEP_2 && 'active') }>
            퀴즈 삽입
          </h2>
        </div>
      </div>
    );

    let body;
    switch(step) {
      // step 1
      case constants.STEP_1:
        body = (
          <div>
            <Step1
              method={ method }
              setUploadMethod={ method => handleSetUploadMethod(method) }
              urlStatus={ urlStatus }
              handleURLCheck={ videoURL => handleURLCheck(videoURL) }
              handleNext={ videoInfo => this.goToStep2(videoInfo) }
              thumbURL={ thumbURL }
              resetVideo={ resetVideo }
              isGoogleAuth={ isGoogleAuth }
              goToGoogleAuthPage={ goToGoogleAuthPage }
              handleYoutubeUpload={ file => uploadYoutubeVideo(file) } />
          </div>
        );
        break;

      // step 2
      case constants.STEP_2:
      default:
        body = (
          <div>
            <Step2 />
            <UploadInsertionContainer />
          </div>
        );
    }

    return (
      <div>
        { header }
        { body }
      </div>
    );
  }

  // *******************
  goToStep2 = videoInfo => {
    this.props.setStep(constants.STEP_2);
    console.log('******');
    console.log(videoInfo);
    this.props.setVideoInfo(videoInfo);
  }

  goToStepOne = () => {
    const step = constants.STEP_1;
    this.props.setStep(step);
  }
}

Upload.propTypes = propTypes;
Upload.defaultProps = defaultProps;

const mapStateToProps = state => ({
  step: state.upload.step,
  title: state.upload.title,
  urlStatus: state.upload.urlStatus,
  thumbStatus: state.upload.thumbStatus,
  thumbURL: state.upload.thumbURL,
  method: state.upload.method,
  isGoogleAuth: state.upload.isGoogleAuth,
});

const mapDispatchToProps = dispatch => ({
  setStep: step => dispatch(actions.setStep(step)),
  handleSetUploadMethod: method => dispatch(actions.handleSetUploadMethod(method)),
  setVideoInfo: videoInfo => dispatch(actions.setVideoInfo(videoInfo)),
  handleURLCheck: videoURL => dispatch(actions.handleURLCheck(videoURL)),
  getThumbnail: videoURL => dispatch(actions.getThumbnail(videoURL)),
  resetVideo: () => dispatch(actions.resetVideo()),
  goToGoogleAuthPage: () => dispatch(actions.goToGoogleAuthPage()),
  uploadYoutubeVideo: file => dispatch(actions.uploadYoutubeVideo(file))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
