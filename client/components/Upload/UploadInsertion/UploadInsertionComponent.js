import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import autobind from 'autobind-decorator';

import FlassContentTitleComponent from '../../Flass/FlassContentTitle/FlassContentTitleComponent';
import VideoComponent from './Video/VideoComponent';
import IndicatorBarComponent from './IndicatorBar/IndicatorBarComponent';

import './UploadInsertionComponentStyles.scss';

const { func, string, number } = PropTypes;

const propTypes = {
  goToStepOne: func.isRequired,
  videoTitle: string.isRequired,
};
const defaultProps = {
};

class UploadInsertionComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      duration: 0,
      played: 0,
      loaded: 0,
      seeking: false,
      isQuizSecs: false,
      playing: true
    };
  }

  render() {
    const {
      duration,
      played,
      loaded,
      isQuizSecs,
      playing
    } = this.state;

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
              VideoFullscreenBtnClassName={ classNames('video-btn', 'video-btn--right', 'video-btn--r-margin') }

              setPlayer={ this.setPlayer }
              playerSeekTo={ this.playerSeekTo }
              onProgress={ this.onProgress }
              onDuration={ this.onDuration }
              setSeekingState={ this.setSeekingState }
              setPlayingState={ this.setPlayingState }
              setPlayedState={ this.setPlayedState }
              setIsQuizSecsState={ this.setIsQuizSecsState }
              duration={ duration }
              played={ played }
              loaded={ loaded }
              playing={ playing }
              isQuizSecs={ isQuizSecs } />
          </div>

          <div className="row__player-large-4">
            Quiz
          </div>
        </div>
        <div className={ classNames('row', 'row--t-margin') }>
          <IndicatorBarComponent
            VideoPlayedBarClassName={ classNames('played-bar', 'played-bar--thinner') }
            VideoLoadedBarClassName={ classNames('loaded-bar', 'loaded-bar--thinner') }
            VideoQuizIndicatorClassName={ classNames('quiz-indicator', 'quiz-indicator--thinner') }
            VideoQuizIndicatorBarClassName={ classNames('quiz-indicator-bar', 'quiz-indicator-bar--thinner') }
            playerSeekTo={ this.playerSeekTo }
            setSeekingState={ this.setSeekingState }
            setPlayingState={ this.setPlayingState }
            setPlayedState={ this.setPlayedState }
            setIsQuizSecsState={ this.setIsQuizSecsState }
            duration={ duration }
            played={ played }
            loaded={ loaded }
            isQuizSecs={ isQuizSecs } />
        </div>
        <button onClick={ goToStepOne }>PREV</button>
      </div>
    );
  }

  @autobind
  setPlayer(player) {
    this.player = player;
  }

  @autobind
  playerSeekTo(percentage) {
    this.player.seekTo(percentage);
  }

  @autobind
  onDuration(duration) {
    this.setState({ duration });
  }

  @autobind
  onProgress(state) {
    if (!this.state.seeking) {
      this.setState(state);
    }
  }

  @autobind
  setSeekingState(seeking) {
    this.setState({ seeking });
  }

  @autobind
  setIsQuizSecsState(isQuizSecs) {
    this.setState({ isQuizSecs });
  }

  @autobind
  setPlayingState(playing) {
    this.setState({ playing });
  }

  @autobind
  setPlayedState(played) {
    this.setState({ played });
  }
}

UploadInsertionComponent.propTypes = propTypes;
UploadInsertionComponent.defaultProps = defaultProps;

export default UploadInsertionComponent;
