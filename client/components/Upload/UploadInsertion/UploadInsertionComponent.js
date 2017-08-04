import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FlassContentTitleComponent from '../../Flass/FlassContentTitle/FlassContentTitleComponent';
import VideoComponent from './Video/VideoComponent';

import './UploadInsertionComponentStyles.scss';

const { func, string } = PropTypes;

const propTypes = {
  goToStepOne: func.isRequired,
  videoTitle: string.isRequired
};
const defaultProps = {};

class UploadInsertionComponent extends Component {
  render() {
    const {
      videoTitle,
      goToStepOne
    } = this.props;

    return (
      <div>
        <FlassContentTitleComponent title="Upload new video" />
        <div className="row">
          <div className="row__player-large-8">
            <VideoComponent
              VideoContainerClassName={ 'flass-upload-insertion-media' }
              VideoPlayerWrapperClassName="flass-upload-insertion-media__player-wrapper"
              VideoPlayerClassName="flass-upload-insertion-media__player"
              VideoControllerBarClassName="flass-upload-insertion-media__controller-bar"
              VideoPlayedBarClassName="played-bar--thinner"
              VideoLoadedBarClassName="loaded-bar--thinner"
              VideoQuizIndicatorClassName="quiz-indicator--thinner"
              VideoQuizIndicatorBarClassName="quiz-indicator-bar--thinner"
              VideoPlayPauseBtnClassName={ classNames('video-btn', 'video-btn--l-margin') }
              VideoVolumeBtnClassName="video-btn"
              VideoVolumeBarClassName={ classNames('video-volume-bar') }
              VideoFullscreenBtnClassName={ classNames('video-btn', 'video-btn--right', 'video-btn--r-margin') } />
          </div>

          <div className="row__player-large-4">
            Quiz
          </div>
        </div>
        <div className="row">
          Controller Bar
        </div>
        <button onClick={ goToStepOne }>PREV</button>
      </div>
    );
  }
}

UploadInsertionComponent.propTypes = propTypes;
UploadInsertionComponent.defaultProps = defaultProps;

export default UploadInsertionComponent;
