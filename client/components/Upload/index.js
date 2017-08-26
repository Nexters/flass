import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import autobind from 'autobind-decorator';

import { connect } from 'react-redux';
import { STEP_1, STEP_2 } from '../../modules/Constants';
import * as actions from '../../modules/Upload/Actions';

import UploadInsertionContainer from './UploadInsertion/UploadInsertionContainer';
import './index.scss';

// ********************************

import Step1 from './Step1';
import Step2 from './Step2';

import Header from '../Flass/Header';

const propTypes = {
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
  method: PropTypes.number.isRequired,
  handleSetUploadMethod: PropTypes.func.isRequired,
  setVideoInfo: PropTypes.func.isRequired,
  urlStatus: PropTypes.number.isRequired,
  handleURLCheck: PropTypes.func.isRequired,
  thumbURL: PropTypes.string.isRequired,
  resetVideo: PropTypes.func.isRequired,
  isGoogleAuth: PropTypes.number.isRequired,
  goToGoogleAuthPage: PropTypes.func.isRequired,
  uploadYoutubeVideo: PropTypes.func.isRequired,
  uploadStatus: PropTypes.number.isRequired,
  uploadProgress: PropTypes.number.isRequired,
  processProgress: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  textbook: PropTypes.string.isRequired,
  videoURL: PropTypes.string.isRequired,
  uploadLectureAndQuestions: PropTypes.func.isRequired
};

function handleError(func) {
  console.error(`${func} is not defined`);
}

class Upload extends Component {
  render() {
    const {
      step,
      method,
      handleSetUploadMethod,
      urlStatus,
      handleURLCheck,
      thumbURL,
      resetVideo,
      isGoogleAuth,
      goToGoogleAuthPage,
      uploadYoutubeVideo,
      uploadStatus,
      uploadProgress,
      processProgress
    } = this.props;

    const header = (
      <div className="headerContainer">
        <Header title="Upload new video" />
        <div className="steps">
          <h2 className={ classNames('disabled', step == STEP_1 && 'active') }>
            영상 업로드
          </h2>
          <span className={ classNames('disabled', 'stepsDecorator') }>{'>'}</span>
          <h2 className={ classNames('disabled', step == STEP_2 && 'active') }>
            퀴즈 삽입
          </h2>
        </div>
      </div>
    );

    let body;
    switch(step) {
      // step 1
      case STEP_1:
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
              handleYoutubeUpload={ file => uploadYoutubeVideo(file) }
              uploadStatus={ uploadStatus }
              uploadProgress={ uploadProgress }
              processProgress={ processProgress } />
          </div>
        );
        break;

      // step 2
      case STEP_2:
      default:
        body = (
          <UploadInsertionContainer
            onClickUploadBtn={ this.uploadLectureAndQuestions } />
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
    this.props.setVideoInfo(videoInfo);
    this.props.setStep(STEP_2);
  }

  goToStepOne = () => {
    const step = STEP_1;
    this.props.setStep(step);
  }

  @autobind
  uploadLectureAndQuestions({ questionState }) {
    const {
      title, description, subject,
      textbook, videoURL, thumbURL
    } = this.props;

    this.props.uploadLectureAndQuestions({
      questionState,
      title,
      description,
      subject,
      textbook,
      videoURL,
      thumbURL
    });
  }
}

Upload.propTypes = propTypes;

const mapStateToProps = state => ({
  step: state.upload.step,
  title: state.upload.title,
  subject: state.upload.subject,
  textbook: state.upload.textbook,
  description: state.upload.description,
  videoURL: state.upload.videoURL,
  urlStatus: state.upload.urlStatus,
  thumbStatus: state.upload.thumbStatus,
  thumbURL: state.upload.thumbURL,
  method: state.upload.method,
  isGoogleAuth: state.upload.isGoogleAuth,
  uploadStatus: state.upload.uploadStatus,
  uploadProgress: state.upload.uploadProgress,
  processProgress: state.upload.processProgress
});

const mapDispatchToProps = dispatch => ({
  setStep: step => dispatch(actions.setStep(step)),
  handleSetUploadMethod: method => dispatch(actions.handleSetUploadMethod(method)),
  setVideoInfo: videoInfo => dispatch(actions.setVideoInfo(videoInfo)),
  handleURLCheck: videoURL => dispatch(actions.handleURLCheck(videoURL)),
  getThumbnail: videoURL => dispatch(actions.getThumbnail(videoURL)),
  resetVideo: () => dispatch(actions.resetVideo()),
  goToGoogleAuthPage: () => dispatch(actions.goToGoogleAuthPage()),
  uploadYoutubeVideo: file => dispatch(actions.uploadYoutubeVideo(file)),
  uploadLectureAndQuestions: ({ questionState, title, description, subject, textbook, videoURL, thumbURL }) => {
    dispatch({
      type: actions.UPLOAD_LECTURE_AND_QUESTIONS,
      questionState,
      title,
      description,
      subject,
      textbook,
      videoURL,
      thumbURL
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
