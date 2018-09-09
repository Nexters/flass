import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';

import { STEP_1, STEP_2 } from '~/ducks/constants';
import * as actions from '~/ducks/Upload/uploads';
import { INIT_QUESTION_STATES } from '~/ducks/Upload/uploadInsertionQuizzes';
import VideoInfo from './VideoInfo';
import QuestionInsertionContainer from './QuestionInsertion/QuestionInsertionComponent';
import SubHeader from './SubHeader/SubHeaderComponent';
import './index.scss';
import { Container } from './styled';
import {
  Title,
  Header
} from '~/components/FlassCommon';
import WithGoogleSignComponent from '../Sign/SignIn/WithGoogleSignComponent';

const { number, string, func } = PropTypes;
const propTypes = {
  step: number.isRequired,
  setStep: func.isRequired,
  method: number.isRequired,
  handleSetUploadMethod: func.isRequired,
  setVideoInfo: func.isRequired,
  urlStatus: number.isRequired,
  handleURLCheck: func.isRequired,
  thumbURL: string.isRequired,
  resetVideo: func.isRequired,
  isGoogleAuth: number.isRequired,
  goToGoogleAuthPage: func.isRequired,
  uploadYoutubeVideo: func.isRequired,
  uploadStatus: number.isRequired,
  uploadProgress: number.isRequired,
  processProgress: number.isRequired,
  title: string.isRequired,
  description: string.isRequired,
  subject: string.isRequired,
  textbook: string.isRequired,
  videoURL: string.isRequired,
  uploadLectureAndQuestions: func.isRequired,
  initUploadStates: func.isRequired,
  initQuestionStates: func.isRequired
};

class Upload extends Component {
  componentWillUnmount() {
    this.props.initUploadStates();
    this.props.initQuestionStates();
  }

  render() {
    const {
      title,
      description,
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
      <Header
        Title={() => <Title title="Upload new video" />}
        SubTitle={() => <SubHeader step={step} STEP_1={STEP_1} STEP_2={STEP_2} />} />
    );

    let body;
    switch (step) {
      case STEP_1:
        body = (
          <VideoInfo
            method={method}
            setUploadMethod={method => handleSetUploadMethod(method)}
            urlStatus={urlStatus}
            handleURLCheck={videoURL => handleURLCheck(videoURL)}
            handleNext={videoInfo => this.goToStep2(videoInfo)}
            thumbURL={thumbURL}
            resetVideo={resetVideo}
            isGoogleAuth={isGoogleAuth}
            goToGoogleAuthPage={goToGoogleAuthPage}
            handleYoutubeUpload={file => uploadYoutubeVideo(file, title, description)}
            uploadStatus={uploadStatus}
            uploadProgress={uploadProgress}
            processProgress={processProgress} />
        );
        break;

      case STEP_2:
      default:
        body = (
          <QuestionInsertionContainer
            onClickUploadBtn={this.uploadLectureAndQuestions} />
        );
    }

    return (
      <Container>
        {header}
        {body}
      </Container>
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
  initUploadStates: () => dispatch({
    type: actions.INIT_UPLOAD_STATES
  }),
  initQuestionStates: () => dispatch({
    type: INIT_QUESTION_STATES
  }),
  setStep: step => dispatch(actions.setStep(step)),
  handleSetUploadMethod: method => dispatch(actions.handleSetUploadMethod(method)),
  setVideoInfo: videoInfo => dispatch(actions.setVideoInfo(videoInfo)),
  handleURLCheck: videoURL => dispatch(actions.handleURLCheck(videoURL)),
  resetVideo: () => dispatch(actions.resetVideo()),
  goToGoogleAuthPage: () => dispatch(actions.goToGoogleAuthPage()),
  uploadYoutubeVideo: file => dispatch(actions.uploadYoutubeVideo(file)),
  uploadLectureAndQuestions: ({
    questionState, title, description, subject, textbook, videoURL, thumbURL
  }) => {
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
)(WithGoogleSignComponent({})(Upload));
